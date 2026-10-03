"""
AutoDBA FastAPI ASGI entrypoint for Vercel Serverless Functions.
Provides RESTful query diagnostics, index synthesis, presets, and MCP protocol endpoints.
"""

from __future__ import annotations

import functools
import sys
from pathlib import Path
from typing import Any

# Ensure monorepo app root is on python path for engine imports
app_root = str(Path(__file__).resolve().parent.parent)
if app_root not in sys.path:
    sys.path.insert(0, app_root)

import sqlglot
from fastapi import FastAPI, Header, HTTPException, Request, Response, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from engine.analyzer.ast_visitor import analyze_sql
from engine.analyzer.plan_parser import parse_plan
from engine.core.config import get_settings
from engine.core.security import (
    RateLimiter,
    client_ip,
    is_plausible_api_key,
    sanitize_sql,
)
from engine.data.presets import PRESETS, get_preset_seed
from engine.optimizer.agent import build_curated_result, run_optimization
from engine.optimizer.ddl_generator import synthesize_indexes
from engine.schemas import (
    AnalyzeRequest,
    AnalyzeResponse,
    HealthResponse,
    OptimizationResult,
    OptimizeRequest,
    PresetDetail,
    PresetListResponse,
    PresetSummary,
    QuotaInfo,
)

settings = get_settings()

app = FastAPI(
    title="AutoDBA API",
    version=settings.app_version,
    docs_url="/api/py/docs",
    openapi_url="/api/py/openapi.json",
)

# In-memory rate limiters
analyze_limiter = RateLimiter(limit=settings.analyze_per_minute, window_s=60)
server_llm_limiter = RateLimiter(limit=settings.llm_daily_limit, window_s=86400)
byok_limiter = RateLimiter(limit=settings.byok_daily_limit, window_s=86400)


# Custom error handling envelopes
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    msg = "; ".join(f"{e.get('loc', ['field'])[-1]}: {e.get('msg', 'invalid')}" for e in errors)
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"error": {"code": "VALIDATION_ERROR", "message": msg}},
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    headers = exc.headers or {}
    code = "HTTP_ERROR"
    if exc.status_code == 429:
        code = "RATE_LIMIT_EXCEEDED"
    elif exc.status_code == 404:
        code = "NOT_FOUND"
    elif exc.status_code == 400:
        code = "BAD_REQUEST"

    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"code": code, "message": str(exc.detail)}},
        headers=headers,
    )


# Precompute preset details
@functools.lru_cache(maxsize=16)
def _get_cached_preset_detail(preset_id: str) -> PresetDetail | None:
    seed = get_preset_seed(preset_id)
    if not seed:
        return None
    res = build_curated_result(seed.sql, seed.dialect, seed.plan, seed.curated)
    return PresetDetail(
        id=seed.id,
        title=seed.title,
        domain=seed.domain,
        dialect=seed.dialect,
        description=seed.description,
        tags=seed.tags,
        headline_metric=seed.headline_metric,
        sql=seed.sql,
        plan=seed.plan,
        result=res,
    )


# ---------------------------------------------------------------------------
# REST Endpoints
# ---------------------------------------------------------------------------


@app.get("/api/py/health", response_model=HealthResponse)
async def health():
    cfg = get_settings()
    return HealthResponse(
        status="ok",
        version=cfg.app_version,
        llm_configured=bool(cfg.gemini_api_key),
        model=cfg.gemini_model,
        sqlglot_version=sqlglot.__version__,
    )


@app.get("/api/py/presets", response_model=PresetListResponse)
async def list_presets(response: Response):
    response.headers["Cache-Control"] = "public, s-maxage=86400, stale-while-revalidate=604800"
    summaries = [
        PresetSummary(
            id=p.id,
            title=p.title,
            domain=p.domain,
            dialect=p.dialect,
            description=p.description,
            tags=p.tags,
            headline_metric=p.headline_metric,
        )
        for p in PRESETS
    ]
    return PresetListResponse(presets=summaries)


@app.get("/api/py/presets/{preset_id}", response_model=PresetDetail)
async def get_preset(preset_id: str, response: Response):
    response.headers["Cache-Control"] = "public, s-maxage=86400, stale-while-revalidate=604800"
    detail = _get_cached_preset_detail(preset_id)
    if not detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Preset '{preset_id}' not found.",
        )
    return detail


@app.get("/api/py/quota", response_model=QuotaInfo)
async def get_quota(request: Request, x_gemini_key: str | None = Header(default=None)):
    ip = client_ip(request.headers, request.client.host if request.client else "127.0.0.1")
    is_byok = bool(x_gemini_key and is_plausible_api_key(x_gemini_key))

    if is_byok:
        rem, reset_s = byok_limiter.peek(f"byok_{ip}")
        limit = settings.byok_daily_limit
    else:
        rem, reset_s = server_llm_limiter.peek(f"srv_{ip}")
        limit = settings.llm_daily_limit

    return QuotaInfo(
        byok=is_byok,
        limit=limit,
        remaining=rem,
        reset_seconds=reset_s,
    )


