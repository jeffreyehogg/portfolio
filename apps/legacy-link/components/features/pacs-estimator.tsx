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

  const [showExportModal, setShowExportModal] = useState(false)

  const results = useMemo(() => calculatePacsEstimator(inputs), [inputs])

  const collisionPct = Math.round(results.collisionProbability * 100)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN: Telemetry Inputs (6 Cols) */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
          <div className="surface-glass rounded-2xl p-6 shadow-glass-card">
            <div className="border-b border-white/[0.08] pb-4 mb-6">
              <h3 className="text-base font-bold text-white tracking-tight">
                Cutover Telemetry Inputs
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Model your enterprise physical access migration variables.
              </p>
            </div>

            <div className="space-y-5">
              {/* Cardholders Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <label htmlFor="cardholder-count" className="font-semibold text-slate-300">
                    Total Active Cardholders
                  </label>
                  <span className="font-mono font-bold text-cyan-400 text-sm">
                    {inputs.cardholderCount.toLocaleString()}
                  </span>
                </div>
                <input
                  id="cardholder-count"
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={inputs.cardholderCount}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, cardholderCount: parseInt(e.target.value) || 500 }))
                  }
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>500 (Branch)</span>
                  <span>50,000 (Campus)</span>
                  <span>100,000+ (Global)</span>
                </div>
              </div>

              {/* Number of Legacy Systems */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <label htmlFor="system-count" className="font-semibold text-slate-300">
                    Disparate Legacy Systems (M&A / Multi-Site)
                  </label>
                  <span className="font-mono font-bold text-indigo-400 text-sm">
                    {inputs.legacySystemCount} Platform{inputs.legacySystemCount > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setInputs((prev) => ({ ...prev, legacySystemCount: count }))}
                      className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all active:scale-[0.98] ${
                        inputs.legacySystemCount === count
                          ? 'border-indigo-500/50 bg-indigo-600 text-white shadow-glow-indigo'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {count} {count === 1 ? 'System' : 'Systems'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Credential Format Selector */}
              <div>
                <label htmlFor="credential-format" className="block text-xs font-semibold text-slate-300 mb-2">
                  Primary Credential Bit Structure
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
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-950 px-3.5 py-2.5 font-mono text-xs text-slate-200 outline-none focus:border-indigo-500"
                >
                  <option value="26-bit">Standard 26-bit Wiegand (H10301) — 16-bit Card ID</option>
                  <option value="37-bit">37-bit HID (H10302 / H10304) — Large Card ID</option>
                  <option value="35-bit-corp">35-bit HID Corporate 1000 — 12-bit FC / 20-bit ID</option>
                  <option value="desfire">MIFARE DESFire EV2/EV3 (14-char Hex CSN)</option>
                  <option value="mixed">Mixed Legacy Multi-Format (High Collision Risk)</option>
                </select>
              </div>

              {/* Facility Codes & Rate in Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="facility-codes" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Facility Codes in Circulation
                  </label>
                  <input
                    id="facility-codes"
                    type="number"
                    min="1"
                    max="32"
                    value={inputs.facilityCodeCount}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, facilityCodeCount: parseInt(e.target.value) || 1 }))
                    }
                    className="w-full rounded-xl border border-slate-700/60 bg-slate-950 px-3 py-2 font-mono text-xs text-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="hourly-rate" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Integrator Rate ($/hr)
                  </label>
                  <input
                    id="hourly-rate"
                    type="number"
                    min="80"
                    max="350"
                    value={inputs.hourlyRate}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, hourlyRate: parseInt(e.target.value) || 165 }))
                    }
                    className="w-full rounded-xl border border-slate-700/60 bg-slate-950 px-3 py-2 font-mono text-xs text-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quantitative Results & Visual Telemetry (6 Cols) */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
          <div className="surface-glass rounded-2xl p-6 shadow-glass-card space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Quantitative Migration Assessment
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated ETL vs. Manual Spreadsheet Cutover
                </p>
              </div>

              {/* Risk Tier Pill */}
              <div
                className={`rounded-full px-3 py-1 font-mono text-xs font-bold border ${
                  results.riskTier === 'CRITICAL'
                    ? 'border-rose-500/40 bg-rose-950/40 text-rose-400'
                    : results.riskTier === 'MODERATE'
                    ? 'border-amber-500/40 bg-amber-950/40 text-amber-400'
                    : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                }`}
              >
                {results.riskTier} RISK PROFILE
              </div>
            </div>

            {/* Big Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/[0.08] bg-slate-950/80 p-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  Labor Hours Saved
                </span>
                <div className="mt-1 font-mono text-3xl font-extrabold text-cyan-400 tracking-tight">
                  {results.hoursSaved.toLocaleString()}
                  <span className="text-sm font-normal text-slate-500 ml-1">hrs</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  From {results.manualCutoverHours.toLocaleString()}h manual to {results.legacyLinkCutoverHours}h automated
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-slate-950/80 p-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  Financial Labor Savings
                </span>
                <div className="mt-1 font-mono text-3xl font-extrabold text-emerald-400 tracking-tight">
                  ${results.dollarSavings.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  At ${inputs.hourlyRate}/hr integrator billing
                </p>
              </div>
            </div>

            {/* Wiegand Collision Paradox Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">
                  Wiegand 26-bit Birthday Paradox Collision Hazard
                </span>
                <span
                  className={`font-mono font-bold ${
                    collisionPct > 50 ? 'text-rose-400' : collisionPct > 20 ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {collisionPct}% Probability
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    collisionPct > 50 ? 'bg-rose-500' : collisionPct > 20 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.max(5, collisionPct)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                {results.estimatedCollisions > 0 ? (
                  <>
                    <strong className="text-amber-300 font-semibold">
                      ~{results.estimatedCollisions} duplicate credentials predicted.
                    </strong>{' '}
                    Merging {inputs.legacySystemCount} legacy databases with standard 26-bit cards will produce duplicate badge IDs that cause Monday morning turnstile lockouts. Legacy Link applies automated Facility Code prefixing to prevent collisions.
                  </>
                ) : (
                  'Low credential collision hazard. Credential space is sufficient for active personnel count.'
                )}
              </p>
            </div>

            {/* Complexity & Downtime Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/50 p-2.5">
                <span className="text-slate-400 font-mono text-[11px]">Complexity Index</span>
                <span className="font-mono font-bold text-white">{results.complexityScore} / 100</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/50 p-2.5">
                <span className="text-slate-400 font-mono text-[11px]">Overtime Avoided</span>
                <span className="font-mono font-bold text-cyan-400">~{results.weekendOvertimeHoursAvoided} hrs</span>
              </div>
            </div>

            {/* Export Briefing CTA */}
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-600/20 py-2.5 text-xs font-bold text-indigo-300 transition-all hover:bg-indigo-600 hover:text-white active:scale-[0.98]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>View Executive Cutover Briefing</span>
            </button>
          </div>
        </div>
      </div>

      {/* Briefing Modal */}
      {showExportModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="briefing-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        >
          <div className="surface-glass max-w-xl w-full rounded-2xl p-6 shadow-2xl border border-white/[0.1] text-slate-200">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
              <h4 id="briefing-title" className="text-base font-bold text-white">
                Executive PACS Cutover Assessment Briefing
              </h4>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
                aria-label="Close briefing dialog"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <div>PROJECT SCOPE: {inputs.cardholderCount.toLocaleString()} Cardholders across {inputs.legacySystemCount} Legacy System(s)</div>
                <div>CREDENTIAL FORMAT: {inputs.credentialFormat.toUpperCase()}</div>
                <div>PREDICTED COLLISION HAZARD: {collisionPct}% (~{results.estimatedCollisions} duplicate IDs)</div>
                <div>TOTAL MANUAL HOURS REQUIRED: {results.manualCutoverHours} hours</div>
                <div>LEGACY LINK AUTOMATED HOURS: {results.legacyLinkCutoverHours} hours</div>
                <div className="text-emerald-400 font-bold">NET HOURS SAVED: {results.hoursSaved} hours</div>
                <div className="text-emerald-400 font-bold">TOTAL ESTIMATED DOLLAR SAVINGS: ${results.dollarSavings.toLocaleString()}</div>
              </div>
              <p className="text-slate-400 font-sans text-xs">
                Recommendation: Deploy Legacy Link automated middleware ETL to eliminate duplicate badge collisions and reduce weekend cutover window by 95%.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
