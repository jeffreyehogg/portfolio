# ForexFlow FX — Institutional Telemetry & Treasury Risk Intelligence Engine

A high-performance foreign exchange telemetry dashboard and enterprise treasury risk simulator built with **Nuxt 3**, **Nitro Server Engine**, and **Chart.js**. Part of the [Jeff Hogg Engineering Monorepo](https://github.com/jeffreyehogg/portfolio).

[![Live Application](https://img.shields.io/badge/Live-forexflow--dashboard.vercel.app-10b981?style=flat-square&logo=vercel)](https://forexflow-dashboard.vercel.app/)
[![Nuxt 3](https://img.shields.io/badge/Framework-Nuxt_3-00DC82?style=flat-square&logo=nuxtdotjs)](https://nuxt.com/)
[![Chart.js](https://img.shields.io/badge/Visualization-Chart.js-FF6384?style=flat-square&logo=chartdotjs)](https://www.chartjs.org/)
[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-EF4444?style=flat-square&logo=turborepo)](https://turbo.build/)

---

## 1. Architectural Overview & System Design

ForexFlow FX is designed as an institutional-grade currency telemetry cockpit bridging interbank liquidity feeds, algorithmic triangular arbitrage detection, and quantitative corporate treasury risk modeling.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Client UI (Vue 3 / Nuxt UI)                     │
│  - Segmented Cockpit (Telemetry, Cross-Rate Matrix, Treasury VaR)     │
│  - Reactive Chart.js Canvas with EMA 20/50 & Bollinger Overlays        │
│  - Tier-1 Order Book Depth Ladder & Micro Tick Stream                  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ Sub-50ms Reactive SWR Polls
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Nuxt Nitro Edge Proxy Engine                         │
│  - Multi-tier Cache: SWR 30s TTL on Nitro Cached Event Handler         │
│  - Ingest Latency & Upstream Quota Protection                          │
└──────────────────┬───────────────────┬─────────────────────────────────┘
                   │                   │
      [Primary: FreeCurrencyAPI]       │ [Secondary: Frankfurter ECB Open Feed]
                   │                   │
                   ▼                   ▼
    ┌────────────────────────────────────────────────────────────────────┐
    │  Fail-Safe: Stochastic Micro-Drift Synthesis (0% Downtime SLA)     │
    └────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Capabilities & Quantitative Tool Suite

### 1. Interactive Technical Telemetry Canvas
- **Multi-Horizon Aggregation**: 15M, 1H, 1D, and 1W candle generation.
- **Dynamic Overlays**: Exponential Moving Averages (EMA 20, EMA 50), Bollinger Bands (20 periods, 2σ), and session ranges.
- **Tier-1 Order Book Ladder**: Real-time Bid/Ask depth with animated fill bars.
- **Telemetry Export Engine**: 1-click export to RFC 4180 CSV, JSON schema, or clipboard snapshot.

### 2. G10 Cross-Rate Matrix & Triangular Arbitrage Scanner
- **Interbank Matrix**: Live triangular pricing across G10 currencies (USD, EUR, GBP, JPY, CAD, CHF, AUD, NZD, SEK, NOK).
- **Arbitrage Detection**: Evaluates closed triplet cycles ($C_1 \to C_2 \to C_3 \to C_1$) accounting for institutional execution fees.
- **Anomaly Injection Simulator**: Allows evaluators to test synthetic ECN mispricing windows (+0.14% profit margin).

### 3. Almgren-Chriss Institutional Slippage & Smart Order Routing (SOR)
- **Market Impact Modeling**: Square-root market impact law:
  $$\text{Slippage}(Q) = \eta \cdot \sigma_{\text{daily}} \cdot \sqrt{\frac{Q}{ADV}} + \frac{\text{Spread}}{2}$$
- **Multi-ECN Venue Routing**: Dynamically splits order notional ($100K to $20M) across EBS Prime, Currenex ECN, and Cboe FX to optimize blended VWAP fills.

### 4. Enterprise Treasury Value-at-Risk (VaR) Engine
- **Parametric VaR & Expected Shortfall**: Computes portfolio variance using empirical historical covariance matrices across 90%, 95%, and 99% confidence horizons.
- **Historical Crisis Stress-Testing**:
  - *2015 SNB Swiss Franc Unpeg* (+20.5% CHF shock)
  - *2008 Lehman Brothers Liquidity Crunch* (AUD -24.2%, JPY flight to quality)
  - *2020 COVID Dash for Cash* (Global USD liquidity hoarding)
  - *2022 Central Bank Rate Shock & Parity Breach* (EUR broken below parity)
- **Instant Corporate Presets**: Global SaaS Enterprise ($25M), Macro Carry Fund ($15M), European Importer ($18M).

---

## 3. Tech Stack

- **Framework**: Nuxt 3 (Vue 3, TypeScript)
- **Server Engine**: Nitro (Cached Event Handlers, SWR proxying)
- **UI & Styling**: Nuxt UI, Tailwind CSS, Google Fonts (JetBrains Mono & Inter self-hosted)
- **Visualization**: Chart.js 4.5 & Vue-ChartJS
- **Orchestration**: Turborepo + pnpm workspaces
- **Deployment**: Vercel Edge Network

---

## 4. Development & Build

```bash
# From workspace root
pnpm dev --filter=forexflow-dashboard

# Run production build & static prerendering
pnpm build --filter=forexflow-dashboard

# Run linter
pnpm lint
```

---

## 5. Author

**Jeff Hogg** — Senior Full-Stack Developer | DevOps, System Architecture & API Integration  
[Portfolio](https://jeffhogg.com) • [GitHub](https://github.com/jeffreyehogg) • [LinkedIn](https://www.linkedin.com/in/jeffhogg/)