@app.post("/api/py/analyze", response_model=AnalyzeResponse)
async def analyze_endpoint(payload: AnalyzeRequest, request: Request, response: Response):
    response.headers["Cache-Control"] = "no-store"
    ip = client_ip(request.headers, request.client.host if request.client else "127.0.0.1")

    # Rate limit check for analysis
    allowed, rem, reset_s = analyze_limiter.hit(ip)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Analysis rate limit exceeded. Try again in {reset_s} seconds.",
            headers={"Retry-After": str(reset_s), "X-RateLimit-Remaining": "0"},
        )

    try:
        clean_sql = sanitize_sql(payload.sql)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))

    report = analyze_sql(clean_sql, payload.dialect)
    plan_summary = parse_plan(payload.plan, payload.dialect) if payload.plan else None
    indexes = synthesize_indexes(report)

    return AnalyzeResponse(
        report=report,
        plan=plan_summary,
        indexes=indexes,
    )


@app.post("/api/py/optimize", response_model=OptimizationResult)
async def optimize_endpoint(
    payload: OptimizeRequest,
    request: Request,
    response: Response,
    x_gemini_key: str | None = Header(default=None),
):
    response.headers["Cache-Control"] = "no-store"
    ip = client_ip(request.headers, request.client.host if request.client else "127.0.0.1")
    cfg = get_settings()

    # Enforce basic analysis limiter first
    allowed, _, reset_s = analyze_limiter.hit(ip)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded. Try again in {reset_s} seconds.",
            headers={"Retry-After": str(reset_s), "X-RateLimit-Remaining": "0"},
        )

    try:
        clean_sql = sanitize_sql(payload.sql)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))

    # Evaluate BYOK vs Server key
    has_byok = bool(x_gemini_key)
    effective_api_key = None
    is_byok_valid = False

    if has_byok:
        if not is_plausible_api_key(x_gemini_key):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Provided X-Gemini-Key format is invalid.",
            )
        is_byok_valid = True
        effective_api_key = x_gemini_key
    elif cfg.gemini_api_key:
        effective_api_key = cfg.gemini_api_key

    # Check LLM quota and decision
    allow_llm = payload.mode == "auto" and bool(effective_api_key)
    quota_info: QuotaInfo | None = None

    if allow_llm:
        if is_byok_valid:
            llm_ok, rem, r_sec = byok_limiter.hit(f"byok_{ip}")
            quota_info = QuotaInfo(byok=True, limit=cfg.byok_daily_limit, remaining=rem, reset_seconds=r_sec)
            if not llm_ok:
                allow_llm = False
        else:
            llm_ok, rem, r_sec = server_llm_limiter.hit(f"srv_{ip}")
            quota_info = QuotaInfo(byok=False, limit=cfg.llm_daily_limit, remaining=rem, reset_seconds=r_sec)
            if not llm_ok:
                allow_llm = False
    else:
        rem, r_sec = (
            byok_limiter.peek(f"byok_{ip}") if is_byok_valid else server_llm_limiter.peek(f"srv_{ip}")
        )
        quota_info = QuotaInfo(
            byok=is_byok_valid,
            limit=cfg.byok_daily_limit if is_byok_valid else cfg.llm_daily_limit,
            remaining=rem,
            reset_seconds=r_sec,
        )

    res = await run_optimization(
        clean_sql,
        payload.dialect,
        payload.plan,
        api_key=effective_api_key,
        model=cfg.gemini_model,
        allow_llm=allow_llm,
        max_iterations=cfg.max_agent_iterations,
    )

    res.quota = quota_info
    return res


# ---------------------------------------------------------------------------
# MCP Server Endpoint (JSON-RPC 2.0 over Streamable HTTP)
# ---------------------------------------------------------------------------


@app.get("/api/py/mcp")
async def mcp_get_not_allowed():
    return Response(
        status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
        headers={"Allow": "POST"},
    )


