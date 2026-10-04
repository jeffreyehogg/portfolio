import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import Navbar from '@/components/navbar'
import PacsShowcase from '@/components/features/pacs-showcase'
import TechnicalReference from '@/components/features/technical-reference'
import ExpandingArrow from '@/components/expanding-arrow'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Background Ambient Radial Diffusers */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[750px] rounded-full bg-indigo-600/12 blur-[140px] translate-z-0" />
      <div className="pointer-events-none absolute top-[900px] right-0 translate-x-1/3 h-[400px] w-[500px] rounded-full bg-cyan-600/10 blur-[130px] translate-z-0" />

      {/* Top Navigation */}
      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-12">
        {/* ========================================================================= */}
        {/* HERO SECTION — FOCUSED & SCANNABLE */}
        {/* ========================================================================= */}
        <section className="text-center space-y-5 pt-4 max-w-3xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-medium text-indigo-300 backdrop-blur-xl shadow-glow-indigo">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Production ETL • PACS migration middleware</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Zero cutover downtime.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Zero broken badges.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Automated access control data pipeline. Sanitize, map, and export cardholder exports from <strong>Lenel OnGuard</strong>, <strong>DNA Fusion</strong>, <strong>AMAG</strong>, and <strong>C•CURE</strong> to verified <strong>Genetec Security Center</strong> schemas with 100% credential fidelity.
          </p>

          {/* Dual CTAs & Telemetry Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <a
              href="#sandbox"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-xs font-semibold text-white shadow-glow-indigo transition-all hover:opacity-95 active:scale-[0.98]"
            >
              <span>Test in live sandbox</span>
              <ExpandingArrow className="h-3.5 w-3.5" />
            </a>

            <SignedIn>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/80 px-5 py-3 text-xs font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.98]"
              >
                <span>Launch projects console</span>
                <span>→</span>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/80 px-5 py-3 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]">
                  <span>Deploy enterprise cutover</span>
                  <span>→</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Compact Trust Signals Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1 text-[11px] text-slate-400">
            <span>✓ 95% faster cutover</span>
            <span>•</span>
            <span>✓ 0 corrupted badge IDs</span>
            <span>•</span>
            <span>✓ 100% Synergis parity</span>
            <span>•</span>
            <span>✓ PostgreSQL JSONB</span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE SUITE: SANDBOX | ESTIMATOR | MATRIX (FRONT & CENTER) */}
        {/* ========================================================================= */}
        <section id="sandbox" className="scroll-mt-20">
          <PacsShowcase />
        </section>

        {/* ========================================================================= */}
        {/* PROGRESSIVE DISCLOSURE: TECHNICAL ARCHITECTURE & CUTOVER SAFEGUARDS */}
        {/* ========================================================================= */}
        <TechnicalReference />

        {/* ========================================================================= */}
        {/* BOTTOM CTA BANNER */}
        {/* ========================================================================= */}
        <section className="surface-glass rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-glass-card relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-indigo-500/15 blur-[80px]" />

          <div className="max-w-xl mx-auto space-y-2 relative z-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready for Monday morning go-live?
            </h2>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Test your legacy access control exports in our sandbox or create an enterprise project to maintain auditable schema mappings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10 pt-1">
            <a
              href="#sandbox"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow-indigo transition-all hover:opacity-95 active:scale-[0.98]"
            >
              <span>Test presets in sandbox</span>
              <ExpandingArrow className="h-3.5 w-3.5" />
            </a>

            <SignedIn>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/80 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.98]"
              >
                <span>Open migration console</span>
                <span>→</span>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/80 px-5 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]">
                  <span>Sign in with Clerk</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </section>
      </main>

      {/* Refined Footer */}
      <footer className="border-t border-white/[0.08] bg-slate-950 py-8 text-slate-400 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1px]">
              <div className="h-full w-full bg-slate-950 rounded-[7px] flex items-center justify-center text-[9px] font-bold text-cyan-400">
                LL
              </div>
            </div>
            <span className="font-semibold text-white text-xs">Legacy Link</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 text-[11px]">PACS data migration middleware</span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <a href="https://jeffhogg.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Built by Jeff Hogg
            </a>
            <a href="#sandbox" className="hover:text-white transition-colors">
              Live sandbox
            </a>
            <a href="#estimator" className="hover:text-white transition-colors">
              Risk calculator
            </a>
            <a href="#matrix" className="hover:text-white transition-colors">
              Matrix
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ETL middleware operational</span>
          </div>
        </div>
      </footer>
    </div>
  )
}