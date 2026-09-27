---
name: high-craft-ui
description: >-
  Expert guidelines and design patterns for building high-craft, modern, visually stunning web user interfaces.
  Trigger when creating, refactoring, or styling frontend components, landing pages, interactive cards, portfolios,
  or dashboards using Tailwind CSS, Framer Motion, dark mode aesthetics, glassmorphism, ambient lighting, and micro-interactions.
---

# High-Craft UI & Modern Design System Skill

This skill provides a standardized design protocol for building production-grade, visually polished, and high-craft interfaces that reflect senior engineering caliber.

---

## 1. Core Anti-AI-Slop Directives (MANDATORY)

AI models tend to default to predictable, repetitive layouts ("AI Slop"). When building or refactoring UI, strictly adhere to these rules:

| Anti-Pattern (AI-Slop) | High-Craft Standard |
|---|---|
| **Monotonous 3-Box Grids** (3 identical cards in a row with icon, title, description, link) | **Asymmetric Bento Grids** (Hero Spotlight Card, Proof/Metric Card, Interactive Tool Card, Integration Pill Card). |
| **Flat Gray Surfaces** (`bg-gray-800`, `border-gray-700`) | **Layered Depth & Inset Lighting** (`bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]` with top-edge inset highlights). |
| **Single-State Implementations** (Only static view coded) | **Complete 5-State Lifecycles** (Default, Hover/Active, Focus-Visible, Loading Skeleton, and Empty State). |
| **Generic Buzzword Copy** ("Seamless next-gen solutions") | **Concrete Domain Metrics & Nouns** ("Sub-second LCP (0.7s)", "60-Second Gifts Matcher", "Real-time Unit Economics"). |
| **Dead/Rigid Buttons** (Abrupt instant background color changes) | **Tactile Feedback** (`active:scale-[0.98] transition-transform`, smooth spring easing). |

---

## 2. Surface Elevation, Glassmorphism & Inset Lighting

Construct optical depth through layered semi-transparent surfaces, subtle borders, and directional lighting.

### Surface Elevation Hierarchy
- **Canvas Base**: `bg-slate-950` (or `bg-black` for ultra-dark setups).
- **Primary Cards & Containers**: `bg-slate-900/60` to `bg-slate-900/80` with `backdrop-blur-xl` and `border border-white/[0.08]`.
- **Nested Elements & Chips**: `bg-slate-800/60` to `bg-slate-800/80` with `border border-slate-700/50`.
- **Active / Focused Surfaces**: `bg-slate-800/90` or tinted accent `bg-indigo-500/10` with `border-indigo-500/30`.

### Inset Highlight (Simulated Overhead Key Light)
High-craft cards use a subtle 1px white highlight along the top edge to simulate physical lighting:
```tsx
className="relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] p-6"
```

### Ambient Atmospheric Diffusers
```tsx
{/* Primary radial glow */}
<div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
{/* Secondary accent glow */}
<div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
```

---

## 3. Asymmetric Bento Grid Recipes

Break away from repetitive columns by giving cards varying visual weights based on their importance.

