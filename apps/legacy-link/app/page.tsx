import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import Navbar from '@/components/navbar'
import PacsShowcase from '@/components/features/pacs-showcase'
import ExpandingArrow from '@/components/expanding-arrow'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Background Ambient Radial Diffusers */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 h-[600px] w-[800px] rounded-full bg-indigo-600/15 blur-[140px] translate-z-0" />
      <div className="pointer-events-none absolute top-[1200px] right-0 translate-x-1/3 h-[500px] w-[600px] rounded-full bg-cyan-600/10 blur-[130px] translate-z-0" />
      <div className="pointer-events-none absolute bottom-[600px] left-0 -translate-x-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px] translate-z-0" />

      {/* Top Navigation */}
      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-24">
        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section className="text-center space-y-8 pt-8 max-w-4xl mx-auto">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-4 py-1.5 text-xs font-mono font-semibold text-indigo-300 backdrop-blur-xl shadow-glow-indigo">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PACS MIGRATION MIDDLEWARE • PRODUCTION ETL</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Zero Cutover Downtime.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Zero Broken Badges.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            The automated data migration pipeline for enterprise access control. Sanitize, merge, and transform legacy cardholder exports from <strong>Lenel OnGuard</strong>, <strong>DNA Fusion</strong>, <strong>AMAG</strong>, and <strong>C•CURE</strong> into verified <strong>Genetec Security Center</strong> schemas in under 90 seconds—with 100% credential fidelity.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#sandbox"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-glow-indigo transition-all hover:opacity-95 active:scale-[0.98]"
            >
              <span>Test in Live Sandbox</span>
              <ExpandingArrow className="h-4 w-4" />
            </a>

            <SignedIn>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.98]"
              >
                <span>Launch Projects Console</span>
                <span>→</span>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]">
                  <span>Deploy Enterprise Cutover</span>
                  <span>→</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Micro-Trust Signals */}
          <p className="text-[11px] font-mono text-slate-400">
            ✓ Preserves 26-bit/37-bit Wiegand formats • Zero raw PII retention • Instant client-side CSV export
          </p>
        </section>

        {/* ========================================================================= */}
        {/* HARD ROI & TECHNICAL METRICS STRIP */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 surface-glass rounded-2xl p-6 shadow-glass-card">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
              Cutover Velocity
            </span>
            <div className="mt-2 font-mono text-4xl font-extrabold text-white tracking-tight">
              95<span className="text-cyan-400 text-2xl font-normal">%</span>
            </div>
            <h3 className="text-xs font-bold text-slate-200 mt-2">Downtime Reduction</h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Reduces weekend access control cutovers from 40 hours of manual Excel formulas to a sub-90s pipeline.
            </p>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3 surface-glass rounded-2xl p-6 shadow-glass-card">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
              Credential Fidelity
            </span>
            <div className="mt-2 font-mono text-4xl font-extrabold text-white tracking-tight">
              0
            </div>
            <h3 className="text-xs font-bold text-slate-200 mt-2">Corrupted Badge IDs</h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Strict string typing eliminates Excel&apos;s silent stripping of leading zeros and scientific notation corruption.
            </p>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3 surface-glass rounded-2xl p-6 shadow-glass-card">
            <span className="font-mono text-xs uppercase tracking-wider text-indigo-400">
              Target Standard
            </span>
            <div className="mt-2 font-mono text-4xl font-extrabold text-white tracking-tight">
              100<span className="text-indigo-400 text-2xl font-normal">%</span>
            </div>
            <h3 className="text-xs font-bold text-slate-200 mt-2">Genetec Synergis Parity</h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Outputs verified PascalCase CSV schemas ready for instant 1-click import into Genetec Config Tool.
            </p>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3 surface-glass rounded-2xl p-6 shadow-glass-card">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
              Ingestion Architecture
            </span>
            <div className="mt-2 font-mono text-2xl font-extrabold text-white tracking-tight pt-2">
              Postgres JSONB
            </div>
            <h3 className="text-xs font-bold text-slate-200 mt-2">Dynamic Schema Storage</h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Absorbs 50+ unstructured legacy columns from Lenel, DNA Fusion, and AMAG without database migrations.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SUPPORTED SYSTEMS STRIP */}
        {/* ========================================================================= */}
        <section className="surface-glass rounded-2xl p-6 shadow-glass-card text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold block">
            Automated Bidirectional Interoperability
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              'Lenel OnGuard (v7.5 - v8.2)',
              'Open Options DNA Fusion',
              'Software House C•CURE 9000',
              'AMAG Symmetry',
              'Brivo Access',
            ].map((vendor) => (
              <span
                key={vendor}
                className="rounded-xl border border-slate-700/60 bg-slate-900/80 px-3.5 py-1.5 font-mono text-xs text-slate-300"
              >
                {vendor}
              </span>
            ))}
            <span className="text-cyan-400 font-mono text-xs font-bold">➔</span>
            <span className="rounded-xl border border-cyan-500/40 bg-cyan-950/60 px-4 py-1.5 font-mono text-xs font-bold text-cyan-300 shadow-glow-cyan">
              Genetec Security Center (Synergis)
            </span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE SUITE: SANDBOX | ESTIMATOR | MATRIX */}
        {/* ========================================================================= */}
        <section id="sandbox" className="scroll-mt-24">
          <PacsShowcase />
        </section>

        {/* ========================================================================= */}
        {/* 3-STEP ETL PIPELINE WALKTHROUGH */}
        {/* ========================================================================= */}
        <section id="architecture" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-400 font-semibold">
              The Migration Pipeline
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Deterministic 3-Stage Transformation Engine
            </h2>
            <p className="text-xs text-slate-400">
              How Legacy Link converts corrupted legacy dumps into pristine cloud access control records.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Step 1 */}
            <div className="col-span-12 lg:col-span-4 surface-glass rounded-2xl p-6 shadow-glass-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 font-mono text-xs font-bold text-indigo-400">
                  STEP 01
                </span>
                <span className="font-mono text-[10px] text-slate-500 uppercase">Worker Stream</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Universal Ingestion & Null-Byte Guard
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                PapaParse Web Workers parse legacy CSV files in the background without locking browser threads. Binary byte inspections detect and reject disguised Excel `.xlsx` archives and null bytes.
              </p>
              <div className="pt-2 font-mono text-[11px] text-cyan-400">
                • Zero DDL schema migrations required
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-span-12 lg:col-span-4 surface-glass rounded-2xl p-6 shadow-glass-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 font-mono text-xs font-bold text-cyan-400">
                  STEP 02
                </span>
                <span className="font-mono text-[10px] text-slate-500 uppercase">Visual Rule AST</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Schema Mapping & Concatenation Builder
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Map disparate source columns to Genetec standard targets. Merge split names (`F_NAME` + `L_NAME`), format Wiegand tuples (`FacilityCode:CardNumber`), and normalize status flags into clean enums.
              </p>
              <div className="pt-2 font-mono text-[11px] text-cyan-400">
                • Built-in Wiegand collision detection
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-span-12 lg:col-span-4 surface-glass rounded-2xl p-6 shadow-glass-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400">
                  STEP 03
                </span>
                <span className="font-mono text-[10px] text-slate-500 uppercase">RFC 4180 CSV</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Genetec Config Tool Ready Export
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Declarative transformations execute in memory to produce strict PascalCase CSV files with properly quoted text fields, ready for 1-click import into Genetec Security Center Config Tool.
              </p>
              <div className="pt-2 font-mono text-[11px] text-cyan-400">
                • Sub-second client Blob download
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MANUAL SPREADSHEETS VS LEGACY LINK COMPARISON */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold">
              The Reality of Cutover Risks
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Excel Spreadsheet Hell vs. Legacy Link
            </h2>
          </div>

          <div className="surface-glass rounded-2xl overflow-hidden shadow-glass-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.08] bg-slate-950/80 font-mono text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6 w-1/4">Cutover Failure Vector</th>
                    <th className="py-4 px-6 w-3/8 text-rose-400">Manual Excel Cleaning</th>
                    <th className="py-4 px-6 w-3/8 text-emerald-400">Legacy Link Middleware</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-4 px-6 font-bold text-white">Wiegand Facility Codes</td>
                    <td className="py-4 px-6 text-slate-300">
                      Auto-formatting strips leading zeros (e.g. `0042` ➔ `42`), corrupting card readers at turnstiles.
                    </td>
                    <td className="py-4 px-6 text-emerald-300 font-semibold">
                      Strict Type Preservation: Ingested as exact string types in PostgreSQL JSONB; leading zeros never stripped.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-4 px-6 font-bold text-white">37-Bit High-Bit Badges</td>
                    <td className="py-4 px-6 text-slate-300">
                      Credentials converted to scientific notation (`4.58E+09`), permanently destroying credential IDs.
                    </td>
                    <td className="py-4 px-6 text-emerald-300 font-semibold">
                      Zero Precision Loss: High-bit numbers remain immutable with automatic uppercase hex normalization.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-4 px-6 font-bold text-white">Split Identity Fields</td>
                    <td className="py-4 px-6 text-slate-300">
                      Brittle `=CONCATENATE` formulas across 50,000 rows that crash Excel on null cells or commas.
                    </td>
                    <td className="py-4 px-6 text-emerald-300 font-semibold">
                      Visual Concatenation Builder: Point-and-click column merging with custom delimiter strings.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-4 px-6 font-bold text-white">Credential Collisions</td>
                    <td className="py-4 px-6 text-slate-300">
                      No collision checking; 26-bit cards from merged sites collide, denying turnstile entry on Monday.
                    </td>
                    <td className="py-4 px-6 text-emerald-300 font-semibold">
                      Collision Detection Engine: Live scanning flags duplicate badge IDs and applies Facility Code prefixes.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-4 px-6 font-bold text-white">Cutover Downtime</td>
                    <td className="py-4 px-6 text-slate-300">
                      3 to 5 days of manual spreadsheet reconciliation and weekend cutover panic.
                    </td>
                    <td className="py-4 px-6 text-emerald-300 font-semibold">
                      Sub-90-Second Execution: Deterministic schema export cuts downtime by 95%.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM CTA: DEPLOY ENTERPRISE PIPELINE */}
        {/* ========================================================================= */}
        <section className="surface-glass rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-glass-card relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-indigo-500/20 blur-[90px]" />
          
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              Ready for Monday Morning Go-Live?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Eliminate Spreadsheet Cutover Chaos
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Test your legacy access control exports in our browser sandbox or create an enterprise project to maintain auditable schema mapping configurations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <a
              href="#sandbox"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3.5 text-xs font-bold text-white shadow-glow-indigo transition-all hover:opacity-95 active:scale-[0.98]"
            >
              <span>Test Live Presets in Sandbox</span>
              <ExpandingArrow className="h-4 w-4" />
            </a>

            <SignedIn>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/80 px-6 py-3.5 text-xs font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.98]"
              >
                <span>Open Migration Console</span>
                <span>→</span>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/80 px-6 py-3.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]">
                  <span>Sign In with Clerk</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </section>
      </main>

      {/* High-Craft Footer */}
      <footer className="border-t border-white/[0.08] bg-slate-950 py-12 text-slate-400 font-mono text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1px]">
              <div className="h-full w-full bg-slate-950 rounded-[7px] flex items-center justify-center text-[10px] font-black text-cyan-400">
                LL
              </div>
            </div>
            <span className="font-bold text-white text-sm font-sans">Legacy Link</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">PACS Data Migration Middleware</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="https://jeffhogg.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Built by Jeff Hogg
            </a>
            <a href="#sandbox" className="hover:text-white transition-colors">
              Live Sandbox
            </a>
            <a href="#estimator" className="hover:text-white transition-colors">
              Risk Calculator
            </a>
            <a href="#matrix" className="hover:text-white transition-colors">
              Compatibility Matrix
            </a>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ETL Middleware Operational</span>
          </div>
        </div>
      </footer>
    </div>
  )
}