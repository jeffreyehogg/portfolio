'use client'

import { useState } from 'react'

export default function TechnicalReference() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'pipeline' | 'safeguards'>('pipeline')

  return (
    <div id="architecture" className="scroll-mt-24 space-y-4">
      {/* Toggle Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-xl transition-all hover:border-slate-700 hover:bg-slate-850 hover:text-white active:scale-[0.98]"
        >
          <span>{isOpen ? 'Hide technical reference' : 'Show technical architecture & cutover safeguards'}</span>
          <span className={`transform transition-transform text-slate-400 ${isOpen ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </button>
      </div>

      {/* Collapsible Content Container */}
      {isOpen && (
        <div className="surface-glass rounded-2xl p-6 shadow-glass-card space-y-6 transition-all duration-300">
          {/* Header & Sub-Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-base font-semibold text-white">
                Technical architecture & cutover safeguards
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Deterministic transformation specifications and failure mode mitigation.
              </p>
            </div>

            <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950/80 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('pipeline')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === 'pipeline'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3-stage ETL pipeline
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('safeguards')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === 'safeguards'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Excel vs. middleware safeguards
              </button>
            </div>
          </div>

          {/* TAB 1: 3-STAGE PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 font-mono text-[11px] text-indigo-400 font-semibold">
                    Step 1
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Worker stream</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Universal ingestion</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  PapaParse Web Workers parse legacy CSV files in the background without locking browser threads. Binary byte inspection rejects invalid formats.
                </p>
                <div className="text-[11px] text-cyan-400 pt-1">
                  • Zero DDL schema migrations needed
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 font-mono text-[11px] text-cyan-400 font-semibold">
                    Step 2
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Rule AST</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Visual schema mapping</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Map legacy columns to standard Genetec targets. Merge split name columns, format Wiegand tuples (<code className="text-slate-300">FC:Card</code>), and normalize status flags.
                </p>
                <div className="text-[11px] text-cyan-400 pt-1">
                  • Automated collision detection
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-mono text-[11px] text-emerald-400 font-semibold">
                    Step 3
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">RFC 4180</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Genetec Config Tool export</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Executes in memory to produce strict PascalCase CSV files with properly quoted text fields, ready for 1-click import into Genetec Config Tool.
                </p>
                <div className="text-[11px] text-cyan-400 pt-1">
                  • Sub-second client blob download
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXCEL VS MIDDLEWARE SAFEGUARDS */}
          {activeTab === 'safeguards' && (
            <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/60">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.08] bg-slate-950/90 text-slate-400">
                  <tr>
                    <th className="py-3 px-4 font-medium w-1/4">Cutover failure vector</th>
                    <th className="py-3 px-4 font-medium w-3/8 text-rose-400">Manual Excel cleaning</th>
                    <th className="py-3 px-4 font-medium w-3/8 text-emerald-400">Legacy Link middleware</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-semibold text-white">Facility codes</td>
                    <td className="py-3 px-4 text-slate-300">
                      Excel strips leading zeros (<code className="text-slate-400">0042 ➔ 42</code>), breaking turnstile readers.
                    </td>
                    <td className="py-3 px-4 text-emerald-300">
                      Exact string preservation in PostgreSQL JSONB; leading zeros never stripped.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-semibold text-white">37-bit high-bit cards</td>
                    <td className="py-3 px-4 text-slate-300">
                      Converted to scientific notation (<code className="text-slate-400">4.58E+09</code>), destroying badge IDs.
                    </td>
                    <td className="py-3 px-4 text-emerald-300">
                      Immutable string typing with uppercase hex normalization.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-semibold text-white">Split identity columns</td>
                    <td className="py-3 px-4 text-slate-300">
                      Brittle CONCATENATE formulas across 50,000 rows prone to null cell failures.
                    </td>
                    <td className="py-3 px-4 text-emerald-300">
                      Visual concatenation builder with custom delimiter strings.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-semibold text-white">Credential collisions</td>
                    <td className="py-3 px-4 text-slate-300">
                      No collision checking; duplicate card IDs deny turnstile access Monday morning.
                    </td>
                    <td className="py-3 px-4 text-emerald-300">
                      Collision engine flags duplicate IDs and adds Facility Code prefixing.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-semibold text-white">Cutover downtime</td>
                    <td className="py-3 px-4 text-slate-300">
                      3 to 5 days of manual spreadsheet reconciliation and cutover panic.
                    </td>
                    <td className="py-3 px-4 text-emerald-300">
                      Deterministic schema export cuts cutover downtime by ~95%.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
