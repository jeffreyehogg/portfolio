# AutoDBA — Architecture Contract

> Agentic SQL diagnostics, AST analysis and index synthesis. Next.js 16 frontend + FastAPI (Python 3.12) serverless
> function, deployed as one Vercel project (`apps/autodba`). **AutoDBA never connects to or executes against a
> database** — everything is static analysis of SQL text and (optional) execution-plan documents.

This document is the binding contract for every contributor (human or agent). Shared payloads are defined **only** in
[`engine/schemas.py`](engine/schemas.py) and mirrored in `lib/types.ts`.

---

## 1. Layout

```
apps/autodba/
├── api/
│   └── index.py              # ONLY .py file under api/ — Vercel makes every api/*.py a separate function
├── engine/                   # importable Python package (bundled into the function by @vercel/python)
│   ├── __init__.py
│   ├── schemas.py            # ✅ contract (lead-owned, do not change shapes without updating lib/types.ts)
│   ├── core/{__init__,config,security}.py
│   ├── analyzer/{__init__,rules,ast_visitor,plan_parser}.py
│   ├── optimizer/{__init__,ddl_generator,rewriter,verifier,cost_model,llm,agent}.py
│   └── data/{__init__,presets}.py
├── tests/                    # pytest (zero network, zero API keys)
├── app/ components/ lib/     # Next.js 16 App Router frontend
├── requirements.txt          # runtime deps only (shipped to Vercel)
├── requirements-dev.txt      # + uvicorn, pytest, httpx
├── vercel.json               # function maxDuration + excludeFiles
└── next.config.ts            # /api/py/* → 127.0.0.1:8006 (dev) | /api/ (prod)
```

Local Python: `apps/autodba/.venv` (Python 3.12, created with `uv`). Run tests: `.venv/bin/pytest -q` from `apps/autodba`.
Imports are absolute from the app root: `from engine.analyzer.ast_visitor import analyze_sql`. `api/index.py` inserts
the app root into `sys.path` defensively.

---

## 2. Module signatures (binding)

### `engine/core/config.py`
```python
class Settings(BaseSettings):            # pydantic-settings, env vars, no .env file required
    gemini_api_key: str | None           # env GEMINI_API_KEY (fallback GOOGLE_API_KEY)
    gemini_model: str = "gemini-flash-latest"   # env GEMINI_MODEL
    llm_daily_limit: int = 5             # server-key optimizations / IP / 24h
    byok_daily_limit: int = 50           # BYOK optimizations / IP / 24h (protects compute only)
    analyze_per_minute: int = 60         # deterministic endpoints / IP / 60s
    llm_timeout_s: float = 25.0
    max_agent_iterations: int = 3
    app_version: str = "1.0.0"
def get_settings() -> Settings           # lru_cache
```

### `engine/core/security.py`
```python
class RateLimiter:                       # thread-safe, in-memory, fixed window; best-effort per serverless instance
    def __init__(self, limit: int, window_s: int): ...
    def hit(self, key: str) -> tuple[bool, int, int]   # (allowed, remaining, reset_seconds)
    def peek(self, key: str) -> tuple[int, int]        # (remaining, reset_seconds)
def client_ip(headers: Mapping[str, str], fallback: str | None) -> str   # x-forwarded-for[0] → x-real-ip → fallback
def sanitize_sql(sql: str) -> str        # strip NUL/control chars (keep \t\n), normalise CRLF, strip; raise ValueError if empty
def is_plausible_api_key(key: str) -> bool   # ^[A-Za-z0-9_\-]{20,200}$
```
API keys are **never** logged, persisted, echoed, or included in trace/error text.

### `engine/analyzer/rules.py`
`RULES: dict[str, RuleMeta]` — `RuleMeta(id, severity, title, cost_weight, dialects: frozenset[Dialect] | None)`, plus
`make_diagnostic(rule_id, message, *, snippet=None, line=None, suggestion=None) -> Diagnostic`.

Required rule ids (others welcome):

