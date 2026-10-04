---
name: high-craft-ui
description: >-
  Expert guidelines and design patterns for building high-craft, modern, visually stunning web user interfaces.
  Trigger when creating, refactoring, or styling frontend components, landing pages, interactive cards, portfolios,
  or dashboards using Tailwind CSS, Framer Motion, dark mode aesthetics, glassmorphism, ambient lighting, and micro-interactions.
---

# High-Craft UI & Calm Design System Skill

This skill provides a standardized design protocol for building production-grade, visually polished, and high-craft interfaces that reflect senior engineering caliber.

The hallmark of true craft is **restraint, clarity, and low cognitive load**. Interfaces should feel effortless, calm, and purposeful—like Linear, Raycast, Supabase, and Vercel.

---

## 1. Core Anti-AI-Slop Directives (MANDATORY)

AI models tend to default to two failure modes: (A) monotonous generic templates, or (B) **over-engineered "Bento & Telemetry Slop"** (cramming marketing cards, neon glows, and all-caps labels into active workspaces). Strictly avoid both:

| Anti-Pattern (AI-Slop) | High-Craft Standard |
|---|---|
| **Bento & Telemetry Slop** (Forcing 4 marketing cards, decorative gauges, and walls of text into an active tool or workspace) | **Calm Functional Workspaces**: Primary tool is immediately usable above the fold. Secondary architecture notes and deep telemetry live in clean tabs or collapsible drawers. |
| **Monotonous 3-Box Grids** (3 identical static cards with generic icons and marketing filler) | **Context-Appropriate Layouts**: Interactive pill selectors, split-view work areas, or clean list tables. Reserve asymmetric bentos strictly for marketing landing pages. |
| **All-Caps Screaming Badges** (`uppercase tracking-wider font-mono` plastered across every label, card header, and button) | **Calm Typography**: Natural sentence-case titles and labels. Reserve monospace strictly for actual code, syntax, query keywords, and hashes. |
| **Giant Multi-Line Choice Cards** (Turning a 4-choice scenario selector into giant 300px cards that push the app off-screen) | **Compact Interactive Controls**: Single-row horizontal pill selectors (`Try an example: [A] [B] [C]`) or clean dropdowns. |
| **Single-State Implementations** (Only static default view coded) | **Complete 5-State Lifecycles**: Default, Hover/Active, Focus-Visible, Loading Skeleton, and Empty State. |
| **Generic Buzzword Copy** ("Seamless next-gen solutions") | **Concrete Domain Metrics & Nouns**: ("Sub-second LCP (0.7s)", "I/O Reads reduced by 95%", "AST Verification"). |

---

## 2. Context Distinction: Application Workspaces vs. Landing Pages

Before designing, determine the component's context:

### A. Functional Application Workspaces (Default for Tools, Studios, Dashboards)
- **Primary Goal:** Immediate utility, speed, and focus.
- **Rules:**
  - The main input and primary output must be visible immediately without scrolling past decorative banners.
  - Quick examples/presets must use a single-row compact pill bar (`Try an example: [CRM] [Telemetry]`) or a sleek dropdown.
  - Explanations and educational copy must use **progressive disclosure** (collapsible "How it works" drawer or secondary tab).
  - Clean, high-contrast typography in sentence case.

### B. Marketing & Landing Pages
- **Primary Goal:** Storytelling, conversion, and architectural credibility.
- **Rules:**
  - Hero spotlight with crisp typography and subtle ambient glow.
  - Asymmetric feature grids highlighting tangible capabilities and proof metrics.
  - Social proof and tech stack badges.

---

## 3. Surface Elevation, Glassmorphism & Refined Depth

Construct optical depth through subtle, semi-transparent layers and clean borders:

### Surface Elevation Hierarchy
- **Canvas Base**: `bg-slate-950` (or `bg-black` for ultra-dark themes).
- **Primary Cards & Containers**: `bg-slate-900/60` to `bg-slate-900/80` with `backdrop-blur-xl` and subtle `border border-white/[0.06]`.
- **Nested Elements & Inset Areas**: `bg-slate-950/70` with `border border-white/[0.04]`.
- **Interactive Hover Surfaces**: `hover:bg-slate-850/80` with `hover:border-white/[0.12]`.
- **Active / Accent Highlights**: `bg-indigo-600/15 border-indigo-500/40 text-indigo-300`.

### Inset Lighting (Use Sparingly)
Subtle 1px top highlight on primary containers only:
```tsx
className="relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
```

### Ambient Atmospheric Glows (Background Only)
Keep diffusers subtle so they don't distract from text legibility:
```tsx
<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px]" />
</div>
```

---

## 4. Multi-State Component Lifecycle (Never Ship 1 State)

Every interactive list, form, or filterable component must explicitly code 5 states:

### 1. Tactile Active State (Buttons & Cards)
```tsx
className="active:scale-[0.98] transition-all duration-150 cursor-pointer"
```

### 2. Accessible Focus-Visible Ring (Never bare outlines)
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
```

### 3. Loading Skeleton State (Matching shape)
```tsx
export function CardSkeleton() {
  return (
    <div className="rounded-xl bg-slate-900/50 border border-white/[0.06] p-4 animate-pulse">
      <div className="w-24 h-4 rounded bg-slate-800 mb-3" />
      <div className="w-3/4 h-5 rounded bg-slate-800/60 mb-2" />
      <div className="w-1/2 h-3 rounded bg-slate-800/40" />
    </div>
  );
}
```

### 4. Empty State with Clear Action (No Dead Ends)
```tsx
export function EmptyState({ onAction, message }: { onAction: () => void; message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/20 p-8 text-center">
      <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-white/[0.06] flex items-center justify-center mx-auto mb-3 text-slate-400">
        <Sparkles className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-semibold text-white mb-1">No items found</h4>
      <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">{message}</p>
      <button
        onClick={onAction}
        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium active:scale-[0.98] transition-all"
      >
        Reset Filters
      </button>
    </div>
  );
}
```

---

## 5. Typography Pacing & Calm Hierarchy

- **Headlines**: `font-bold text-white tracking-tight` with `text-balance`.
- **Body & Explanations**: `text-xs text-slate-300 leading-relaxed font-normal`.
- **Badges & Pills**: Clean sentence-case or title-case (e.g., `Critical`, `High impact`, `PostgreSQL`), styled with soft background and 1px border (`bg-indigo-500/10 text-indigo-300 border-indigo-500/20`).
- **Code & Syntax**: `font-mono text-xs leading-6` with syntax tokens. DO NOT format general UI text with `font-mono uppercase`.

---

## 6. Pre-Flight Anti-Slop Checklist

Before delivering any frontend component:
- [ ] **Workspace Calmness**: Can the user immediately use the tool without scrolling past decorative bento cards or marketing copy?
- [ ] **Case Discipline**: Are UI labels and badges in natural sentence case instead of all-caps `UPPERCASE TRACKING-WIDER`?
- [ ] **Compact Selectors**: Are options presented as sleek pills or dropdowns rather than giant card blocks?
- [ ] **Progressive Disclosure**: Are dense technical explanations or architecture diagrams tucked into tabs or collapsible drawers?
- [ ] **Tactile Scale & Focus**: Do interactive elements have `active:scale-[0.98]` and accessible focus rings?
- [ ] **5 States Tested**: Are default, hover, focus, loading skeleton, and empty states implemented?

