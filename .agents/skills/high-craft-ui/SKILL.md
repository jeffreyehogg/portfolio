---
name: high-craft-ui
description: >-
  Expert guidelines and design patterns for building high-craft, modern, visually stunning web user interfaces.
  Trigger when creating, refactoring, or styling frontend components, landing pages, interactive cards, portfolios,
  or dashboards using Tailwind CSS, Framer Motion, dark mode aesthetics, glassmorphism, ambient lighting, and micro-interactions.
---

# High-Craft UI & Modern Design System Skill

This skill provides practical guidelines for building modern, visually polished web interfaces that look great, feel responsive, and are simple to use.

The overarching design philosophy: **If it looks good, clean, and is easy to use, ship it.** Modern design trends (bento grids, stat cards, ambient lighting, developer badges) are welcome tools—just keep copy concise and the interface uncluttered.

---

## 1. Core Principles: Clean, Modern & Engaging UI

Use these guidelines to create visually compelling yet easy-to-use interfaces:

| Design Dimension | Good Practice | What to Keep in Mind |
|---|---|---|
| **Layout & Structure** | Bento grids, split workspaces, card grids, and pill bars. | Keep spacing balanced and give elements breathing room (`gap-4` to `gap-6`, comfortable padding). |
| **Typography & Copy** | Concise, scannable copy. Clear headlines with short 1-2 sentence descriptions. | Avoid dense walls of text. If an explanation is long, summarize the key takeaway or use collapsible details. |
| **Pills & Badges** | Subtle colored badges, dialect tags, and status indicators add character and quick context. | Keep text short and readable (e.g. `PostgreSQL`, `~95% faster`, `Critical`). |
| **Depth & Lighting** | Dark slate surfaces (`bg-slate-900/60`), subtle borders (`border-white/[0.08]`), and soft ambient diffusers. | Keep lighting soft so text stays sharp and high-contrast. |
| **Component States** | Tactile buttons (`active:scale-[0.98]`), smooth hover transitions, clear focus rings, and skeleton loaders. | Don't leave buttons static—subtle feedback makes apps feel fast and premium. |

---

## 2. Layout Patterns

Feel free to mix and match layout patterns based on what looks best:

### A. Asymmetric Bento Grids & Feature Spotlights
Bento grids look great on landing pages, feature overviews, and summaries.
- Combine wide feature cards with compact metric cards.
- Keep card copy punchy and visual.
- Use icons, charts, or mini-previews to show rather than tell.

### B. Functional Workspaces & Studio Layouts
For tools, editors, and dashboards:
- Keep the main interactive controls (inputs, editors, primary CTAs) front-and-center.
- Use single-row pill bars or dropdowns for quick scenario selectors.
- Provide a clean primary result view with quick 1-click actions (e.g. `Copy SQL`, `Run`).
- Secondary deep-dives (raw diffs, trace logs, technical deep dives) can live in clean tabs or collapsible sections.

---

## 3. Surface Elevation & Modern Styling

A modern dark mode palette that feels deep, clean, and elevated:

### Surface Elevation
- **Canvas Base**: `bg-slate-950`
- **Cards & Containers**: `bg-slate-900/60` to `bg-slate-900/80` with `backdrop-blur-xl` and `border border-white/[0.08]`
- **Subtle Top Highlight**: `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]` adds polished hardware-like depth.
- **Interactive Surfaces**: `hover:bg-slate-850/80` or subtle tinted borders (`border-indigo-500/30`).

### Ambient Glows
Soft, blurred background lights add atmospheric warmth:
```tsx
<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px]" />
</div>
```

---

## 4. Multi-State Component Lifecycle

Ensure interactive components feel complete and responsive across all states:

### 1. Tactile Active State
```tsx
className="active:scale-[0.98] transition-all duration-150 cursor-pointer"
```

### 2. Accessible Focus Ring
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
```

### 3. Loading Skeleton
```tsx
export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-white/[0.08] p-5 animate-pulse">
      <div className="w-24 h-4 rounded bg-slate-800 mb-3" />
      <div className="w-3/4 h-5 rounded bg-slate-800/60 mb-2" />
      <div className="w-1/2 h-3 rounded bg-slate-800/40" />
    </div>
  );
}
```

### 4. Empty State
```tsx
export function EmptyState({ onAction, message }: { onAction: () => void; message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 p-8 text-center">
      <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-white/[0.06] flex items-center justify-center mx-auto mb-3 text-slate-400">
        <Sparkles className="w-5 h-5 text-indigo-400" />
      </div>
      <h4 className="text-sm font-semibold text-white mb-1">No items found</h4>
      <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">{message}</p>
      <button
        onClick={onAction}
        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium active:scale-[0.98] transition-all"
      >
        Reset Filters
      </button>
    </div>
  );
}
```

---

## 5. Quick Polish Checklist

Before shipping, do a fast visual pass:
- [ ] **Visual Appeal**: Does it look modern, clean, and well-balanced?
- [ ] **Scannability**: Is the text concise and easy to read without long paragraphs?
- [ ] **Usability**: Can the user easily find and use the primary action?
- [ ] **Tactile Feel**: Do buttons respond smoothly on hover and click?
- [ ] **Edge States**: Are loading skeletons and empty states handled?