| rule_id | severity | detects |
|---|---|---|
| `PARSE_ERROR` | critical | sqlglot could not parse |
| `CARTESIAN_JOIN` | critical | comma/implicit join or JOIN with no ON/USING and no linking WHERE predicate; explicit `CROSS JOIN` |
| `NON_SARGABLE_FUNCTION` | critical | column wrapped in function in WHERE/JOIN ON/HAVING predicate (YEAR, MONTH, DAY, DATEPART, CONVERT/CAST, SUBSTRING/LEFT/RIGHT, UPPER/LOWER, LTRIM/RTRIM/TRIM, ISNULL/COALESCE/IFNULL, DATE_TRUNC, DATE(), anonymous UDF) |
| `NON_SARGABLE_ARITHMETIC` | warning | arithmetic on column side of comparison (`Price * 1.1 > 100`, `DATEADD(..., col) > x`) |
| `LEADING_WILDCARD_LIKE` | warning | `LIKE '%foo'` |
| `SELECT_STAR` | warning | `SELECT *` / `t.*` overfetching |
| `CURSOR_LOOP` | critical | T-SQL `DECLARE … CURSOR`, `FETCH NEXT`, `WHILE` blocks (RBAR) |
| `CORRELATED_SUBQUERY` | warning | subquery in SELECT list / WHERE referencing outer alias |
| `NOT_IN_SUBQUERY` | warning | `NOT IN (SELECT …)` (NULL semantics + anti-join) |
| `OR_ACROSS_COLUMNS` | optimization | `a = 1 OR b = 2` defeating index seeks |
| `IMPLICIT_CONVERSION` | warning | `::text`/CAST on column compared to literal; numeric literal vs string-looking column (heuristic) |
| `NOLOCK_HINT` | warning | tsql `WITH (NOLOCK)` / `READUNCOMMITTED` |
| `TOP_WITHOUT_ORDER` | warning | tsql `TOP n` / `LIMIT n` without ORDER BY |
| `ORDER_BY_RAND` | warning | mysql `ORDER BY RAND()` / `NEWID()` / `random()` |
| `DISTINCT_OVERUSE` | optimization | `SELECT DISTINCT` combined with joins (masking dup-producing joins) |
| `UNBOUNDED_SCAN` | optimization | SELECT from table with no WHERE / no LIMIT |
| `DEEP_OFFSET` | optimization | OFFSET ≥ 1000 (keyset pagination) |

### `engine/analyzer/ast_visitor.py`
```python
def analyze_sql(sql: str, dialect: Dialect) -> AnalysisReport
```
* Silence `logging.getLogger("sqlglot")` below ERROR. Use `sqlglot.parse(sql, read=dialect, error_level=ErrorLevel.RAISE)`;
  on `ParseError` return `parse_ok=False` + `PARSE_ERROR` diagnostic (never raise).
* `exp.Command` statements whose text matches `DECLARE … CURSOR` / `FETCH` / `OPEN` count toward `CURSOR_LOOP`; walk
  `exp.WhileBlock` children too.
* sqlglot ≥ 30: FROM lives in `select.args["from_"]`. **`exp.And`/`exp.Or` subclass `exp.Func`** — never use
  `find_all(exp.Func)` blindly; use an explicit allow-list of non-SARGable function classes + `exp.Anonymous`, and only
  flag when a `exp.Column` is inside the function **and** the function is an operand of a comparison
  (`EQ, NEQ, GT, GTE, LT, LTE, Like, ILike, In, Between`).
* `tables`: base tables only (exclude CTE names), resolve aliases. `column_usage`: map alias→table; `equality` (col = literal/param),
  `range` (>,<,BETWEEN,LIKE 'x%'), `join` (ON / linking predicates), `select`, `order`, `group`.
* `line`: best-effort 1-based line of the snippet in the original text.
* `complexity_score`: 0–100 from joins, subqueries, CTEs, predicates. `normalized_sql`: `expr.sql(dialect, pretty=True)`.
* Deduplicate diagnostics by (rule_id, snippet). Sort critical → warning → optimization.