@app.post("/api/py/mcp")
async def mcp_endpoint(request: Request):
    """
    Stateless Model Context Protocol (MCP) server endpoint for Cursor & Claude Desktop.
    """
    try:
        body = await request.json()
    except Exception:
        return JSONResponse(
            status_code=200,
            content={"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": "Parse error"}},
        )

    if not isinstance(body, dict):
        return JSONResponse(
            status_code=200,
            content={"jsonrpc": "2.0", "id": None, "error": {"code": -32600, "message": "Invalid Request"}},
        )

    method = body.get("method")
    req_id = body.get("id")
    params = body.get("params", {})

    # 1. Handle notifications (no response body, HTTP 202)
    if method and str(method).startswith("notifications/"):
        return Response(status_code=status.HTTP_202_ACCEPTED)

    # 2. initialize
    if method == "initialize":
        client_proto = params.get("protocolVersion")
        proto = (
            client_proto
            if client_proto in ("2025-06-18", "2025-03-26", "2024-11-05")
            else "2025-06-18"
        )
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "protocolVersion": proto,
                "capabilities": {"tools": {"listChanged": False}},
                "serverInfo": {"name": "autodba", "version": settings.app_version},
            },
        }

    # 3. ping
    if method == "ping":
        return {"jsonrpc": "2.0", "id": req_id, "result": {}}

    # 4. tools/list
    if method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "tools": [
                    {
                        "name": "analyze_sql",
                        "description": "Statically parse SQL and detect anti-patterns (non-SARGable functions, Cartesian joins, cursor loops) using sqlglot.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "sql": {"type": "string", "description": "SQL query text"},
                                "dialect": {
                                    "type": "string",
                                    "enum": ["tsql", "postgres", "mysql"],
                                    "default": "tsql",
                                    "description": "SQL dialect",
                                },
                            },
                            "required": ["sql"],
                        },
                    },
                    {
                        "name": "optimize_sql",
                        "description": "Deterministic AST query rewriter and zero-downtime CREATE INDEX synthesizer.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "sql": {"type": "string", "description": "SQL query text"},
                                "dialect": {
                                    "type": "string",
                                    "enum": ["tsql", "postgres", "mysql"],
                                    "default": "tsql",
                                },
                                "plan": {"type": "string", "description": "Optional execution plan XML/JSON"},
                            },
                            "required": ["sql"],
                        },
                    },
                    {
                        "name": "list_presets",
                        "description": "List curated enterprise query benchmarks and case studies.",
                        "inputSchema": {"type": "object", "properties": {}},
                    },
                ]
            },
        }

    # 5. tools/call
    if method == "tools/call":
        tool_name = params.get("name")
        args = params.get("arguments", {})

        if tool_name == "analyze_sql":
            sql_text = args.get("sql", "")
            d_val = args.get("dialect", "tsql")
            try:
                clean = sanitize_sql(sql_text)
                report = analyze_sql(clean, d_val)
                summary_md = f"### AutoDBA Analysis ({d_val})\n\n"
                summary_md += f"- **Tables**: {', '.join(t.name for t in report.tables)}\n"
                summary_md += f"- **Complexity Score**: {report.complexity_score}/100\n"
                summary_md += f"- **Diagnostics Found**: {len(report.diagnostics)}\n\n"
                for d in report.diagnostics:
                    summary_md += f"- **[{d.rule_id}]** {d.title}: {d.message}\n  *Suggestion*: {d.suggestion}\n"

                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [{"type": "text", "text": summary_md}],
                        "structuredContent": report.model_dump(),
                        "isError": False,
                    },
                }
            except Exception as e:
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [{"type": "text", "text": f"Error during analysis: {e}"}],
                        "isError": True,
                    },
                }

        elif tool_name == "optimize_sql":
            sql_text = args.get("sql", "")
            d_val = args.get("dialect", "tsql")
            plan_text = args.get("plan")
            try:
                clean = sanitize_sql(sql_text)
                # Deterministic execution for MCP (free tier safe, zero external token consumption)
                opt_res = await run_optimization(clean, d_val, plan_text, api_key=None, allow_llm=False)
                md = f"### AutoDBA Optimized Query ({d_val})\n\n```sql\n{opt_res.optimized_sql}\n```\n\n"
                md += f"**Estimated Improvement**: {opt_res.estimated_improvement_pct}%\n"
                md += f"**Explanation**: {opt_res.explanation}\n\n"
                if opt_res.ddl_recommendations:
                    md += "#### Recommended Index Migration DDL:\n```sql\n"
                    for idx in opt_res.ddl_recommendations:
                        md += f"{idx.ddl}\n"
                    md += "```\n"

                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [{"type": "text", "text": md}],
                        "structuredContent": opt_res.model_dump(),
                        "isError": False,
                    },
                }
            except Exception as e:
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [{"type": "text", "text": f"Error during optimization: {e}"}],
                        "isError": True,
                    },
                }

        elif tool_name == "list_presets":
            summary_md = "### AutoDBA Enterprise Presets\n\n"
            for p in PRESETS:
                summary_md += f"- **{p.title}** (`{p.id}`): {p.domain} ({p.dialect}) — *{p.headline_metric}*\n"
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": summary_md}],
                    "structuredContent": [p.model_dump(exclude={"sql", "plan", "curated"}) for p in PRESETS],
                    "isError": False,
                },
            }

        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "error": {"code": -32601, "message": f"Method/Tool '{tool_name}' not found"},
        }

    # Unknown method
    return {
        "jsonrpc": "2.0",
        "id": req_id,
        "error": {"code": -32601, "message": f"Method '{method}' not found"},
    }
