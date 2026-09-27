'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-white">
      <div className="surface-glass max-w-md rounded-2xl p-8 text-center shadow-glass-card">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold tracking-tight text-white">
          System Execution Interrupted
        </h2>
        <p className="mb-6 font-mono text-xs text-slate-400">
          {error?.message || 'An unexpected pipeline error occurred during processing.'}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-glow-indigo transition-all hover:bg-indigo-500 active:scale-[0.98]"
          >
            Retry Operation
          </button>
          <Link
            href="/"
            className="rounded-xl border border-slate-700/60 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