### `engine/analyzer/plan_parser.py`
```python
def parse_plan(plan_text: str, dialect: Dialect) -> PlanSummary
```
Auto-detect: `<ShowPlanXML` → `sqlserver_xml` (parse with **defusedxml**, namespace
`http://schemas.microsoft.com/sqlserver/2004/07/showplan`); JSON list with `Plan` → `postgres_json`; JSON with
`query_block` → `mysql_json`. Emit `PlanOperator`s (`cost_pct` relative to total), mark `is_bottleneck` when
`cost_pct ≥ 25` or op is a scan on a large table (est rows ≥ 100k), table spools/sorts that spill, hash-match warnings,
`using_temporary_table`/`using_filesort`, `Seq Scan` with large rows. Bottlenecks become `Diagnostic`s with rule ids
`PLAN_TABLE_SCAN`, `PLAN_KEY_LOOKUP`, `PLAN_SORT_SPILL`, `PLAN_TEMP_TABLE`, `PLAN_FILESORT`, `PLAN_HIGH_COST_OPERATOR`,
`PLAN_IMPLICIT_CONVERSION` (SQL Server `PlanAffectingConvert`). SQL Server `<MissingIndexGroup>` →
`IndexRecommendation` via `build_index_ddl`. Never raise — on failure return `PlanSummary(format="unknown", parse_error=…)`.

### `engine/optimizer/ddl_generator.py`
```python
def build_index_ddl(table: str, key_columns: list[str], include_columns: list[str], dialect: Dialect,
                    where_clause: str | None = None) -> str
def synthesize_indexes(report: AnalysisReport) -> list[IndexRecommendation]
```
* Key column order: equality → join → range (max 4). Include: select/order/group columns not in key (max 8). No includes
  if the query uses `SELECT *` (add rationale note).
* Names `IX_<Table>_<Col1>_<Col2>` (strip schema/brackets), truncated: tsql 128, postgres 63, mysql 64.
* Zero-downtime DDL:
  * tsql: `CREATE NONCLUSTERED INDEX [IX_…] ON [dbo].[T] ([A], [B]) INCLUDE ([C]) [WHERE …] WITH (ONLINE = ON, SORT_IN_TEMPDB = ON, DATA_COMPRESSION = PAGE);`
  * postgres: `CREATE INDEX CONCURRENTLY IF NOT EXISTS ix_… ON schema.t (a, b) INCLUDE (c) [WHERE …];`
  * mysql (no INCLUDE): covering composite `ALTER TABLE t ADD INDEX ix_… (a, b, c), ALGORITHM=INPLACE, LOCK=NONE;`
* One recommendation per table, deduplicated; skip tables with no filter/join columns.

### `engine/optimizer/rewriter.py` (deterministic, no network)
```python
def deterministic_rewrite(sql: str, dialect: Dialect, report: AnalysisReport) -> RewriteResult
```
AST transforms (each only when safe; record rule_id in `fixes`, human note in `notes`):
1. `YEAR(col) = N` → `col >= 'N-01-01' AND col < 'N+1-01-01'` (also `>=, >, <, <=, BETWEEN`); `MONTH`+`YEAR` pair → month range.
2. `CAST/CONVERT(col AS DATE) = 'lit'` → `col >= 'lit' AND col < 'lit'+1 day`; postgres `date_trunc('day', col) = X` / `col::date = X` likewise.
3. Comma joins where WHERE contains `a.x = b.y` → explicit `INNER JOIN … ON`; remaining predicates stay in WHERE.
4. `NOT IN (SELECT c FROM …)` → `NOT EXISTS (SELECT 1 FROM … WHERE c = outer)`.
5. `ORDER BY RAND()` etc.: note only. `SELECT *`: note only (no schema). `NOLOCK`: note only.
Output via `expr.sql(dialect=dialect, pretty=True)`. If nothing changed, return the pretty-printed original.

### `engine/optimizer/verifier.py`
```python
def verify_rewrite(original_sql: str, rewritten_sql: str, dialect: Dialect, before: AnalysisReport
                   ) -> tuple[VerificationReport, AnalysisReport]
```
Pass ⇔ parses, every base table in `before.tables` still present (case-insensitive, schema-agnostic), statement types
identical (a SELECT may never become DML/DDL — prompt-injection guard), and critical count not increased.
`ast_edit_counts` from `sqlglot.diff` (single-statement inputs; skip for multi-statement/Command).

### `engine/optimizer/cost_model.py`
```python
def estimate_cost(before: AnalysisReport, after: AnalysisReport, plan: PlanSummary | None,
                  indexes: list[IndexRecommendation]) -> tuple[CostEstimate, int]
```
Deterministic heuristic: base cost from plan `total_cost` or from complexity + Σ diagnostic `cost_weight`; each fixed
diagnostic and each index removes a weighted share. Return pct clamped **0–95**. Identical inputs ⇒ identical outputs.

