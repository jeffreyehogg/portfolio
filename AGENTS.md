# Agent Guidelines & Memory (`AGENTS.md`)

This file is automatically loaded by Antigravity as the primary context and operating protocol for developing and maintaining the **Jeff Hogg Portfolio**.

---

## 1. Project Overview & Architecture

- **Architecture**: Standalone Next.js App Router application (`pnpm`)
- **Stack**: Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v3, Framer Motion, Resend, Google reCAPTCHA v3
- **Package Manager**: `pnpm` (version `10.21.0`)
- **Data & Content**: Centralized in `lib/data.ts`

---

## 2. Development Commands & Workflow

Run these from the root directory:

```bash
# Start local dev server
pnpm dev

# Lint, typecheck, and build
pnpm lint
pnpm typecheck
pnpm build

# Install dependencies
pnpm install
```

---

## 3. Model Selection Guide (Cost & Speed Optimization)

- **Pro Models** (e.g., Gemini Pro):
  - Major architectural migrations (e.g., framework switches, full rewrites)
  - Intricate 3D / WebGL / Canvas / complex physics animations
  - Deep multi-file debugging and subtle hydration/compiler bugs
- **Flash (High) Models** *(Default for Pair-Programming)*:
  - Component building, responsive layouts, Tailwind styling
  - Writing Server Actions, form handlers, API routes
  - Running builds, tests, and standard refactors
- **Flash Lite Models**:
  - Updating copy and bio in `lib/data.ts`
  - Quick CSS tweaks, color token swaps, metadata/SEO updates
  - Fast file searches and git queries

---

## 4. Agent Operating Protocols

1. **Verify Before Completing**:
   - Run typecheck / build after significant changes to catch missing imports, broken typings, or syntax errors.
2. **Server vs. Client Components**:
   - Keep components as React Server Components (RSC) by default (if using React/Next.js/Astro).
   - Use `'use client'` / island hydration only when components need local state (`useState`), browser APIs, or animations.
3. **Atomic & Reusable Code**:
   - Place shared components in UI library folders; isolate domain-specific sections.
4. **Planning Mode**:
   - Present an implementation plan before making major architectural modifications.

---

## 5. Iterative Learnings & User Preferences

*Agents: Continuously update this section as you learn new user preferences, design constraints, or architectural decisions during our pair-programming sessions.*

### Design & Aesthetic Preferences
- **Core Focus**: 100% Software Engineering / Senior Software Engineer.
- **Identity & Positioning**: Software Engineer | DevOps, System Architecture, Web & Native iOS.
  - *Software Engineer @ TWFG Insurance (The Woodlands Financial Group) (November 2026 – Present)*: Engineering full-stack enterprise insurance platforms, internal web applications, API integrations, and relational database systems.
  - *Web & Data Administrator @ LGI Homes (March 2026 – November 2026)*: Full-stack internal web features, Docker/Nginx containerization, automated CI/CD (GitHub Actions + self-hosted runners), Node.js/TypeScript middleware, and MS SQL Server & MySQL query tuning.
  - *Enterprise Software Engineer @ Cisco (Webex Calling)*: Enterprise frontend (Control Hub), Cypress E2E, Jenkins, Kibana/PagerDuty production operations.
  - *Independent Software Engineer*: Native iOS App Store apps (`Aura` in Swift 6 / SwiftUI / SwiftData), Next.js full-stack apps on Vercel, and enterprise data migrations (Python/SQL).
- **Design & Layout (User Preference)**: Bento grids, stat cards, subtle glows, and developer badges are welcome as long as the design looks good, clean, and simple. Keep text concise, avoid walls of text, and ensure the primary interface is intuitive and easy to use.

### Engineering & Code Preferences
- Focus on real-world engineering impact: API integration, database architecture, CI/CD automation, and modern full-stack TypeScript.
- Package manager is flexible.
- Model efficiency: Leverage Flash Lite / Flash for everyday work, reserve Pro for heavy architectural decisions.
- **Server Lifecycle**: Stop all dev servers and background daemon processes after pushing to GitHub or completing verification.

### Known Gotchas & Solutions
- **Next.js HMR Image Imports**: Avoid relative imports from `public/` (e.g. `import img from '../../public/...'`) inside client components, as Webpack's image loader can cause chunk module ID mismatches during HMR (`TypeError: __webpack_modules__[moduleId] is not a function`). Use standard string paths (`src='/images/...'`).
- **Next.js 16 CLI Linting**: In Next.js 16 (Turbopack), `next lint` is no longer a Next CLI command (`next [dir] [cmd]` parses `lint` as a directory name). Always configure `"lint": "eslint ."` in `package.json`.
- **PACS Data Normalization**: In physical security migrations, credentials and facility codes must remain immutable strings throughout ingestion and transformation to avoid Excel's automatic coercion of 37-bit IDs into scientific notation or stripping of leading zeros.
- **Nitro Edge Caching & Multi-Tier Fallback**: In edge-rendered API endpoints consuming rate-limited third-party APIs, pair Nitro's `defineCachedEventHandler` (SWR caching) with a multi-tier fallback architecture (Primary API -> High-availability open public API -> Synthetic stochastic micro-drift simulator) to guarantee 0% downtime and prevent 500 error cascades when API keys are absent or rate limits are exceeded during CI/CD prerendering.
- **Accessible HTML5 Canvas Telemetry (WCAG 2.1 AA)**: HTML5 `<canvas>` elements cannot be read by screen readers. Wrap the canvas with `role="img"` and a dynamic `aria-label`, and supply an accessible, hidden `table.sr-only` summarizing recent time-series data points so assistive technologies can parse financial charts.

---

## 6. Active Workspace Skills (`.agents/skills/`)

The following modular skills are checked into the repository and loaded on demand by Antigravity:
- **`high-craft-ui`**: Expert guidelines and design patterns for building high-craft, modern, visually stunning web user interfaces (layered surfaces, ambient radial glows, Framer Motion springs, and developer telemetry).
- **`nextjs-app-router-craft`**: Architecture patterns and conventions for Next.js 15/16 App Router, React 19, RSC boundaries, Server Actions with Zod validation, Clerk auth, and Drizzle/Neon database workflows.
- **`seo-cwv-performance`**: Technical guidelines for Core Web Vitals optimization (LCP, CLS, INP), metadata, dynamic OpenGraph images, and JSON-LD structured data schemas for search engines.
