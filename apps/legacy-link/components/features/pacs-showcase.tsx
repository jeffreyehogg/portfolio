'use client'

import { useState } from 'react'
import PacsSandbox from './pacs-sandbox'
import PacsEstimator from './pacs-estimator'
import PacsMatrix from './pacs-matrix'

type ActiveTab = 'converter' | 'calculator' | 'systems'

export default function PacsShowcase() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('converter')

  return (
    <div className="w-full space-y-5">
      {/* Friendly Tab Selector */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-900/80 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('converter')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all active:scale-[0.98] ${
              activeTab === 'converter'
                ? 'bg-indigo-600 text-white shadow-glow-indigo font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Data converter
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all active:scale-[0.98] ${
              activeTab === 'calculator'
                ? 'bg-indigo-600 text-white shadow-glow-indigo font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Savings calculator
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('systems')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all active:scale-[0.98] ${
              activeTab === 'systems'
                ? 'bg-indigo-600 text-white shadow-glow-indigo font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Supported systems
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline">
          {activeTab === 'converter' && 'Instant browser ETL • No sign-in needed'}
          {activeTab === 'calculator' && 'Estimate labor & cutover savings'}
          {activeTab === 'systems' && 'Field cross-reference matrix'}
        </span>
      </div>

      {/* Active Tab View */}
      <div className="transition-all duration-150">
        {activeTab === 'converter' && <PacsSandbox />}
        {activeTab === 'calculator' && <PacsEstimator />}
        {activeTab === 'systems' && <PacsMatrix />}
      </div>
    </div>
  )
}
