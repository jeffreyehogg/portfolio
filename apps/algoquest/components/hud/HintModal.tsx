'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lightbulb,
  Lock,
  Unlock,
  Check,
  Copy,
  X,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react'
import { Hint, Language } from '../../lib/quests/types'
import { useGameStore } from '../../lib/store'

interface HintModalProps {
  isOpen: boolean
  onClose: () => void
  hints: Hint[]
  levelId: string
  language: Language
}

const TIER_META: Record<
  number,
  { label: string; tag: string; description: string; color: string; badgeBg: string }
> = {
  1: {
    label: 'Tier 1: Gentle Nudge',
    tag: 'Nudge',
    description: 'A conceptual pointer to point you in the right direction.',
    color: 'emerald',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  2: {
    label: 'Tier 2: Logic Clue',
    tag: 'Logic Clue',
    description: 'Algorithmic outline and key logic structure.',
    color: 'cyan',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  },
  3: {
    label: 'Tier 3: Syntax Reveal',
    tag: 'Syntax Reveal',
    description: 'Full code snippet and syntactic solution.',
    color: 'amber',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  },
}

export function HintModal({
  isOpen,
  onClose,
  hints,
  levelId,
  language,
}: HintModalProps) {
  const hintsUnlocked = useGameStore((state) => state.hintsUnlocked[levelId] || 0)
  const unlockHint = useGameStore((state) => state.unlockHint)

  // Default to the highest unlocked tier, or Tier 1
  const [selectedTier, setSelectedTier] = useState<1 | 2 | 3>(1)
  const [copied, setCopied] = useState(false)

  // Sync selected tier when opening and auto-unlock Tier 1 if nothing is unlocked yet
  useEffect(() => {
    if (isOpen) {
      if (hintsUnlocked === 0) {
        unlockHint(levelId, 1)
        setSelectedTier(1)
      } else {
        setSelectedTier(Math.min(hintsUnlocked, 3) as 1 | 2 | 3)
      }
    }
  }, [isOpen, hintsUnlocked, levelId, unlockHint])

  const handleSelectTier = useCallback(
    (tier: 1 | 2 | 3) => {
      if (hintsUnlocked < tier) {
        unlockHint(levelId, tier)
      }
      setSelectedTier(tier)
    },
    [hintsUnlocked, levelId, unlockHint]
  )

  // Keyboard navigation: Escape to close, 1/2/3 to switch tiers
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === '1') {
        handleSelectTier(1)
      } else if (e.key === '2') {
        handleSelectTier(2)
      } else if (e.key === '3') {
        handleSelectTier(3)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, handleSelectTier])

  const currentHint = hints.find((h) => h.tier === selectedTier) || hints[selectedTier - 1]
  const isSelectedTierUnlocked = (hintsUnlocked || 1) >= selectedTier

  const handleUnlockCurrentTier = useCallback(() => {
    unlockHint(levelId, selectedTier)
  }, [levelId, selectedTier, unlockHint])

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const activeSnippet = currentHint?.codeSnippet
    ? currentHint.codeSnippet[language] || currentHint.codeSnippet.python
    : null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-white/[0.1] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hint-modal-title"
          >
            {/* Ambient header glow */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Header */}
            <div className="relative px-6 py-5 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h2
                    id="hint-modal-title"
                    className="text-lg font-bold text-white flex items-center gap-2"
                  >
                    Adventurer&apos;s Hint Codex
                  </h2>
                  <p className="text-xs text-slate-400">
                    3-Tier Progressive Guidance · Unlock incrementally at your pace
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close hints"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Beginner encouragement banner */}
            <div className="px-6 py-2.5 bg-emerald-950/30 border-b border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hints are 100% free! Click any tab or the button below to reveal guidance anytime.</span>
              </span>
              <span className="font-mono text-[11px] text-emerald-400/80">
                Unlocked: {Math.max(hintsUnlocked, 1)}/3
              </span>
            </div>

            {/* Progressive Tabs Navigation */}
            <div className="px-6 pt-4 border-b border-white/[0.08] bg-slate-950/40">
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950/80 rounded-xl border border-white/[0.06]">
                {([1, 2, 3] as const).map((tier) => {
                  const isUnlocked = hintsUnlocked >= tier
                  const isCurrent = selectedTier === tier
                  const meta = TIER_META[tier]

                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => handleSelectTier(tier)}
                      className={`relative flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
                        isCurrent
                          ? 'bg-slate-800 text-white shadow-sm border border-white/[0.1]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      {isUnlocked ? (
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      )}
                      <span className="truncate">{meta.tag}</span>
                      {isUnlocked ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      ) : (
                        <span className="text-[10px] px-1 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                          Reveal
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Hint Content Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              {/* Active Tier Metadata */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md border ${
                      TIER_META[selectedTier].badgeBg
                    }`}
                  >
                    Tier {selectedTier}
                  </span>
                  <span className="text-sm font-semibold text-slate-200">
                    {TIER_META[selectedTier].label}
                  </span>
                </div>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {TIER_META[selectedTier].description}
                </span>
              </div>

              {/* Locked vs Unlocked state */}
              {!isSelectedTierUnlocked ? (
                <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-950/50 p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                    <Lock className="w-6 h-6 text-amber-400" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">
                      Tier {selectedTier} Hint is Sealed
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      {selectedTier === 1
                        ? 'Unlock a gentle conceptual nudge to get your logic started.'
                        : selectedTier === 2
                        ? 'Unlock an algorithmic structure clue with step-by-step logic.'
                        : 'Unlock the exact code syntax solution tailored to ' +
                          (language === 'python' ? 'Python' : 'TypeScript') +
                          '.'}
                    </p>
                  </div>

                  <button
                    onClick={handleUnlockCurrentTier}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                  >
                    <Unlock className="w-4 h-4" />
                    Reveal Tier {selectedTier} Hint
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  {/* Hint Title & Description */}
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-white/[0.06] space-y-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      {currentHint?.title || 'Guidance Point'}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                      {currentHint?.description ||
                        'Read the objective carefully and observe tile positions on the grid.'}
                    </p>
                  </div>

                  {/* Code Snippet Box (if available) */}
                  {activeSnippet && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          Code Reference ({language === 'python' ? 'Python' : 'TypeScript'})
                        </span>
                        <button
                          onClick={() => handleCopyCode(activeSnippet)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-400" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="relative rounded-xl overflow-hidden border border-emerald-500/30 bg-slate-950 shadow-inner">
                        <div className="px-4 py-2 border-b border-white/[0.06] bg-slate-900/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span>snippet.{language === 'python' ? 'py' : 'ts'}</span>
                          <span className="text-emerald-400/80">Starter Reference</span>
                        </div>
                        <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed select-text">
                          <code>{activeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Next Tier Progression Prompt */}
                  {selectedTier < 3 && (
                    <div className="pt-3 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => {
                          const nextTier = (selectedTier + 1) as 2 | 3
                          unlockHint(levelId, nextTier)
                          setSelectedTier(nextTier)
                        }}
                        className={`w-full py-3 px-4 rounded-xl font-bold font-mono text-xs transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-[0.99] border ${
                          selectedTier === 1
                            ? 'bg-cyan-500/15 hover:bg-cyan-500/25 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                            : 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>
                          {selectedTier === 1
                            ? 'Reveal Tier 2: Logic Clue (Algorithmic Outline)'
                            : 'Reveal Tier 3: Syntax Reveal (Full Solution)'}
                        </span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  )}

                  {selectedTier === 3 && (
                    <div className="pt-3 border-t border-white/[0.08]">
                      <div className="py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Full solution revealed! Copy snippet or return to editor to test.</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/[0.08] bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
                <span>Tip: You can press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono border border-white/[0.08]">Esc</kbd> anytime to return to code.</span>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Back to Quest
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
