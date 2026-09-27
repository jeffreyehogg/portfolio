'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NewMigrationButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const sourceSystem = formData.get('sourceSystem')

    try {
      const res = await fetch('/api/migrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, sourceSystem }),
      })

      if (res.ok) {
        const data = await res.json()
        router.refresh()
        setIsOpen(false)
        router.push(`/dashboard/migration/${data.id}`)
      } else {
        const err = await res.json()
        setErrorMessage(err.error || 'Failed to create migration pipeline.')
      }
    } catch {
      setErrorMessage('Network error occurred while connecting to database.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setErrorMessage(null)
          setIsOpen(true)
        }}
        type="button"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-glow-indigo transition-all hover:bg-indigo-500 active:scale-[0.98]"
      >
        <span className="text-sm leading-none">+</span>
        <span>New Migration Project</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-migration-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <div className="surface-glass max-w-md w-full rounded-2xl p-6 shadow-2xl border border-white/[0.1] text-slate-200">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                  PACS Middleware Pipeline
                </span>
                <h3 id="new-migration-title" className="text-base font-bold text-white">
                  Initialize Migration Project
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            {errorMessage && (
              <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs font-mono text-rose-300">
                ⚠️ {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="project-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project / Site Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Dallas HQ OnGuard to Genetec Cutover"
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-950 px-3.5 py-2 font-mono text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="source-system" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Legacy Source Physical Access System
                </label>
                <select
                  id="source-system"
                  name="sourceSystem"
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-950 px-3.5 py-2 font-mono text-xs text-slate-200 outline-none focus:border-indigo-500"
                >
                  <option value="Lenel OnGuard">Lenel OnGuard (v7.5 - v8.2)</option>
                  <option value="DNA Fusion">Open Options DNA Fusion</option>
                  <option value="AMAG Symmetry">AMAG Technology Symmetry</option>
                  <option value="Software House CCURE">Software House C•CURE 9000</option>
                  <option value="Brivo Access">Brivo Access / OnAir</option>
                  <option value="Other PACS CSV">Other / Generic PACS CSV</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-white/[0.08] pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-glow-indigo transition-all hover:bg-indigo-500 disabled:opacity-50 active:scale-[0.98]"
                >
                  {isLoading ? 'Provisioning...' : 'Create Pipeline'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}