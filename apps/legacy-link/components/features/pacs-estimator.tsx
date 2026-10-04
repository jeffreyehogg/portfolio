'use client'

import { useState, useMemo } from 'react'
import { calculatePacsEstimator } from '@/lib/pacs-calculator'
import { EstimatorInputs } from '@/lib/pacs-types'

export default function PacsEstimator() {
  const [inputs, setInputs] = useState<EstimatorInputs>({
    cardholderCount: 12500,
    legacySystemCount: 2,
    credentialFormat: '26-bit',
    facilityCodeCount: 3,
    doorCount: 160,
    hourlyRate: 165,
  })

  const results = useMemo(() => calculatePacsEstimator(inputs), [inputs])
  const collisionPct = Math.round(results.collisionProbability * 100)

  return (
    <div className="surface-glass rounded-2xl p-5 sm:p-6 shadow-glass-card space-y-6">
      <div>
        <h3 className="text-base font-semibold text-white">
          Cutover savings & risk calculator
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Estimate how much time and money you save using automated data conversion instead of manual spreadsheets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Cardholders */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label htmlFor="cardholder-count" className="font-medium text-slate-300">
                Total cardholders
              </label>
              <span className="font-mono font-bold text-cyan-400 text-sm">
                {inputs.cardholderCount.toLocaleString()}
              </span>
            </div>
            <input
              id="cardholder-count"
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={inputs.cardholderCount}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, cardholderCount: parseInt(e.target.value) || 1000 }))
              }
              className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-0.5">
              <span>1,000</span>
              <span>25,000</span>
              <span>50,000+</span>
            </div>
          </div>

          {/* Legacy Systems */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label className="font-medium text-slate-300">
                Legacy systems being consolidated
              </label>
              <span className="font-mono text-indigo-400 font-semibold">
                {inputs.legacySystemCount} system{inputs.legacySystemCount > 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setInputs((prev) => ({ ...prev, legacySystemCount: count }))}
                  className={`py-1.5 rounded-xl text-xs font-medium border transition-all active:scale-[0.98] ${
                    inputs.legacySystemCount === count
                      ? 'border-indigo-500 bg-indigo-600 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {count} {count === 4 ? '+' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Credential Format */}
          <div>
            <label htmlFor="credential-format" className="block text-xs font-medium text-slate-300 mb-1.5">
              Primary badge format
            </label>
            <select
              id="credential-format"
              value={inputs.credentialFormat}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  credentialFormat: e.target.value as EstimatorInputs['credentialFormat'],
                }))
              }
              className="w-full rounded-xl border border-slate-700/60 bg-slate-950 px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
            >
              <option value="26-bit">Standard 26-bit Wiegand (H10301)</option>
              <option value="37-bit">37-bit HID (Large credential ID)</option>
              <option value="35-bit-corp">35-bit HID Corporate 1000</option>
              <option value="desfire">MIFARE DESFire EV2/EV3</option>
            </select>
          </div>
        </div>

        {/* Right Output Cards (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Card 1: Hours */}
          <div className="rounded-xl border border-white/[0.08] bg-slate-950/70 p-4 flex flex-col justify-between">
            <span className="text-xs text-slate-400">Engineering hours saved</span>
            <div className="my-2 font-mono text-3xl font-bold text-cyan-400 tracking-tight">
              {results.hoursSaved.toLocaleString()}{' '}
              <span className="text-xs font-normal text-slate-500">hours</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Reduces manual spreadsheet work from ~{results.manualCutoverHours}h down to {results.legacyLinkCutoverHours}h.
            </p>
          </div>

          {/* Card 2: Dollars */}
          <div className="rounded-xl border border-white/[0.08] bg-slate-950/70 p-4 flex flex-col justify-between">
            <span className="text-xs text-slate-400">Estimated labor savings</span>
            <div className="my-2 font-mono text-3xl font-bold text-emerald-400 tracking-tight">
              ${results.dollarSavings.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400">
              Based on standard integrator cutover rates.
            </p>
          </div>

          {/* Card 3: Collision Risk (Span 2) */}
          <div className="sm:col-span-2 rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-200">
                Duplicate badge collision risk
              </span>
              <span className={`font-mono font-semibold ${
                collisionPct > 40 ? 'text-rose-400' : collisionPct > 15 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {collisionPct}% chance
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  collisionPct > 40 ? 'bg-rose-500' : collisionPct > 15 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.max(5, collisionPct)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {results.estimatedCollisions > 0 ? (
                <>
                  <strong className="text-amber-300 font-medium">~{results.estimatedCollisions} duplicate badges predicted.</strong>{' '}
                  Merging {inputs.legacySystemCount} databases usually leads to badge collisions on Monday morning. Legacy Link prevents this by prefixing site facility codes automatically.
                </>
              ) : (
                'Low collision risk. Card numbers do not overlap.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
