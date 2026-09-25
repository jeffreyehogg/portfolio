---
name: turbo-monorepo-ops
description: >-
  Standard operating procedures for managing, configuring, building, and deploying the Turborepo
  and pnpm workspaces monorepo. Trigger when adding dependencies, modifying turbo.json, debugging
  Vercel CI/CD deployment pipelines, managing lockfiles, or running multi-app builds.
---

# Turborepo & Monorepo Operations Skill

This skill defines the operational protocols and troubleshooting runbooks for maintaining this multi-app monorepo.

---

## 1. Monorepo Architecture Overview

- **Package Manager**: `pnpm` (Workspace mode)
- **Task Runner**: `Turborepo`
- **Applications**:
  - `apps/portfolio`: Next.js 15/16 App Router, React 19, Tailwind CSS v3
  - `apps/kingdom-connect`: Next.js 16 (Turbopack), React 19, Tailwind CSS v4, Clerk, Drizzle, Neon
  - `apps/legacy-link`: Next.js 16, TypeScript, Clerk
  - `apps/forexflow-dashboard`: Nuxt 3, Vue, Chart.js, Tailwind CSS v3
- **Shared Packages**:
  - `packages/typescript-config`: Shared `tsconfig` base definitions
  - `packages/eslint-config`: Shared ESLint rules

---

## 2. Standard Commands & Dependency Workflows

**Rule: ALWAYS execute dependency and build commands from the root workspace directory.**

```bash
# Build all applications with Turborepo remote caching
pnpm build

# Build a single targeted application
npx turbo build --filter=portfolio
npx turbo build --filter=kingdom-connect

# Start local dev server for a specific application
npx turbo dev --filter=portfolio

# Add a dependency to a specific workspace application
pnpm add <package-name> --filter <app-name>

# Add a dev dependency to a specific workspace application
pnpm add -D <package-name> --filter <app-name>

# Sync and update pnpm-lock.yaml after any package.json edits
pnpm install
```

---

## 3. Package Hoisting & Cross-Framework Gotchas

### Nuxt 3 vs. Next.js Tailwind Version Conflicts
- `apps/kingdom-connect` uses Tailwind CSS v4.
- `apps/forexflow-dashboard` uses Nuxt UI, which requires Tailwind CSS v3.
- If Tailwind v4 is hoisted to the root `node_modules`, Nuxt's PostCSS loader will fail.
- **Rule**: Always keep `tailwindcss: "^3.4.x"` explicitly pinned in `apps/forexflow-dashboard/package.json`.

### Pnpm Lockfile Strictness (`ERR_PNPM_OUTDATED_LOCKFILE`)
- Vercel CI executes `pnpm install --frozen-lockfile`.
- If any `package.json` file in `apps/*` or `packages/*` is modified, you **MUST** run `pnpm install` locally before committing to keep `pnpm-lock.yaml` synchronized.

---

## 4. Turborepo Environment Variable Rules

Turborepo scrubs environment variables during the `build` task to guarantee cache correctness.

1. **When a Build Fails Claiming a Missing Env Var**:
   - If Next.js static generation throws an error that `DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, or any other key is missing:
   - Add that environment variable to `turbo.json` under `tasks.build.env`:
     ```json
     {
       "tasks": {
         "build": {
           "env": [
             "DATABASE_URL",
             "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
             "CLERK_SECRET_KEY"
           ]
         }
       }
     }
     ```

---

## 5. Vercel Monorepo Deployment Guidelines

1. **Ignored Build Step**:
   - In each app's Vercel Project Settings > Git, the **"Ignored Build Step"** must remain on **Automatic**.
   - Vercel detects Turborepo and automatically runs `npx turbo-ignore` to skip deployment if that specific app and its shared dependencies did not change.
2. **Root Directory**:
   - Each project on Vercel must have its **Root Directory** pointed to its specific app folder (e.g., `apps/portfolio`, `apps/kingdom-connect`).
3. **Daemon Cleanup**:
   - Always terminate any background local development servers before ending an agent session.
