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
  const [, startTransition] = useTransition()
  const [showMappingDrawer, setShowMappingDrawer] = useState(false)
  const [viewMode, setViewMode] = useState<'converted' | 'original'>('converted')
  const [copiedCsv, setCopiedCsv] = useState(false)
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null)

  // Switch sample preset
  const handleSelectPreset = (preset: PacsPreset) => {
    startTransition(() => {
      setSelectedPreset(preset)
      setRecords(preset.sampleRecords)
      setSourceColumns(preset.sourceColumns)
      setMappings(preset.defaultMappings)
      setUploadFeedback(null)
    })
  }

  // Update a single column mapping
  const handleMapChange = (targetKey: string, rule: MappingRule) => {
    startTransition(() => {
      setMappings((prev) => ({ ...prev, [targetKey]: rule }))
    })
  }

  // Reset mappings to current preset defaults
  const handleResetMappings = () => {
    startTransition(() => {
      setMappings(selectedPreset.defaultMappings)
    })
  }

  // Handle Local CSV Upload
  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      setUploadFeedback('Please upload a plain .csv file.')
      return
    }

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          setUploadFeedback('The CSV file appears to be empty.')
          return
        }

        const cols = Object.keys(results.data[0] || {})
        const cleanSample = results.data.slice(0, 25)

        startTransition(() => {
          setRecords(cleanSample)
          setSourceColumns(cols)
          setUploadFeedback(`Uploaded "${file.name}" (${results.data.length} records, ${cols.length} columns).`)

          // Smart auto-mapping
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
        setUploadFeedback(`Could not parse CSV: ${err.message}`)
      },
    })
  }

  // Reactive Transformations
  const { results, validCount, totalRecords, duplicateBadgeCollisions } = transformAllRecords(
    records,
    mappings
  )

  // Copy CSV to Clipboard
  const handleCopyCsv = () => {
    if (!results || results.length === 0) return
    const cleanRows = results.map((r) => r.data)
    const csv = Papa.unparse(cleanRows, { quotes: true, header: true })
    navigator.clipboard.writeText(csv).then(() => {
      setCopiedCsv(true)
      setTimeout(() => setCopiedCsv(false), 2000)
    })
  }

  return (
    <div className="space-y-4">
      {/* 1. Sleek Source Selector Bar */}
      <div className="surface-glass rounded-2xl p-4 shadow-glass-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">
            Sample datasets:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {PACS_PRESETS.map((preset) => {
              const isSelected = selectedPreset.id === preset.id
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all active:scale-[0.98] ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-glow-indigo font-semibold'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {preset.name.replace(/ \d+.*$/, '')}
                </button>
              )
            })}
          </div>
        </div>

        {/* Upload Custom CSV */}
        <label className="relative inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-800/80 px-3.5 py-1.5 text-xs font-medium text-slate-200 transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98] self-start md:self-auto">
          <svg className="h-3.5 w-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>Upload your CSV</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleCustomFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="Upload custom CSV"
          />
        </label>
      </div>

      {uploadFeedback && (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-4 py-2 text-xs text-cyan-300">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{uploadFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setUploadFeedback(null)}
            className="text-cyan-400 hover:text-white text-xs"
          >
            ×
          </button>
        </div>
      )}

      {/* 2. Main Live Data Table Card */}
      <div className="surface-glass rounded-2xl overflow-hidden shadow-glass-card">
        {/* Table Toolbar */}
        <div className="border-b border-white/[0.08] bg-slate-950/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{validCount} of {totalRecords} records ready</span>
            </span>

            {duplicateBadgeCollisions.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-950/40 px-2.5 py-1 text-xs font-medium text-amber-300">
                <span>⚠️ {duplicateBadgeCollisions.length} duplicate badge IDs</span>
              </span>
            )}
          </div>

          {/* Action CTAs & View Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Switcher */}
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/80 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('converted')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  viewMode === 'converted'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Genetec output
              </button>
              <button
                type="button"
                onClick={() => setViewMode('original')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  viewMode === 'original'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Source data
              </button>
            </div>

            {/* Copy CSV */}
            <button
              type="button"
              onClick={handleCopyCsv}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]"
            >
              {copiedCsv ? (
                <>
                  <span className="text-emerald-400">✓</span>
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>

            {/* Primary Download Button */}
            <button
              type="button"
              onClick={() => exportToGenetecCsv(results, `genetec_${selectedPreset.id}_export`)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow-indigo transition-all hover:opacity-95 active:scale-[0.98]"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download CSV</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        {viewMode === 'converted' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.08] bg-slate-950/80 text-slate-400 font-medium">
                <tr>
                  <th className="px-4 py-3">First name</th>
                  <th className="px-4 py-3">Last name</th>
                  <th className="px-4 py-3">Badge ID</th>
                  <th className="px-4 py-3">Facility code</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Access group</th>
                  <th className="px-4 py-3">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {results.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">
                      {row.data.FirstName || '—'}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">
                      {row.data.LastName || '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-cyan-300 font-semibold">
                      {row.data.BadgeID || '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-300">
                      {row.data.FacilityCode || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        row.data.Status === 'Active'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {row.data.Status || 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 max-w-[180px] truncate">
                      {row.data.AccessGroup || '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-400 max-w-[180px] truncate">
                      {row.data.Email || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-white/[0.08] bg-slate-950/80 text-slate-400">
                <tr>
                  {sourceColumns.slice(0, 7).map((col) => (
                    <th key={col} className="px-4 py-3 font-medium whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                  {sourceColumns.length > 7 && (
                    <th className="px-4 py-3 text-slate-500 font-medium">+{sourceColumns.length - 7} more</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {records.slice(0, 10).map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    {sourceColumns.slice(0, 7).map((col) => (
                      <td key={col} className="px-4 py-3 text-slate-300 whitespace-nowrap text-[11px]">
                        {r[col] || '—'}
                      </td>
                    ))}
                    {sourceColumns.length > 7 && <td className="px-4 py-3 text-slate-600">...</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer info strip */}
        <div className="border-t border-white/[0.08] bg-slate-950/40 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing first {Math.min(10, totalRecords)} of {totalRecords} records
          </span>

          {/* Progressive Disclosure Toggle */}
          <button
            type="button"
            onClick={() => setShowMappingDrawer(!showMappingDrawer)}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            <span>{showMappingDrawer ? 'Hide column mapping' : 'Customize column mapping'}</span>
            <span className={`transform transition-transform ${showMappingDrawer ? 'rotate-180' : ''}`}>▾</span>
          </button>
        </div>
      </div>

      {/* 3. Optional Column Mapping Drawer */}
      {showMappingDrawer && (
        <div className="surface-glass rounded-2xl p-5 shadow-glass-card space-y-4 transition-all">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Column mapping rules
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Link legacy source columns to Genetec standard target fields.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetMappings}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Reset to defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TARGET_GENETEC_FIELDS.map((field) => {
              const currentMap = mappings[field.key]
              const isAdvanced = typeof currentMap === 'object' && currentMap !== null

              const displayLabel = typeof currentMap === 'string'
                ? currentMap
                : currentMap?.type === 'concatenate'
                ? currentMap.sources.join(' + ')
                : currentMap?.type === 'wiegand-compose'
                ? `${currentMap.facilityCodeSource}:${currentMap.cardNumberSource}`
                : currentMap && 'source' in currentMap
                ? currentMap.source
                : 'Custom rule'

              return (
                <div
                  key={field.key}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white">{field.label}</span>
                    {field.required && (
                      <span className="text-[10px] text-rose-400">Required</span>
                    )}
                  </div>

                  {isAdvanced ? (
                    <div className="flex items-center justify-between rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-2.5 py-1.5 text-xs text-cyan-300">
                      <span className="font-mono text-[11px] truncate">★ {displayLabel}</span>
                      <button
                        type="button"
                        onClick={() => handleMapChange(field.key, '')}
                        className="ml-1 text-cyan-400 hover:text-white"
                        aria-label={`Clear custom rule for ${field.label}`}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <select
                        value={typeof currentMap === 'string' ? currentMap : ''}
                        onChange={(e) => handleMapChange(field.key, e.target.value)}
                        className="flex-1 rounded-lg border border-slate-700/60 bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-200 outline-none focus:border-indigo-500"
                      >
                        <option value="">Unmapped</option>
                        {sourceColumns.map((col) => (
                          <option key={col} value={col}>
                            {col}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => setActiveModal(field.key)}
                        title="Merge multiple columns"
                        className="rounded-lg border border-slate-700/60 bg-slate-800/80 px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-700 hover:text-white active:scale-[0.98]"
                      >
                        Merge
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

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