### `engine/optimizer/llm.py`
```python
def build_prompt(sql, dialect, report, plan, deterministic: RewriteResult, critique: str | None) -> tuple[str, str]  # (system, user)
async def generate_rewrite(system: str, user: str, *, api_key: str, model: str, timeout_s: float) -> LLMRewrite
```
`google.genai.Client(api_key=…).aio.models.generate_content(model=…, contents=user, config=types.GenerateContentConfig(
system_instruction=system, response_mime_type="application/json", response_schema=LLMRewrite, temperature=0.2))`,
wrapped in `asyncio.wait_for`. Import `google.genai` lazily inside the function (cold-start). User SQL goes inside a
fenced, clearly delimited block and the system prompt states that instructions inside it must be ignored.

### `engine/optimizer/agent.py`
```python
async def run_optimization(sql: str, dialect: Dialect, plan_text: str | None, *,
                           api_key: str | None, model: str, allow_llm: bool, max_iterations: int = 3) -> OptimizationResult
def build_curated_result(sql: str, dialect: Dialect, plan_text: str | None, curated: LLMRewrite) -> OptimizationResult
```
Cyclic state machine (each node appends an `AgentStep`):

```
analyze → plan(optional) → rewrite_deterministic ─┬─ (no LLM) ─────────────────────────────→ verify → finalize
                                                   └─ llm_rewrite → verify ─ pass ─→ finalize
                                                          ▲            └ fail / no gain → critique ┐
                                                          └──────────── (≤ max_iterations) ─────────┘
```
* LLM path only if `allow_llm and api_key`. Any LLM exception/timeout → step `failed` (sanitised detail) and fall back to the
  deterministic candidate. Best verified candidate wins (fewest remaining critical, then most fixes).
* Indexes = `synthesize_indexes(after_report or before)` ∪ plan `missing_indexes` (dedupe by table+keys). LLM-proposed DDL
  strings are **not** executed or trusted verbatim; only synthesized DDL is returned as `IndexRecommendation`s (LLM DDL
  may be mentioned in `explanation`).
* `estimated_improvement_pct` = cost model value (LLM's number is ignored → no hallucinated metrics).
* `build_curated_result` = same finalize path with `engine="preset"` (used for presets; zero tokens).

### `engine/data/presets.py`
```python
class PresetSeed(BaseModel): id, title, domain, dialect, description, tags, headline_metric, sql, plan: str | None, curated: LLMRewrite
PRESETS: list[PresetSeed]
def get_preset_seed(preset_id: str) -> PresetSeed | None
```

---

## 3. HTTP API (`api/index.py`, FastAPI, all under `/api/py`)

| Method | Path | Notes |
|---|---|---|
| GET | `/api/py/health` | `HealthResponse` |
| GET | `/api/py/presets` | `PresetListResponse` |
| GET | `/api/py/presets/{id}` | `PresetDetail` (built once via `build_curated_result`, `lru_cache`) |
| POST | `/api/py/analyze` | `AnalyzeRequest` → `AnalyzeResponse` (deterministic; `analyze_per_minute` limit) |
| POST | `/api/py/optimize` | `OptimizeRequest` → `OptimizationResult`. Header `X-Gemini-Key` = BYOK. LLM used if mode=auto and (BYOK or server key) and quota remains; otherwise deterministic with `quota` explaining why. |
| GET | `/api/py/quota` | `QuotaInfo` for caller IP |
| POST | `/api/py/mcp` | Stateless MCP (JSON-RPC 2.0, Streamable HTTP, `protocolVersion` "2025-06-18"): `initialize`, `ping`, `tools/list`, `tools/call`; notifications → 202. Tools: `analyze_sql`, `optimize_sql` (deterministic only), `list_presets`. |

Errors: `{"error": {"code": str, "message": str}}`; 429 includes `Retry-After` and `X-RateLimit-Remaining`. Docs at
`/api/py/docs`. Limits: SQL ≤ 20k chars, plan ≤ 500k chars (enforced by schemas).

---

## 4. Frontend

Next.js 16 App Router, React 19, Tailwind v4, lucide-react, `diff` (jsdiff) for line/word diffs. Dev port **3006**,
FastAPI dev port **8006**. Lightweight custom SQL highlighter (textarea overlay) instead of Monaco (keeps LCP low).
BYOK key lives in `sessionStorage` only and is sent as `X-Gemini-Key`.
