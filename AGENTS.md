# Agent Guidelines & Memory (`AGENTS.md`)

This file is automatically loaded by Antigravity as the primary context and operating protocol for developing and maintaining the **Jeff Hogg Portfolio**.

---

## 1. Project Overview & Architecture

- **Framework**: Next.js 15 (App Router)
- **Runtime / UI**: React 19, TypeScript
- **Package Manager**: `pnpm` (version `10.x`)
- **Styling**: Tailwind CSS v3 with `@tailwindcss/typography`, `@tailwindcss/forms`, `@tailwindcss/aspect-ratio`
- **Animation**: `framer-motion`
- **Icons & UI Primitives**: `@heroicons/react`, `@headlessui/react`
- **Data & Content**: Centralized in [`lib/data.ts`](file:///Users/jeffhogg/Documents/GitHub/portfolio/lib/data.ts)
- **Validation & Forms**: `zod`, `resend`, `react-google-recaptcha-v3`

---

## 2. Development Commands & Workflow

Package manager is flexible (default to `pnpm`, but adapt based on project architecture decision):

```bash
# Start local dev server
pnpm dev

# Typecheck and build production bundle
pnpm build

# Linting
pnpm lint
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
- **Core Focus**: 100% Software Engineering / Senior Full-Stack Developer.
- **Identity & Positioning**: Full-Stack Developer | DevOps, System Architecture & API Integration.
  - *Solo Technical Lead @ LGI Homes*: Modernizing legacy systems, Docker/Nginx containerization, automated CI/CD (GitHub Actions + self-hosted runners), Node.js/TypeScript middleware, distributed MS SQL & MySQL, and agentic workflows.
  - *Enterprise Software Engineer @ Cisco (Webex Calling)*: Enterprise frontend (Control Hub), Cypress E2E, Jenkins, Kibana/PagerDuty production operations.
  - *Freelance Software Developer*: Next.js full-stack apps on Vercel, enterprise data migrations (Python/SQL).
- **Aesthetic**: High-craft developer aesthetic—clean typography, subtle borders/glows, interactive system architecture callouts, dark/light themes, performance-oriented.

### Engineering & Code Preferences
- Focus on real-world engineering impact: API integration, database architecture, CI/CD automation, and modern full-stack TypeScript.
- Package manager is flexible.
- Model efficiency: Leverage Flash Lite / Flash for everyday work, reserve Pro for heavy architectural decisions.

### Known Gotchas & Solutions
- *(Record recurring build issues, library compatibility notes, or environment quirks here)*

---

## 6. Skills & Extension Roadmap

When procedures become repetitive or specialized, define custom skills in `.agents/skills/<skill-name>/SKILL.md`:
- `portfolio-section-builder`: Step-by-step generator for responsive, animated portfolio sections.
- `content-sync`: Validating and updating data models in `lib/data.ts`.
- `build-audit`: Automated checklist for bundle size, image optimizations, and SEO tags.
