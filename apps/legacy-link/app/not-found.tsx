import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-white">
      <div className="surface-glass max-w-md rounded-2xl p-8 shadow-glass-card">
        <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">
          Error 404
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Record or Route Not Found
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          The requested migration pipeline, schema configuration, or view does not exist.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-glow-indigo transition-all hover:bg-indigo-500 active:scale-[0.98]"
          >
            Go to Landing Page
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-700/60 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
          >
            View Projects Console
          </Link>
        </div>
      </div>
    </div>
  )
}
