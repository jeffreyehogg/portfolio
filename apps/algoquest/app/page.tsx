'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Lock,
  CheckCircle2,
  Star,
  ArrowRight,
  Flame,
  Code2,
  Compass,
  Play,
  Lightbulb,
  Zap,
  RotateCcw,
} from 'lucide-react'
import { LEVELS, Level } from '../lib/quests'
import { useGameStore, useGameStoreHydration } from '../lib/store'
import { UserProfileBadge } from '../components/auth/UserProfileBadge'

export default function HomePage() {
  const hasHydrated = useGameStoreHydration()
  const {
    unlockedLevels,
    completedLevels,
    totalXp,
    streakDays,
  } = useGameStore()

  const totalLevelsCount = LEVELS.length
  const completedCount = hasHydrated ? Object.keys(completedLevels).length : 0
  const progressPercent = Math.round((completedCount / totalLevelsCount) * 100)

  // Identify next playable level (first uncompleted that is unlocked, or Level 1)
  const nextPlayableLevel: Level = hasHydrated
    ? LEVELS.find(
        (lvl) => !completedLevels[lvl.id] && (unlockedLevels.includes(lvl.id) || lvl.id === 'level-1-first-step')
      ) || LEVELS[0]
    : LEVELS[0]

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/25 selection:text-emerald-200 overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 -right-40 w-[600px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 grid-board-pattern opacity-25" />
      </div>

      {/* Clean Navigation Header - No Language Switcher or WASM Badges */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <span className="font-extrabold text-white text-lg tracking-tight">AlgoQuest</span>
          </Link>

          {/* XP & Profile */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{hasHydrated ? totalXp : 0} XP</span>
            </div>
            <UserProfileBadge />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center">
        {/* Simple & Bold Hero Section - No Green Pill Banners */}
        <div className="w-full text-center max-w-2xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight"
          >
            Learn to code by solving puzzles.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-8"
          >
            Eight interactive coding challenges. Write code to guide your hero across the dungeon,
            manipulate stacks, and master algorithms with live visual feedback.
          </motion.p>

          {/* Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-center justify-center gap-3"
          >
            <Link
              href={`/play/${nextPlayableLevel.id}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold font-mono text-base transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2.5 active:scale-[0.98] group"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>
                {completedCount === 0
                  ? 'Start Quest: Level 1 (The First Step)'
                  : `Continue: Level ${nextPlayableLevel.number} (${nextPlayableLevel.title})`}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </Link>

            <span className="text-xs font-mono text-slate-500">
              Free • No sign-up required • Saves progress automatically
            </span>
          </motion.div>
        </div>

        {/* Progress Strip */}
        <div className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-300 font-semibold">Your Progress</span>
              <span className="text-emerald-400 font-bold">
                {completedCount} of {totalLevelsCount} Completed ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 border border-white/[0.06] overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, 4)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/[0.06] text-xs font-mono text-amber-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{hasHydrated ? totalXp : 0} XP</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/[0.06] text-xs font-mono text-orange-400 font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-orange-400" />
              <span>{hasHydrated ? streakDays : 1}d Streak</span>
            </div>
          </div>
        </div>

        {/* Unified 8-Level Quest List (Clean, Linear & Minimal - No Worlds!) */}
        <div className="w-full space-y-3 mb-16">
          <div className="flex items-center justify-between px-1 mb-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400">
              Curriculum Challenges
            </h2>
            <span className="text-xs font-mono text-slate-500">8 Progressive Puzzles</span>
          </div>

          {LEVELS.map((lvl) => {
            const isCompleted = Boolean(completedLevels[lvl.id])
            const isUnlocked =
              unlockedLevels.includes(lvl.id) || lvl.id === 'level-1-first-step' || isCompleted
            const completedInfo = completedLevels[lvl.id]
            const stars = completedInfo?.stars || 3
            const isNextUp = nextPlayableLevel.id === lvl.id && !isCompleted

            return (
              <div
                key={lvl.id}
                className={`w-full p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isNextUp
                    ? 'bg-slate-900/95 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/40'
                    : isCompleted
                      ? 'bg-slate-900/70 border-emerald-500/25 hover:border-emerald-500/40'
                      : isUnlocked
                        ? 'bg-slate-900/70 border-white/[0.08] hover:border-cyan-500/40'
                        : 'bg-slate-950/40 border-white/[0.04] opacity-50'
                }`}
              >
                {/* Left: Status Icon, Number & Info */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  {/* Status Indicator Icon */}
                  <div className="mt-0.5 sm:mt-0 shrink-0">
                    {isCompleted ? (
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    ) : isNextUp ? (
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-pulse">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    ) : isUnlocked ? (
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-500">
                        <Lock className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Level Text Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Level {lvl.number}
                      </span>
                      <span className="text-slate-600 font-mono">•</span>
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/[0.06]">
                        {lvl.concept}
                      </span>
                      {isNextUp && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          NEXT UP
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight mb-0.5 truncate">
                      {lvl.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-1">
                      {lvl.objective}
                    </p>
                  </div>
                </div>

                {/* Right: Stars / Reward & Action Button */}
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                  {/* Rewards / Stars */}
                  <div>
                    {isCompleted ? (
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= stars
                                ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />+{lvl.xp} XP
                      </span>
                    )}
                  </div>

                  {/* Action Link */}
                  {isUnlocked ? (
                    <Link
                      href={`/play/${lvl.id}`}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-[0.98] ${
                        isNextUp
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                          : isCompleted
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/[0.08]'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <RotateCcw className="w-3 h-3 text-slate-400" />
                          <span>Replay</span>
                        </>
                      ) : (
                        <>
                          <span>Play</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </Link>
                  ) : (
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-600 text-xs font-mono flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* 3 Value Highlights */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/[0.06] flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">5 Modern Languages</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Code in Python, JavaScript, TypeScript, Ruby, or Lua with instant client-side execution.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/[0.06] flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Visual 2D Feedback</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Watch character steps, stack pillars, and dual-pointer arrows animate directly on screen.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/[0.06] flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Progressive Hints</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Gentle nudges, logic clues, and complete code snippets are available whenever you need guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Minimalist Footer */}
        <footer className="w-full pt-6 border-t border-white/[0.08] text-center text-xs font-mono text-slate-500 flex flex-col items-center gap-2">
          <p className="text-slate-500 text-[11px]">
            AlgoQuest • Interactive Algorithmic Puzzles
          </p>
        </footer>
      </main>
    </div>
  )
}