### 4-Card Asymmetric Bento Pattern (12-Column Grid)
```tsx
<div className="grid grid-cols-12 gap-6">
  {/* Card 1: Hero Spotlight Card (Wide) */}
  <div className="col-span-12 lg:col-span-8 rounded-2xl bg-slate-900/60 border border-white/[0.08] p-8 relative overflow-hidden">
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
      <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Core Engine</span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">Interactive Feature Showcase</h3>
    <p className="text-slate-400 text-sm max-w-xl mb-6">Deep interactive preview with live controls or visualizer.</p>
    {/* Interactive Preview Canvas / Visualizer */}
    <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 min-h-[220px]">
      {/* ... Interactive child component ... */}
    </div>
  </div>

  {/* Card 2: Metric / Proof Card (Compact Tall) */}
  <div className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] p-6 flex flex-col justify-between">
    <div>
      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Live Telemetry</span>
      <div className="mt-4 text-4xl font-extrabold text-white tracking-tight">0.7<span className="text-emerald-400 text-2xl font-normal">s</span></div>
      <p className="text-slate-400 text-xs mt-1">Sub-second React Server Component response</p>
    </div>
    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
      <span>Database Read</span>
      <span className="font-mono text-emerald-400">12ms (Edge)</span>
    </div>
  </div>

  {/* Card 3: Interactive Utility / Wizard Card (Compact Tall) */}
  <div className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] p-6">
    <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Step Wizard</span>
    <h4 className="text-lg font-bold text-white mt-2">60s Needs Matcher</h4>
    <p className="text-slate-400 text-xs mt-1">Find vetted opportunities filtered to your skills.</p>
    {/* Mini interactive control or CTA */}
    <button className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-700/60 active:scale-[0.98] transition-all">
      Start Assessment →
    </button>
  </div>

  {/* Card 4: Architecture & Integration Stack (Wide) */}
  <div className="col-span-12 lg:col-span-8 rounded-2xl bg-slate-900/60 border border-white/[0.08] p-6 flex flex-col justify-between">
    <div>
      <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Architecture</span>
      <h4 className="text-lg font-bold text-white mt-1">Unified Serverless Infrastructure</h4>
      <p className="text-slate-400 text-xs mt-1">Zero cold-start edge execution with type-safe schema synchronization.</p>
    </div>
    {/* Stack Pills */}
    <div className="mt-6 flex flex-wrap gap-2">
      {['Next.js 16', 'React 19', 'Neon Postgres', 'Drizzle ORM', 'Clerk', 'Zod'].map((tech) => (
        <span key={tech} className="px-3 py-1 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-mono">
          {tech}
        </span>
      ))}
    </div>
  </div>
</div>
```

---

## 4. Multi-State Component Lifecycle (Never Ship 1 State)

Every interactive list, form, or filterable component must explicitly code 5 states:

### 1. Tactile Active State (Buttons & Cards)
```tsx
className="active:scale-[0.98] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
```

### 2. Accessible Focus-Visible Ring (Never bare outlines)
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
```

### 3. Loading Skeleton State (Matching shape)
```tsx
export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-white/[0.08] p-6 animate-pulse">
      <div className="w-24 h-4 rounded bg-slate-800 mb-4" />
      <div className="w-3/4 h-6 rounded bg-slate-800 mb-3" />
      <div className="w-full h-16 rounded bg-slate-800/60 mb-4" />
      <div className="w-1/2 h-4 rounded bg-slate-800" />
    </div>
  )
}
```

### 4. Empty State with Clear Action (No Dead Ends)
```tsx
export function EmptyState({ onAction, message }: { onAction: () => void; message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center">
      <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mx-auto mb-4 text-slate-400">
        <SparklesIcon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-white mb-1">No items found</h3>
      <p className="text-slate-400 text-xs max-w-sm mx-auto mb-6">{message}</p>
      <button
        onClick={onAction}
        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold active:scale-[0.98] transition-all"
      >
        Reset Filters or Add New
      </button>
    </div>
  )
}
```

---

## 5. Typography Pacing & Monospace Accents

- **Headlines**: `font-extrabold text-white tracking-tight` with `text-balance`.
- **Gradient Accents**:
  ```tsx
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">
    High-Craft Feature
  </span>
  ```
- **Micro-Copy**: `text-xs text-slate-400 leading-relaxed font-light`.
- **Developer / Monospace Accents**: Use `font-mono text-[11px] uppercase tracking-wider` for pill badges, metric labels, file paths, and timestamps.
- **Terminal Window Header**:
  ```tsx
  <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-900/90 border-b border-slate-800 rounded-t-2xl">
    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
    <span className="ml-2 font-mono text-xs text-slate-400">src/components/telemetry.tsx</span>
  </div>
  ```

---

## 6. Pre-Flight Anti-Slop Checklist

Before delivering any frontend component:
- [ ] **Bento Variety**: Is the grid layout asymmetric and varied, or did it fall into a repetitive 3-box trap?
- [ ] **Inset Highlight**: Do primary cards feature a top-edge highlight (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]`) or glowing border?
- [ ] **Tactile Scale**: Do all interactive buttons have `active:scale-[0.98]` and accessible focus rings?
- [ ] **Edge States**: Are both loading skeleton and empty state implemented?
- [ ] **Copy Freshness**: Are headlines and descriptions specific to the domain with real metrics, avoiding generic marketing fluff?
- [ ] **Mobile Ergonomics**: Are tap targets at least 44px with comfortable edge padding?
