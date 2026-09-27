'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import ConcatenationBuilder from './concatenation-builder'

const TARGET_FIELDS = [
  { key: 'FirstName', label: 'First Name', required: true, desc: 'Given Name' },
  { key: 'LastName', label: 'Last Name', required: true, desc: 'Family Surname' },
  { key: 'BadgeID', label: 'Badge / Card Number', required: true, desc: 'Wiegand Credential ID' },
  { key: 'FacilityCode', label: 'Facility Code', required: false, desc: 'Site Code (0-255)' },
  { key: 'Email', label: 'Email Address', required: false, desc: 'Mobile Credential Email' },
  { key: 'AccessGroup', label: 'Access Level Group', required: false, desc: 'Assigned Clearances' },
  { key: 'Status', label: 'Cardholder Status', required: true, desc: 'Active / Inactive' },
]

interface MappingRule {
  type: 'concatenate' | 'static' | 'uppercase' | 'access-flatten' | 'status-normalize'
  sources?: string[]
  source?: string
  separator?: string
  value?: string
}

interface FieldMapperProps {
  migrationId: number
  sourceColumns: string[]
  initialMappings?: Record<string, string | MappingRule>
}

export default function FieldMapper({
  migrationId,
  sourceColumns,
  initialMappings,
}: FieldMapperProps) {
  const [mappings, setMappings] = useState<Record<string, any>>(initialMappings || {})
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [, startTransition] = useTransition()
  const router = useRouter()

  const handleMapChange = (targetKey: string, value: any) => {
    setMappings((prev) => ({ ...prev, [targetKey]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const res = await fetch(`/api/migrations/${migrationId}/map`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mappings }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to persist mappings.')
      }

      setSuccessMessage('Schema mappings synchronized and locked.')
      startTransition(() => {
        router.refresh()
      })
    } catch (error: any) {
      setErrorMessage(error.message || 'Error saving schema mappings.')
    } finally {
      setIsSaving(false)
    }
  }

  const isComplete = TARGET_FIELDS.filter((f) => f.required).every((f) => mappings[f.key])

  return (
    <div className="surface-glass rounded-2xl overflow-hidden shadow-glass-card">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] bg-slate-950/60 p-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 font-semibold">
            Genetec Synergis Schema Synchronizer
          </span>
          <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
            Physical Security Attribute Mapping
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Map legacy database columns into verified Genetec Security Center import targets.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !isComplete}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all shadow-glow-indigo active:scale-[0.98] ${
            isComplete
              ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60 shadow-none'
          }`}
        >
          {isSaving ? 'Synchronizing...' : 'Finalize & Lock Mappings'}
        </button>
      </div>

      {errorMessage && (
        <div className="m-6 rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs font-mono text-rose-300">
          ⚠️ {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="m-6 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs font-mono text-emerald-300">
          ✓ {successMessage}
        </div>
      )}

      {/* Field Mapping Rows */}
      <div className="p-6 space-y-3">
        {TARGET_FIELDS.map((field) => {
          const currentMap = mappings[field.key]
          const isAdvanced = typeof currentMap === 'object' && currentMap !== null

          return (
            <div
              key={field.key}
              className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl border p-4 transition-all ${
                currentMap
                  ? 'border-indigo-500/30 bg-slate-900/80 shadow-sm'
                  : 'border-slate-800/80 bg-slate-950/40'
              }`}
            >
              {/* TARGET SPECIFICATION */}
              <div className="lg:w-1/3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{field.label}</span>
                  {field.required ? (
                    <span className="rounded bg-rose-500/10 px-1.5 py-0.5 font-mono text-[10px] text-rose-400 border border-rose-500/20 font-semibold">
                      Required
                    </span>
                  ) : (
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                      Optional
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-slate-400">
                  <span className="text-indigo-400">Genetec: {field.key}</span>
                  <span className="text-slate-500">• {field.desc}</span>
                </div>
              </div>

              {/* CONNECTOR & SOURCE COLUMN CONTROL */}
              <div className="flex flex-1 items-center gap-2">
                {isAdvanced ? (
                  <div className="flex flex-1 items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-2 text-xs font-mono text-cyan-300">
                    <span className="truncate">
                      ★ {currentMap.sources ? currentMap.sources.join(` ${currentMap.separator || '+'} `) : field.key}
                    </span>
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
                  <div className="relative flex-1">
                    <select
                      value={currentMap || ''}
                      onChange={(e) => handleMapChange(field.key, e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-700/60 bg-slate-950 px-3.5 py-2 font-mono text-xs text-slate-200 outline-none focus:border-indigo-500"
                    >
                      <option value="">Select legacy column...</option>
                      {sourceColumns.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setActiveModal(field.key)}
                  className="rounded-xl border border-slate-700/60 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]"
                >
                  Merge Rule
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {activeModal && (
        <ConcatenationBuilder
          targetLabel={TARGET_FIELDS.find((f) => f.key === activeModal)?.label || ''}
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
