'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import PacsSandbox from './pacs-sandbox'
import PacsEstimator from './pacs-estimator'
import PacsMatrix from './pacs-matrix'

type ActiveTab = 'sandbox' | 'estimator' | 'matrix'

export default function PacsShowcase() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('sandbox')

  return (
    <div className="w-full space-y-6">
      {/* Studio Header & Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-cyan-400">
              Interactive PACS studio • No sign-in required
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Physical access migration studio
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mt-0.5">
            Test legacy exports, model credential collisions, and verify Genetec schemas instantly in browser memory.
          </p>
        </div>

        {/* Tab Navigation Pill Group */}
        <div className="flex items-center rounded-2xl border border-white/[0.08] bg-slate-900/80 p-1 backdrop-blur-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('sandbox')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all active:scale-[0.98] ${
              activeTab === 'sandbox'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-glow-indigo'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Live sandbox</span>
            <span className="rounded bg-black/40 px-1 py-0.2 font-mono text-[10px] text-cyan-300">
              ETL
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('estimator')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all active:scale-[0.98] ${
              activeTab === 'estimator'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-glow-indigo'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Risk & ROI</span>
            <span className="rounded bg-black/40 px-1 py-0.2 font-mono text-[10px] text-emerald-300">
              Calc
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all active:scale-[0.98] ${
              activeTab === 'matrix'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-glow-indigo'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Compatibility</span>
            <span className="rounded bg-black/40 px-1 py-0.2 font-mono text-[10px] text-amber-300">
              Matrix
            </span>
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      <div className="transition-all duration-200">
        {activeTab === 'sandbox' && <PacsSandbox />}
        {activeTab === 'estimator' && <PacsEstimator />}
        {activeTab === 'matrix' && <PacsMatrix />}
      </div>

      {/* Compact Cloud Handoff Banner */}
      <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/30 via-slate-900/50 to-cyan-950/30 p-5 backdrop-blur-xl shadow-glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs text-indigo-300 font-medium">
              Enterprise migration pipelines
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white">
            Migrate 50,000+ cardholders to PostgreSQL
          </h4>
          <p className="text-xs text-slate-400 max-w-xl">
            Save custom schema mappings, configure automated multi-site cutovers, and maintain audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <SignedIn>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-glow-indigo transition-all hover:bg-indigo-500 active:scale-[0.98]"
            >
              <span>Projects console</span>
              <span>→</span>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-glow-indigo transition-all hover:opacity-95 active:scale-[0.98]">
                <span>Deploy enterprise project</span>
                <span>→</span>
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
