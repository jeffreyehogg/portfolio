'use client'

import React from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  Sparkles,
  Lightbulb,
} from 'lucide-react'
import { Level, World, Language } from '../../lib/quests/types'
import { useGameStore } from '../../lib/store'
import { UserProfileBadge } from '../auth/UserProfileBadge'

interface LevelNavBarProps {
  level: Level
  world?: World
  onOpenHint: () => void
  language?: Language
  // eslint-disable-next-line no-unused-vars
  onLanguageChange?: (lang: Language) => void
}

export function LevelNavBar({
  level,
  onOpenHint,
}: LevelNavBarProps) {
  const { totalXp, hintsUnlocked } = useGameStore()
  const unlockedTier = hintsUnlocked[level.id] || 0

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.08] select-none">
      {/* Left: Back to Challenges & Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/[0.06] text-xs font-mono font-medium transition-all active:scale-[0.98]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>All Quests</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-slate-600 font-mono hidden sm:inline">/</span>
          <span className="text-xs font-mono font-semibold text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-white/[0.08]">
            Level {level.number}: {level.title}
          </span>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 hidden sm:inline">
            {level.concept}
          </span>
        </div>
      </div>

      {/* Right: XP, Hints & Profile Badge */}
      <div className="flex items-center gap-2.5">
        {/* Hint Trigger Button */}
        <button
          type="button"
          onClick={onOpenHint}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 active:scale-[0.98] border ${
            unlockedTier > 0
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-white/[0.06]'
          }`}
        >
          <Lightbulb className={`w-3.5 h-3.5 ${unlockedTier > 0 ? 'text-amber-400' : 'text-slate-400'}`} />
          <span>Hints</span>
          {unlockedTier > 0 && (
            <span className="text-[10px] px-1 rounded bg-amber-500/20 text-amber-300 font-bold">
              T{unlockedTier}
            </span>
          )}
        </button>

        {/* XP Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold shadow-[0_0_10px_rgba(245,158,11,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{totalXp} XP</span>
        </div>

        {/* User Profile Badge */}
        <UserProfileBadge />
      </div>
    </header>
  )
}
