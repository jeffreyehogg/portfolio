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
    <div className="w-full space-y-8">
      {/* Interactive Tabs Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              Interactive PACS Suite • Zero Sign-In Required
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Physical Security Data Migration Studio
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Test legacy exports, model credential collisions, and verify Genetec schemas right in your browser.
          </p>
        </div>

        {/* Tab Navigation Pill Group */}
        <div className="flex items-center rounded-2xl border border-white/[0.08] bg-slate-900/80 p-1.5 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setActiveTab('sandbox')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-[0.98] ${
              activeTab === 'sandbox'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-glow-indigo'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Live Sandbox</span>
            <span className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">
              ETL
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('estimator')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-[0.98] ${
              activeTab === 'estimator'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-glow-indigo'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Risk & ROI</span>
            <span className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300">
              Calc
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-[0.98] ${
              activeTab === 'matrix'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-glow-indigo'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Compatibility</span>
            <span className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-amber-300">
              Matrix
            </span>
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      <div className="transition-all duration-300">
        {activeTab === 'sandbox' && <PacsSandbox />}
        {activeTab === 'estimator' && <PacsEstimator />}
        {activeTab === 'matrix' && <PacsMatrix />}
      </div>

      {/* Persistent Cloud Handoff Banner */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-cyan-950/40 p-6 backdrop-blur-xl shadow-glass-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-wider text-indigo-300 font-semibold">
              Production Migration Pipeline
            </span>
          </div>
          <h4 className="text-base font-bold text-white">
            Migrate 50,000+ Enterprise Records to Neon PostgreSQL
          </h4>
          <p className="text-xs text-slate-400 max-w-xl">
            Save custom schema mappings, configure automated multi-site exports, and maintain an audit trail for compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SignedIn>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-glow-indigo transition-all hover:bg-indigo-500 active:scale-[0.98]"
            >
              <span>Go to Projects Console</span>
              <span>→</span>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-xs font-bold text-white shadow-glow-indigo transition-all hover:opacity-95 active:scale-[0.98]">
                <span>Deploy Enterprise Project</span>
                <span>→</span>
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
