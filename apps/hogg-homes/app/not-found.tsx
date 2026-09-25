import Link from 'next/link'
import { Home, Compass, Layers, Sparkles, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Ambient Radial Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-amber-500/15 via-amber-600/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-20 right-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Blueprint dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        {/* Telemetry pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono font-medium text-amber-300 backdrop-blur-md shadow-inner shadow-amber-500/10 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>STATUS 404</span>
          <span className="text-amber-500">•</span>
          <span className="text-slate-300">BLUEPRINT NOT FOUND</span>
        </div>

        {/* Display Serif Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
          Residence <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">Unresolved</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
          The homesite, elevation, or architectural specification you are seeking has been archived, relocated, or does not exist in our current portfolio.
        </p>

        {/* Action button grid */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all"
          >
            <Home className="h-4 w-4" />
            <span>Return to Platform</span>
          </Link>

          <Link
            href="/floor-plans"
            className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 hover:border-amber-500/40 hover:text-white hover:bg-slate-850 transition"
          >
            <Layers className="h-4 w-4 text-amber-400" />
            <span>Floor Plans</span>
          </Link>

          <Link
            href="/communities"
            className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 hover:border-amber-500/40 hover:text-white hover:bg-slate-850 transition"
          >
            <Compass className="h-4 w-4 text-amber-400" />
            <span>Communities</span>
          </Link>

          <Link
            href="/quick-move-ins"
            className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 hover:border-amber-500/40 hover:text-white hover:bg-slate-850 transition"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Quick Move-Ins</span>
          </Link>
        </div>

        {/* Quick Spec Card */}
        <div className="mt-12 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-xl text-left">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Direct Access Directory
            </span>
            <span className="text-[11px] font-mono text-slate-500">Hogg Homes Architecture</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <Link
              href="/floor-plans/san-jacinto"
              className="group flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-amber-500/40 hover:bg-slate-850/60 transition"
            >
              <div>
                <div className="text-white font-semibold group-hover:text-amber-300 transition">The San Jacinto</div>
                <div className="text-[11px] text-slate-400">1,640 sq ft • 3 Bed</div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
            </Link>

            <Link
              href="/floor-plans/brazos"
              className="group flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-amber-500/40 hover:bg-slate-850/60 transition"
            >
              <div>
                <div className="text-white font-semibold group-hover:text-amber-300 transition">The Brazos</div>
                <div className="text-[11px] text-slate-400">2,410 sq ft • 4 Bed</div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
            </Link>

            <Link
              href="/communities/riverwood-ranch"
              className="group flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-amber-500/40 hover:bg-slate-850/60 transition"
            >
              <div>
                <div className="text-white font-semibold group-hover:text-amber-300 transition">Riverwood Ranch</div>
                <div className="text-[11px] text-slate-400">Angleton, TX • Houston</div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
