import Navbar from '@/components/navbar'
import PacsShowcase from '@/components/features/pacs-showcase'
import TechnicalReference from '@/components/features/technical-reference'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Background Ambient Radial Diffusers */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 h-[450px] w-[700px] rounded-full bg-indigo-600/10 blur-[130px] translate-z-0" />

      {/* Top Navigation */}
      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-8">
        {/* ========================================================================= */}
        {/* HERO SECTION — MINIMAL & WELCOMING */}
        {/* ========================================================================= */}
        <section className="text-center space-y-3 pt-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-950/40 px-3 py-1 text-xs font-medium text-indigo-300 backdrop-blur-xl">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PACS data migration middleware</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Zero cutover downtime.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Zero broken badges.
            </span>
          </h1>

          <p className="text-sm text-slate-400 font-light max-w-lg mx-auto">
            Convert badge and cardholder exports from Lenel, DNA Fusion, AMAG, and C•CURE into verified Genetec Security Center CSVs.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* CORE INTERACTIVE TOOL (FRONT & CENTER) */}
        {/* ========================================================================= */}
        <section id="sandbox" className="scroll-mt-16">
          <PacsShowcase />
        </section>

        {/* ========================================================================= */}
        {/* PROGRESSIVE DISCLOSURE: HOW IT WORKS */}
        {/* ========================================================================= */}
        <TechnicalReference />
      </main>

      {/* Refined Minimal Footer */}
      <footer className="border-t border-white/[0.08] bg-slate-950/80 py-6 text-slate-400 text-xs">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1px]">
              <div className="h-full w-full bg-slate-950 rounded-[5px] flex items-center justify-center text-[8px] font-bold text-cyan-400">
                LL
              </div>
            </div>
            <span className="font-medium text-white text-xs">Legacy Link</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 text-[11px]">PACS Migration Middleware</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <a href="https://jeffhogg.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Built by Jeff Hogg
            </a>
            <span>•</span>
            <span className="text-emerald-400">System operational</span>
          </div>
        </div>
      </footer>
    </div>
  )
}