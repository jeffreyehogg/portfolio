'use client'

import { useState, useEffect } from 'react'

interface ConcatenationBuilderProps {
  targetLabel: string
  sourceColumns: string[]
  onClose: () => void
  onSave: (rule: {
    type: 'concatenate'
    sources: string[]
    separator: string
  }) => void
}

export default function ConcatenationBuilder({
  targetLabel,
  sourceColumns,
  onClose,
  onSave,
}: ConcatenationBuilderProps) {
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [separator, setSeparator] = useState(' ')

  // Escape key handler for WCAG 2.1.2 compliance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const toggleSource = (col: string) => {
    setSelectedSources((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    )
  }

  const PRESET_DELIMITERS = [
    { label: 'Space', val: ' ' },
    { label: 'Dash (-)', val: '-' },
    { label: 'Colon (:)', val: ':' },
    { label: 'Underscore (_)', val: '_' },
    { label: 'None', val: '' },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="concat-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
    >
      <div className="surface-glass max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-white/[0.1] text-slate-200">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
          <div>
            <span className="text-xs text-indigo-400 font-medium">
              Field concatenation builder
            </span>
            <h3 id="concat-modal-title" className="text-base font-semibold text-white">
              Merge columns for &quot;{targetLabel}&quot;
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-base font-medium"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Select multiple legacy source columns to synthesize into the Genetec schema.
        </p>

        <div className="space-y-4">
          {/* Source Columns Multi-select Grid */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Available legacy columns (click to select):
            </label>
            <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/80 p-2 grid grid-cols-2 gap-1.5">
              {sourceColumns.map((col) => {
                const isSelected = selectedSources.includes(col)
                return (
                  <button
                    key={col}
                    type="button"
                    onClick={() => toggleSource(col)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all text-left border ${
                      isSelected
                        ? 'border-indigo-500/50 bg-indigo-600/30 text-indigo-200 font-semibold'
                        : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{col}</span>
                    {isSelected && <span className="text-cyan-400 font-bold ml-1">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Separator / Delimiter Settings with Quick Preset Pills */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Delimiter string:
            </label>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {PRESET_DELIMITERS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setSeparator(preset.val)}
                  className={`rounded-lg px-2 py-0.5 text-xs font-mono border transition-all ${
                    separator === preset.val
                      ? 'border-cyan-500/50 bg-cyan-950/60 text-cyan-300 font-semibold'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              placeholder="Custom delimiter (e.g. ' - ')"
              className="w-full rounded-xl border border-slate-700/60 bg-slate-950 px-3 py-1.5 font-mono text-xs text-slate-200 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Live Reactive Preview Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs">
            <span className="text-[10px] text-slate-500 block mb-1">
              Live preview:
            </span>
            <div className="text-cyan-300 truncate">
              {selectedSources.length > 0
                ? selectedSources.map((s) => `{${s}}`).join(separator || '')
                : 'Select 2 or more columns above'}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex justify-end items-center gap-3 border-t border-white/[0.08] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={selectedSources.length < 2}
            onClick={() =>
              onSave({
                type: 'concatenate',
                sources: selectedSources,
                separator,
              })
            }
            className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-glow-indigo transition-all hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            Apply concatenation rule
          </button>
        </div>
      </div>
    </div>
  )
}
