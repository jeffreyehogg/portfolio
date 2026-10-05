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
  BookOpen,
} from 'lucide-react'
import { WORLDS, getLevelById, Level } from '../lib/quests'
import { useGameStore, useGameStoreHydration } from '../lib/store'
import { UserProfileBadge } from '../components/auth/UserProfileBadge'

export default function WorldMapPage() {
  const hasHydrated = useGameStoreHydration()
  const {
    activeLanguage,
    setActiveLanguage,
    unlockedLevels,
    completedLevels,
    totalXp,
    streakDays,
  } = useGameStore()

  // Flat list of all 8 curriculum levels
  const allLevels = WORLDS.flatMap((w) => w.levelIds.map((id) => getLevelById(id))).filter(Boolean) as Level[]
  const totalLevelsCount = allLevels.length
  const completedCount = hasHydrated ? Object.keys(completedLevels).length : 0
  const progressPercent = Math.round((completedCount / totalLevelsCount) * 100)

  // Identify next playable level
  const nextPlayableLevel = hasHydrated
    ? allLevels.find(
        (lvl) => !completedLevels[lvl.id] && (unlockedLevels.includes(lvl.id) || lvl.id === 'level-1-first-step')
      ) || allLevels[0]
    : allLevels[0]

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/25 selection:text-emerald-200 overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 -right-40 w-[600px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 grid-board-pattern opacity-30" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-lg tracking-tight">AlgoQuest</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  WASM
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Interactive Coding Adventure
              </p>
            </div>
          </Link>

          {/* Language Switcher pill in header */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActiveLanguage('python')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activeLanguage === 'python'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🐍</span>
              <span className="hidden sm:inline">Python</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLanguage('typescript')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activeLanguage === 'typescript'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⚡</span>
              <span className="hidden sm:inline">TypeScript</span>
            </button>
          </div>

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

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 flex flex-col items-center">
        {/* Hero Section */}
        <div className="w-full text-center max-w-3xl mx-auto mb-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-wide uppercase mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free In-Browser Coding Quest</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight"
          >
            Code Your Hero Through the Dungeon.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Master variables, loops, stacks, and algorithms through engaging retro puzzles.
            Watch your code animate character steps and data structures in real time.
          </motion.p>

          {/* Primary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5"
          >
            <Link
              href={`/play/${nextPlayableLevel.id}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold font-mono text-base transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2.5 active:scale-[0.98] group"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>
                {completedCount === 0
                  ? 'Start Quest: Level 1 (The First Step)'
                  : `Continue: Level ${nextPlayableLevel.number} (${nextPlayableLevel.title})`}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <p className="text-xs font-mono text-slate-500">
            No sign-in required • Progress saves automatically to your browser
          </p>

          {/* Language Selector Banner */}
          <div className="mt-8 p-3 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl inline-flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Choose your coding language:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveLanguage('python')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  activeLanguage === 'python'
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>🐍 Python 3.12 (WASM)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLanguage('typescript')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  activeLanguage === 'typescript'
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>⚡ TypeScript</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3-Step "How It Works" Card Strip */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/[0.06] backdrop-blur-xl flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">1. Write Clean Code</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solve bite-sized objectives using real Python or TypeScript syntax directly in the lightweight editor.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/[0.06] backdrop-blur-xl flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-1">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">2. Live Canvas Simulation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Watch your hero walk across tiles, stacks physically rise and fall, and pointers converge in real time.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/[0.06] backdrop-blur-xl flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-1">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">3. Zero-Frustration Hints</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never get stuck. 3 progressive hint tiers (Gentle Nudge ➔ Logic Clue ➔ Full Syntax) are always 100% free.
            </p>
          </div>
        </div>

        {/* Overall Progress Bar Card */}
        <div className="w-full p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] backdrop-blur-xl mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Quest Curriculum Progress
              </span>
              <span className="text-emerald-400 font-bold">
                {completedCount} of {totalLevelsCount} Completed ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 border border-white/[0.06] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, 4)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
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

        {/* Curriculum Worlds Section */}
        <div className="w-full space-y-12">
          {WORLDS.map((world) => {
            const worldLevels = world.levelIds.map((id) => getLevelById(id)).filter(Boolean) as Level[]
            const worldCompletedCount = worldLevels.filter((lvl) => completedLevels[lvl.id]).length

            return (
              <section key={world.id} className="w-full">
                {/* World Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-300">
                      World {world.number}
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        {world.title}
                        <span className="text-xs font-mono font-normal text-slate-400 hidden sm:inline">
                          — {world.subtitle}
                        </span>
                      </h2>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {worldCompletedCount}/{worldLevels.length} Cleared
                  </span>
                </div>

                {/* Level Rows */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {worldLevels.map((lvl) => {
                    const isCompleted = Boolean(completedLevels[lvl.id])
                    const isUnlocked =
                      unlockedLevels.includes(lvl.id) ||
                      lvl.id === 'level-1-first-step' ||
                      isCompleted
                    const completedInfo = completedLevels[lvl.id]
                    const stars = completedInfo?.stars || 0
                    const isNextUp = nextPlayableLevel.id === lvl.id && !isCompleted

                    return (
                      <div
                        key={lvl.id}
                        className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                          isNextUp
                            ? 'bg-slate-900/95 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/40'
                            : isCompleted
                              ? 'bg-slate-900/80 border-emerald-500/30'
                              : isUnlocked
                                ? 'bg-slate-900/80 border-cyan-500/30 hover:border-cyan-400/50'
                                : 'bg-slate-950/50 border-slate-800/60 opacity-60'
                        }`}
                      >
                        <div>
                          {/* Card Top: Level Index & Status */}
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-xs font-mono font-bold text-slate-400">
                              Level {lvl.number}
                            </span>

                            {isCompleted ? (
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>DONE</span>
                              </div>
                            ) : isNextUp ? (
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold animate-pulse">
                                <span>NEXT UP</span>
                              </div>
                            ) : isUnlocked ? (
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-bold">
                                <span>READY</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700 text-[10px] font-mono font-medium">
                                <Lock className="w-3 h-3 text-slate-500" />
                                <span>LOCKED</span>
                              </div>
                            )}
                          </div>

                          {/* Level Title & Concept */}
                          <h3 className="text-sm font-bold text-white mb-1">{lvl.title}</h3>
                          <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-2">
                            {lvl.concept}
                          </span>
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                            {lvl.objective}
                          </p>
                        </div>

                        {/* Card Footer: Reward & Action */}
                        <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                          <div>
                            {isCompleted ? (
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3].map((s) => (
                                  <Star
                                    key={s}
                                    className={`w-3.5 h-3.5 ${
                                      s <= stars
                                        ? 'text-amber-400 fill-amber-400'
                                        : 'text-slate-700'
                                    }`}
                                  />
                                ))}
                              </div>
                            ) : (
                              <span className="text-[11px] font-mono text-amber-400 font-semibold flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />+{lvl.xp} XP
                              </span>
                            )}
                          </div>

                          {isUnlocked ? (
                            <Link
                              href={`/play/${lvl.id}`}
                              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1 active:scale-[0.98] ${
                                isNextUp
                                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                                  : isCompleted
                                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/[0.08]'
                                    : 'bg-emerald-600/90 hover:bg-emerald-500 text-white'
                              }`}
                            >
                              <span>{isCompleted ? 'Replay' : 'Play'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <span className="text-[11px] font-mono text-slate-600 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Locked
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        {/* Minimal Footer */}
        <footer className="w-full mt-20 pt-6 border-t border-white/[0.08] text-center text-xs font-mono text-slate-500 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-slate-400 flex-wrap justify-center">
            <span>Pyodide WASM</span>
            <span>•</span>
            <span>TypeScript Sandbox</span>
            <span>•</span>
            <span>CodeMirror 6</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Engineered by Jeff Hogg as an interactive learning module.
          </p>
        </footer>
      </main>
    </div>
  )
}
