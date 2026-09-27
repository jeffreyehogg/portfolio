'use client'

import { useState } from 'react'
import { PACS_MATRIX_DATA } from '@/lib/pacs-matrix-data'
import { MatrixRow, PacsVendor } from '@/lib/pacs-types'

const VENDORS: { id: PacsVendor; label: string; platform: string }[] = [
  { id: 'lenel', label: 'Lenel OnGuard', platform: 'MS SQL' },
  { id: 'ccure', label: 'C•CURE 9000', platform: 'Johnson Controls' },
  { id: 'amag', label: 'AMAG Symmetry', platform: 'Multi-Node' },
  { id: 'dna_fusion', label: 'DNA Fusion', platform: 'Open Options' },
  { id: 'brivo', label: 'Brivo Access', platform: 'Cloud REST' },
]

export default function PacsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedVendor, setSelectedVendor] = useState<PacsVendor>('lenel')
  const [inspectedRow, setInspectedRow] = useState<MatrixRow | null>(null)

  const filteredRows = PACS_MATRIX_DATA.filter((row) =>
    selectedCategory === 'all' ? true : row.category === selectedCategory
  )

  const activeVendorInfo = VENDORS.find((v) => v.id === selectedVendor) || VENDORS[0]

  return (
    <div className="space-y-6">
      {/* Filter Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-slate-900/60 p-4 backdrop-blur-xl">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400 mr-2">
            Domain:
          </span>
          {[
            { id: 'all', label: 'All Domains' },
            { id: 'identity', label: 'Identity & Person' },
            { id: 'credential', label: 'Wiegand & Cards' },
            { id: 'access', label: 'Access Groups' },
            { id: 'temporal', label: 'Status & Lifecycle' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all active:scale-[0.98] ${
                selectedCategory === cat.id
                  ? 'border border-cyan-500/40 bg-cyan-950/50 text-cyan-300'
                  : 'border border-slate-800 bg-slate-950/50 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Vendor Selector */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400 mr-1">
            Compare Source:
          </span>
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value as PacsVendor)}
            className="rounded-xl border border-slate-700/60 bg-slate-950 px-3 py-1.5 font-mono text-xs text-slate-200 outline-none focus:border-cyan-500"
          >
            {VENDORS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label} ({v.platform})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="surface-glass rounded-2xl overflow-hidden shadow-glass-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/[0.08] bg-slate-950/80 font-mono text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6 w-1/4">Architecture Dimension</th>
                <th className="py-4 px-6 w-3/8 text-amber-300">
                  Legacy Source: {activeVendorInfo.label}
                </th>
                <th className="py-4 px-6 w-3/8 text-cyan-300">
                  Target: Genetec Synergis Standard
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredRows.map((row) => {
                const sourceData = row.systems[selectedVendor]
                const genetecData = row.systems.genetec

                return (
                  <tr
                    key={row.attributeKey}
                    onClick={() => setInspectedRow(row)}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {row.label}
                      </div>
                      <span className="font-mono text-[10px] uppercase text-indigo-400">
                        {row.category}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-mono text-xs font-semibold text-slate-200">
                        {sourceData.value}
                      </div>
                      {sourceData.gotcha && (
                        <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-amber-300/90 leading-tight">
                          <span className="text-amber-400 font-bold">⚠️ Gotcha:</span>
                          <span>{sourceData.gotcha}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-mono text-xs font-semibold text-cyan-300">
                        {genetecData.value}
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {genetecData.notes}
                      </p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row Inspection Slide-Over / Modal */}
      {inspectedRow && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="matrix-inspector-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <div className="surface-glass max-w-2xl w-full rounded-2xl p-6 shadow-2xl border border-white/[0.1] text-slate-200">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                  PACS Architecture Inspector
                </span>
                <h4 id="matrix-inspector-title" className="text-lg font-bold text-white">
                  {inspectedRow.label}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setInspectedRow(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
                aria-label="Close inspector"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">
                  Source Implementation ({activeVendorInfo.label}):
                </span>
                <pre className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-amber-300 overflow-x-auto">
                  {inspectedRow.systems[selectedVendor].transformRegex ||
                    inspectedRow.systems[selectedVendor].value}
                </pre>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">
                  Genetec Target Format:
                </span>
                <pre className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-cyan-300 overflow-x-auto">
                  {inspectedRow.systems.genetec.transformRegex ||
                    inspectedRow.systems.genetec.value}
                </pre>
              </div>

              {inspectedRow.systems[selectedVendor].gotcha && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-3.5 text-amber-200 font-sans text-xs">
                  <strong className="font-bold text-amber-400">Cutover Vulnerability Warning: </strong>
                  {inspectedRow.systems[selectedVendor].gotcha}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectedRow(null)}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
