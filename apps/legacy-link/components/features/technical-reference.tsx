'use client'

import { useState } from 'react'

export default function TechnicalReference() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'pipeline' | 'safeguards'>('pipeline')

  return (
    <div id="architecture" className="scroll-mt-20 space-y-4">
      {/* Centered Friendly Toggle */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-xl transition-all hover:border-slate-700 hover:text-white active:scale-[0.98]"
        >
          <span>{isOpen ? 'Hide technical details' : 'How the conversion pipeline works'}</span>
          <span className={`transform transition-transform text-slate-400 ${isOpen ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </button>
      </div>

      {/* Progressive Disclosure Container */}
      {isOpen && (
        <div className="surface-glass rounded-2xl p-5 sm:p-6 shadow-glass-card space-y-5 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Technical pipeline & cutover safeguards
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                How Legacy Link safely transforms legacy access control data into verified Genetec schemas.
              </p>
            </div>

            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab('pipeline')}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  activeTab === 'pipeline'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3-step pipeline
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('safeguards')}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  activeTab === 'safeguards'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Excel vs. middleware
              </button>
            </div>
          </div>

          {/* TAB 1: 3-STEP PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
                <span className="text-xs text-indigo-400 font-semibold">1. Safe Ingestion</span>
                <h4 className="text-sm font-semibold text-white">Parse & sanitize</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Web Workers parse CSV files without locking the browser. Corrupt binary bytes and empty rows are filtered automatically.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
                <span className="text-xs text-cyan-400 font-semibold">2. Smart Mapping</span>
                <h4 className="text-sm font-semibold text-white">Format & validate</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Maps legacy columns to Genetec standard fields. Combines split names, formats Wiegand tuples, and checks for duplicate IDs.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
                <span className="text-xs text-emerald-400 font-semibold">3. Clean Export</span>
                <h4 className="text-sm font-semibold text-white">1-Click download</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Outputs RFC-compliant PascalCase CSV files with properly quoted text fields, ready for instant import in Genetec Config Tool.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: EXCEL VS MIDDLEWARE */}
          {activeTab === 'safeguards' && (
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.08] bg-slate-950 text-slate-400">
                  <tr>
                    <th className="py-2.5 px-4 font-medium">Failure vector</th>
                    <th className="py-2.5 px-4 font-medium text-rose-400">Manual Excel risk</th>
                    <th className="py-2.5 px-4 font-medium text-emerald-400">Legacy Link safeguard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-2.5 px-4 font-medium text-white">Leading zeros</td>
                    <td className="py-2.5 px-4 text-slate-300">
                      Excel strips leading zeros (<code className="text-slate-400">0042 ➔ 42</code>), breaking turnstile readers.
                    </td>
                    <td className="py-2.5 px-4 text-emerald-300">
                      Exact string preservation; leading zeros never stripped.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-2.5 px-4 font-medium text-white">37-bit badge numbers</td>
                    <td className="py-2.5 px-4 text-slate-300">
                      Excel converts to scientific notation (<code className="text-slate-400">4.58E+09</code>), destroying badge IDs.
                    </td>
                    <td className="py-2.5 px-4 text-emerald-300">
                      Immutable string typing with uppercase hex normalization.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-2.5 px-4 font-medium text-white">Split names</td>
                    <td className="py-2.5 px-4 text-slate-300">
                      Fragile CONCAT formulas crash on null cells.
                    </td>
                    <td className="py-2.5 px-4 text-emerald-300">
                      Visual column merge builder with custom delimiters.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-2.5 px-4 font-medium text-white">Duplicate badges</td>
                    <td className="py-2.5 px-4 text-slate-300">
                      No collision checking; duplicate card IDs lock people out.
                    </td>
                    <td className="py-2.5 px-4 text-emerald-300">
                      Automated collision detection alerts on duplicates.
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
