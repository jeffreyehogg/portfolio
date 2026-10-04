'use client'

import { useState } from 'react'
import { PACS_MATRIX_DATA } from '@/lib/pacs-matrix-data'
import { PacsVendor } from '@/lib/pacs-types'

const VENDORS: { id: PacsVendor; label: string }[] = [
  { id: 'lenel', label: 'Lenel OnGuard' },
  { id: 'ccure', label: 'C•CURE 9000' },
  { id: 'amag', label: 'AMAG Symmetry' },
  { id: 'dna_fusion', label: 'DNA Fusion' },
  { id: 'brivo', label: 'Brivo Access' },
]

export default function PacsMatrix() {
  const [selectedVendor, setSelectedVendor] = useState<PacsVendor>('lenel')

  const activeVendorInfo = VENDORS.find((v) => v.id === selectedVendor) || VENDORS[0]

  return (
    <div className="surface-glass rounded-2xl p-5 sm:p-6 shadow-glass-card space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <h3 className="text-base font-semibold text-white">
            Supported systems & field mapping matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            See how legacy badge attributes automatically map to Genetec Security Center.
          </p>
        </div>

        {/* Vendor Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Source:</span>
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value as PacsVendor)}
            className="rounded-xl border border-slate-700/60 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-medium"
          >
            {VENDORS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/[0.08] bg-slate-950/80 text-slate-400">
            <tr>
              <th className="py-3 px-4 font-medium w-1/4">Field name</th>
              <th className="py-3 px-4 font-medium text-amber-300/90 w-1/4">
                {activeVendorInfo.label} format
              </th>
              <th className="py-3 px-4 font-medium text-cyan-300 w-1/4">
                Genetec target format
              </th>
              <th className="py-3 px-4 font-medium w-1/4">
                Cutover safeguard
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {PACS_MATRIX_DATA.map((row) => {
              const sourceData = row.systems[selectedVendor]
              const genetecData = row.systems.genetec

              return (
                <tr key={row.attributeKey} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-white">{row.label}</span>
                    <span className="block text-[11px] text-slate-500 capitalize">{row.category}</span>
                  </td>

                  <td className="py-3 px-4 font-mono text-xs text-slate-300">
                    {sourceData.value}
                  </td>

                  <td className="py-3 px-4 font-mono text-xs font-semibold text-cyan-300">
                    {genetecData.value}
                  </td>

                  <td className="py-3 px-4 text-xs text-slate-400">
                    {sourceData.gotcha || genetecData.notes || 'Direct schema pass-through.'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
