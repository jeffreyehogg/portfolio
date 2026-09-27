'use client'

import { useState, useTransition } from 'react'
import Papa from 'papaparse'
import { PACS_PRESETS, TARGET_GENETEC_FIELDS } from '@/lib/pacs-presets'
import { MappingRule, PacsPreset } from '@/lib/pacs-types'
import { transformAllRecords, exportToGenetecCsv } from '@/lib/pacs-transformer'
import ConcatenationBuilder from '@/components/concatenation-builder'

export default function PacsSandbox() {
  const [selectedPreset, setSelectedPreset] = useState<PacsPreset>(PACS_PRESETS[0])
  const [records, setRecords] = useState<Record<string, string>[]>(PACS_PRESETS[0].sampleRecords)
  const [sourceColumns, setSourceColumns] = useState<string[]>(PACS_PRESETS[0].sourceColumns)
  const [mappings, setMappings] = useState<Record<string, MappingRule>>(PACS_PRESETS[0].defaultMappings)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [activeDiffIndex, setActiveDiffIndex] = useState(0)
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null)

  // Handle Preset Switching
  const handleSelectPreset = (preset: PacsPreset) => {
    startTransition(() => {
      setSelectedPreset(preset)
      setRecords(preset.sampleRecords)
      setSourceColumns(preset.sourceColumns)
      setMappings(preset.defaultMappings)
      setActiveDiffIndex(0)
      setUploadFeedback(null)
    })
  }

  // Handle Mapping Change
  const handleMapChange = (targetKey: string, rule: MappingRule) => {
    startTransition(() => {
      setMappings((prev) => ({ ...prev, [targetKey]: rule }))
    })
  }

  // Handle Local CSV Upload via PapaParse
  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      setUploadFeedback('Invalid format: Please provide a raw .csv export file.')
      return
    }

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          setUploadFeedback('The uploaded CSV contains no records.')
          return
        }

        const cols = Object.keys(results.data[0] || {})
        const cleanSample = results.data.slice(0, 20)

        startTransition(() => {
          setRecords(cleanSample)
          setSourceColumns(cols)
          setActiveDiffIndex(0)
          setUploadFeedback(`Successfully ingested ${results.data.length} rows (${cols.length} detected columns).`)
          
          // Smart heuristic mapping
          const autoMap: Record<string, MappingRule> = {}
          cols.forEach((col) => {
            const lower = col.toLowerCase()
            if (lower.includes('first') || lower === 'fname' || lower === 'forename') autoMap.FirstName = col
            if (lower.includes('last') || lower === 'lname' || lower === 'surname') autoMap.LastName = col
            if (lower.includes('card') || lower.includes('badge') || lower === 'id') autoMap.BadgeID = col
            if (lower.includes('fac') || lower === 'fc' || lower.includes('facility')) autoMap.FacilityCode = col
            if (lower.includes('mail')) autoMap.Email = col
            if (lower.includes('access') || lower.includes('clearance') || lower.includes('level')) autoMap.AccessGroup = col
            if (lower.includes('status') || lower.includes('active')) autoMap.Status = col
          })
          setMappings(autoMap)
        })
      },
      error: (err) => {
        setUploadFeedback(`Parsing error: ${err.message}`)
      },
    })
  }

  // Reactive Transformations
  const { results, validCount, totalRecords, duplicateBadgeCollisions } = transformAllRecords(
    records,
    mappings
  )

  const activeRecord = records[activeDiffIndex] || records[0] || {}
  const activeResult = results[activeDiffIndex] || results[0]

  return (
    <div className="space-y-6">
      {/* Preset Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-slate-900/60 p-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400 mr-2">
            Load Preset Dump:
          </span>
          {PACS_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all active:scale-[0.98] ${
                  isSelected
                    ? 'border border-indigo-500/40 bg-indigo-600 text-white shadow-glow-indigo'
                    : 'border border-slate-700/50 bg-slate-800/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{preset.name}</span>
                <span className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">
                  {preset.vendorBadge}
                </span>
              </button>
            )
          })}
        </div>

        {/* Local File Upload Button */}
        <label className="relative inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]">
          <svg className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>Drop Custom CSV</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleCustomFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="Upload custom CSV for testing"
          />
        </label>
      </div>

      {uploadFeedback && (
        <div className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-4 py-2 text-xs font-mono text-cyan-300">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{uploadFeedback}</span>
        </div>
      )}

      {/* Main 2-Column Workspace: Left = Mapping Canvas, Right = Live Reactive Diff Viewer */}
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN: Visual Mapping Canvas (7 Cols) */}
        <div className="col-span-12 lg:col-span-7 space-y-4">
          <div className="surface-glass rounded-2xl p-6 shadow-glass-card">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Schema Mapping Rules
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Link legacy attributes from <span className="font-semibold text-slate-200">{selectedPreset.name}</span> to Genetec Synergis.
                </p>
              </div>

              {/* Parity Status Badge */}
              <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-slate-950/60 px-3 py-1 text-xs font-mono">
                <span className="text-slate-400">Parity:</span>
                <span className={`font-bold ${validCount === totalRecords ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {validCount}/{totalRecords} Valid
                </span>
              </div>
            </div>

            {/* Field Rows */}
            <div className="space-y-3">
              {TARGET_GENETEC_FIELDS.map((field) => {
                const currentMap = mappings[field.key]
                const isAdvanced = typeof currentMap === 'object' && currentMap !== null

                let displayLabel = ''
                if (typeof currentMap === 'string') {
                  displayLabel = currentMap
                } else if (isAdvanced) {
                  if (currentMap.type === 'concatenate') {
                    displayLabel = currentMap.sources.join(` ${currentMap.separator || '+'} `)
                  } else if (currentMap.type === 'access-flatten') {
                    displayLabel = `${currentMap.source} (delimited)`
                  } else if (currentMap.type === 'status-normalize') {
                    displayLabel = `${currentMap.source} (normalized)`
                  } else if (currentMap.type === 'wiegand-compose') {
                    displayLabel = `${currentMap.facilityCodeSource}:${currentMap.cardNumberSource}`
                  } else if (currentMap.type === 'uppercase') {
                    displayLabel = `${currentMap.source} (uppercase)`
                  }
                }

                return (
                  <div
                    key={field.key}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-3.5 transition-all ${
                      currentMap
                        ? 'border-indigo-500/20 bg-slate-900/80 shadow-sm'
                        : 'border-slate-800/80 bg-slate-950/40'
                    }`}
                  >
                    {/* Target Specification */}
                    <div className="min-w-[160px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{field.label}</span>
                        {field.required && (
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" title="Required Field" />
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                        <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 text-indigo-400 border border-indigo-500/20">
                          {field.key}
                        </span>
                        <span className="text-slate-500">{field.schemaType}</span>
                      </div>
                    </div>

                    {/* Mapping Control */}
                    <div className="flex flex-1 items-center gap-2">
                      {isAdvanced ? (
                        <div className="flex flex-1 items-center justify-between rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-3 py-1.5 text-xs font-mono text-cyan-300">
                          <span className="truncate">★ {displayLabel}</span>
                          <button
                            type="button"
                            onClick={() => handleMapChange(field.key, '')}
                            className="ml-2 text-cyan-400 hover:text-white"
                            aria-label={`Clear custom rule for ${field.label}`}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <select
                          value={typeof currentMap === 'string' ? currentMap : ''}
                          onChange={(e) => handleMapChange(field.key, e.target.value)}
                          className="flex-1 rounded-lg border border-slate-700/60 bg-slate-950 px-3 py-1.5 font-mono text-xs text-slate-200 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="">Select source column...</option>
                          {sourceColumns.map((col) => (
                            <option key={col} value={col}>
                              {col}
                            </option>
                          ))}
                        </select>
                      )}

                      <button
                        type="button"
                        onClick={() => setActiveModal(field.key)}
                        className="rounded-lg border border-slate-700/60 bg-slate-800/80 px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]"
                      >
                        Merge
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Side-by-Side Reactive Diff Viewer (5 Cols) */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <div className="surface-glass rounded-2xl p-6 shadow-glass-card">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Reactive Record Diff
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Inspect live transformed Genetec output.
                </p>
              </div>

              {/* Record Selector Pager */}
              <div className="flex items-center gap-1 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setActiveDiffIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeDiffIndex === 0}
                  className="rounded bg-slate-800 px-2 py-1 text-slate-300 hover:bg-slate-700 disabled:opacity-30"
                >
                  ◀
                </button>
                <span className="px-2 text-slate-400">
                  {activeDiffIndex + 1}/{records.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveDiffIndex((prev) => Math.min(records.length - 1, prev + 1))}
                  disabled={activeDiffIndex === records.length - 1}
                  className="rounded bg-slate-800 px-2 py-1 text-slate-300 hover:bg-slate-700 disabled:opacity-30"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* Validation Pill */}
            {activeResult && (
              <div className="mb-4">
                {activeResult.isValid ? (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-xs font-mono text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Genetec PascalCase Conformance: PASSED</span>
                  </div>
                ) : (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs font-mono text-rose-300 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-rose-400">
                      <span className="h-2 w-2 rounded-full bg-rose-500" />
                      <span>Validation Errors ({activeResult.errors.length}):</span>
                    </div>
                    {activeResult.errors.map((err, i) => (
                      <div key={i} className="pl-4">• {err}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Duplicate Collision Warnings */}
            {duplicateBadgeCollisions.length > 0 && (
              <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-950/30 p-3 text-xs font-mono text-amber-300">
                <span className="font-bold text-amber-400">⚠️ Collision Warning:</span> Multiple cardholders share Badge #{duplicateBadgeCollisions.join(', #')}
              </div>
            )}

            {/* Transformed Target Output Display */}
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400 uppercase tracking-wider">
                <span>Genetec Target</span>
                <span>Output Value</span>
              </div>
              {TARGET_GENETEC_FIELDS.map((f) => (
                <div key={f.key} className="flex items-center justify-between py-1 border-b border-slate-900/60 last:border-0">
                  <span className="text-slate-400">{f.key}:</span>
                  <span className={`font-semibold ${activeResult?.data[f.key] ? 'text-cyan-300' : 'text-slate-600'}`}>
                    {activeResult?.data[f.key] || '—'}
                  </span>
                </div>
              ))}
            </div>

            {/* Raw Legacy Payload Well */}
            <div className="mt-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1 block">
                Raw Legacy Record ({selectedPreset.name})
              </span>
              <pre className="max-h-36 overflow-auto rounded-xl border border-slate-800/80 bg-slate-950 p-3 font-mono text-[11px] text-slate-400">
                {JSON.stringify(activeRecord, null, 2)}
              </pre>
            </div>

            {/* Export Action */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <button
                type="button"
                onClick={() => exportToGenetecCsv(results, `genetec_${selectedPreset.id}_export`)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 text-xs font-bold text-white shadow-glow-indigo transition-all hover:opacity-95 active:scale-[0.98]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Verified Genetec CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Concatenation Builder Modal */}
      {activeModal && (
        <ConcatenationBuilder
          targetLabel={TARGET_GENETEC_FIELDS.find((f) => f.key === activeModal)?.label || ''}
          sourceColumns={sourceColumns}
          onClose={() => setActiveModal(null)}
          onSave={(rule) => {
            handleMapChange(activeModal, rule)
            setActiveModal(null)
          }}
        />
      )}
    </div>
  )
}
