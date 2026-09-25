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

## 1. Aesthetic Foundations & Surface Elevation

Avoid flat, generic, or monotone layouts. Construct depth through layered surfaces, subtle borders, and controlled lighting.

### Surface Elevation Hierarchy
- **Canvas Base**: `bg-slate-950` (or `bg-black` for ultra-dark setups).
- **Primary Cards & Containers**: `bg-slate-900/60` to `bg-slate-900/80` with `backdrop-blur-md` or `backdrop-blur-xl`.
- **Nested Elements & Chips**: `bg-slate-800/60` to `bg-slate-800/80` with `border border-slate-700/50`.
- **Active / Focused Surfaces**: `bg-slate-800/90` or tinted accent `bg-indigo-500/10` with `border-indigo-500/30`.

### Border Craft & Glows
- Default borders should be subtle and dark: `border border-slate-800/80` or `border-slate-800`.
- Hover transitions should glow smoothly:
  ```tsx
  className="border border-slate-800/80 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
  ```
- Use gradient borders or highlight rings for featured items:
  ```tsx
  <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500">
    <div className="rounded-[14px] bg-slate-950 p-6">...</div>
  </div>
  ```

### Ambient Atmospheric Lighting
- **Radial Glow Diffusers**:
  ```tsx
  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
  <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
  ```
- **Grid Patterns**: Overlay subtle SVG dot grids or line matrices with `opacity-20` to `opacity-30` behind content.

---

## 2. Typography & Hierarchy

- **Title Text**: `font-extrabold text-white tracking-tight` with optional `text-balance`.
- **Gradient Text Accents**:
  ```tsx
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">
    DevOps & System Architecture
  </span>
  ```
- **Body Copy**: `text-slate-300` or `text-slate-400` with `leading-relaxed font-light`.
- **Technical & Monospace Accents**: Use `font-mono text-xs uppercase tracking-wider` for badges, tags, telemetry values, and timestamps.

---

## 3. Micro-Interactions & Framer Motion

### Standard Spring Physics
Use organic springs instead of linear or abrupt eases:
```tsx
transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
```

### Staggered List / Grid Entrances
```tsx
{items.map((item, idx) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.08, duration: 0.4 }}
  >
    ...
  </motion.div>
))}
```

### Fluid Tab Switching (`layoutId`)
When toggling active tabs or category filters, use Framer Motion's `layoutId` for smooth pill morphing:
```tsx
{isActive && (
  <motion.span
    layoutId="active-pill"
    className="absolute inset-0 bg-indigo-600 rounded-full shadow-md"
    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
  />
)}
```

### Action Hover Micro-Feedback
Buttons and cards should feel tactile:
- Hover slight lift: `hover:-translate-y-0.5`
- Arrow transitions: `group-hover:translate-x-1 transition-transform`
- Pulsing live indicators:
  ```tsx
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
  </span>
  ```

---

## 4. Engineering & Developer UI Components

To showcase senior full-stack depth, incorporate system-level visual elements:

1. **Terminal / Code Snippet Headers**:
   - 3 colored macOS window dots (`w-2.5 h-2.5 rounded-full bg-rose-500/80`, `bg-amber-500/80`, `bg-emerald-500/80`).
   - File path / command bar with monospace styling.
2. **Architecture Callout Boxes**:
   - A dedicated callout inside project cards featuring a small `CommandLineIcon` or `CpuChipIcon`, highlighting key architectural decisions, schema designs, or throughput metrics.
3. **Telemetry & Metric Pills**:
   - Pulse dot + metric label (e.g. `Sub-second Query Speeds`, `Zero-Downtime CI/CD`).

---

## 5. Pre-Flight Quality Checklist

Before finalizing any UI component:
- [ ] **Contrast Check**: Is text readable against the dark surface without eye strain?
- [ ] **Mobile Responsiveness**: Test grid collapses (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) and horizontal scroll padding.
- [ ] **Image Optimization**: Are `sizes` defined for Next.js `<Image />` tags? Is `priority` set on LCP hero images?
- [ ] **Interactive States**: Do all interactive links and buttons have active, hover, and focus-visible states?
