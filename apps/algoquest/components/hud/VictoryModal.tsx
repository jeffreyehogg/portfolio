'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Star, Sparkles, ArrowRight, RotateCcw, Map, Award, X } from 'lucide-react'
import Link from 'next/link'
import { Level } from '../../lib/quests/types'

interface VictoryModalProps {
  isOpen: boolean
  level: Level
  stars?: number
  xpAwarded?: number
  nextLevelId?: string | null
  onReplay: () => void
  onNextLevel: () => void
  onClose: () => void
}

export function VictoryModal({
  isOpen,
  level,
  stars = 3,
  xpAwarded = 100,
  nextLevelId,
  onReplay,
  onNextLevel,
  onClose,
}: VictoryModalProps) {
  // Fire celebratory confetti cannons
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#34d399', '#fbbf24', '#a855f7'],
        })
      } catch {
        // Safe fallback if canvas-confetti is unavailable
      }
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-md rounded-3xl bg-slate-900/95 border border-amber-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.2)] text-center overflow-hidden"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-white/[0.06]"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Ambient gold glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />

            {/* Victory Badge Header */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 18 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 mx-auto mb-4 shadow-[0_0_25px_rgba(251,191,36,0.5)] flex items-center justify-center"
            >
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-amber-300 fill-amber-300/30" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white tracking-tight"
            >
              Quest Conquered!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-xs font-mono text-slate-400 mt-1 mb-5"
            >
              Level {level.number}: {level.title} — {level.concept}
            </motion.p>

            {/* 3-Star Rating Animation */}
            <div className="flex items-center justify-center gap-3 my-4">
              {[1, 2, 3].map((starIdx) => (
                <motion.div
                  key={`star-${starIdx}`}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: starIdx <= stars ? 1 : 0.8, rotate: 0 }}
                  transition={{ delay: 0.3 + starIdx * 0.12, type: 'spring', stiffness: 300 }}
                  className="relative"
                >
                  <Star
                    className={`w-9 h-9 transition-colors ${
                      starIdx <= stars
                        ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                        : 'text-slate-700 fill-slate-800'
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Reward Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-sm font-bold my-3 shadow-inner"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>+{xpAwarded} XP Earned</span>
            </motion.div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col gap-2.5 mt-6">
              {nextLevelId ? (
                <button
                  type="button"
                  onClick={onNextLevel}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold font-mono text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <span>Continue to Next Level</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              ) : (
                <Link
                  href="/"
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-bold font-mono text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Map className="w-4 h-4" />
                  <span>Return to World Map</span>
                </Link>
              )}

              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={onReplay}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs font-medium transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] border border-white/[0.06]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Level</span>
                </button>

                <Link
                  href="/"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs font-medium transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] border border-white/[0.06]"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>World Map</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
