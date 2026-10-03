# AutoDBA — Agentic SQL Diagnostics & AST Optimization

AutoDBA is a production-grade static SQL analysis, dialect rewrite, and index synthesis platform powered by Next.js 16 (App Router), FastAPI (Python 3.12), and Google Gemini Flash.

**AutoDBA never connects to or executes against live production databases.** Everything is executed via static AST parsing (via sqlglot) and optional execution plan telemetry analysis (.sqlplan XML or EXPLAIN JSON).

---

## Architecture & Tech Stack

- **Frontend**: Next.js 16.3.6 (App Router, Turbopack, React 19, Tailwind CSS v4, Lucide Icons, jsdiff)
- **API Engine**: FastAPI / Python 3.12 serverless function deployed on Vercel
- **Deterministic Engine**: AST rule enforcement & rewrite engine via `sqlglot`
- **Agentic Engine**: Cyclic Gemini Flash optimization loop (`analyze` → `rewrite` → `verify` → `critique` → `finalize`)
- **Protocol**: Built-in Model Context Protocol (MCP) Streamable HTTP endpoint at `/api/py/mcp`
- **Dialects Supported**: Microsoft SQL Server (T-SQL), PostgreSQL, MySQL

---

## Local Development

From the repository root (`/Users/jeffhogg/Documents/GitHub/portfolio`):

```bash
# Run Next.js frontend dev server (port 3006)
pnpm --filter autodba dev

# Run Python FastAPI backend dev server (port 8006)
pnpm --filter autodba dev:api

# Typecheck and lint
pnpm --filter autodba typecheck
pnpm --filter autodba lint

# Monorepo build
npx turbo build --filter=autodba
```
