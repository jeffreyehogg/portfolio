# AlgoQuest

Interactive, gamified coding & algorithmic adventure platform built with **Next.js 16 (App Router)**, **React 19**, **Pyodide v0.27.5 (Python 3.12 WebAssembly)**, **CodeMirror 6**, and **Web Workers** across 5 languages (**Python**, **JavaScript**, **TypeScript**, **Ruby**, and **Lua**).

## Developer Workflows

### Frontend & Monorepo Commands
```bash
# Start local development server on port 3007
npx turbo dev --filter=algoquest

# Typecheck and lint TypeScript/React
pnpm --filter algoquest typecheck
pnpm --filter algoquest lint

# Run Vitest unit tests
pnpm --filter algoquest test
```

### Python Sandbox, Curriculum Verification & Linting (`uv` + `ruff` + `pytest`)
```bash
cd apps/algoquest

# Sync Python environment via uv
uv sync

# Run Pytest curriculum & sandbox verification suite
uv run pytest -v

# Run Ruff static analysis and formatter checks
uv run ruff check .
uv run ruff format --check .
```
