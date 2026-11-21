# Agent Guidelines (`AGENTS.md`)

Primary context for developing and maintaining the **Jeff Hogg Portfolio**.

## 1. Project Overview & Stack

- **Architecture**: Standalone Next.js App Router application (`pnpm`)
- **Stack**: Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v3, Framer Motion, Resend, Google reCAPTCHA v3
- **Data & Content**: Centralized in `lib/data.ts`

## 2. Commands

Run from the repository root:

```bash
pnpm dev        # Start local dev server
pnpm lint       # Run ESLint (eslint .)
pnpm typecheck  # TypeScript check (tsc --noEmit)
pnpm build      # Production build
```

## 3. Guidelines

- **Verify changes**: Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` after meaningful edits.
- **Server vs. Client Components**: Default to React Server Components (RSC); add `'use client'` only when a component needs state, browser APIs, or client-side interactivity.
- **Server lifecycle**: Stop any dev servers or background processes after verification or pushing to GitHub.

## 4. Positioning & Design Preferences

- **Focus**: Software Engineering — full-stack web, DevOps/CI/CD, API & middleware architecture, relational databases, and native iOS (`Aura` in Swift 6 / SwiftUI / SwiftData).
- **Career context**:
  - *Software Engineer @ TWFG Insurance (The Woodlands Financial Group)* (Nov 2026 – Present)
  - *Web & Data Administrator @ LGI Homes* (Mar 2026 – Nov 2026)
  - *Software Engineer @ Cisco (Webex Calling / Control Hub)* (Dec 2021 – Jun 2024)
  - *Independent / Freelance Software Engineer* (Jul 2024 – Feb 2026)
- **Visual direction**: Clean, simple, and intuitive. Keep copy concise and avoid walls of text.

## 5. Known Gotchas

- **Next.js HMR Image Imports**: Avoid relative imports from `public/` inside client components (can trigger chunk module ID mismatches during HMR). Use string paths (`src='/images/...'`).
- **Next.js 16 CLI Linting**: `next lint` is no longer a Next.js CLI command; keep `"lint": "eslint ."` in `package.json`.

## 6. Workspace Skills (`.agents/skills/`)

- **`nextjs-app-router-craft`**: Next.js 15/16 App Router, React 19, RSC boundaries, and Server Actions conventions.
- **`seo-cwv-performance`**: Core Web Vitals (LCP, CLS, INP), metadata, OpenGraph images, and JSON-LD structured data.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
