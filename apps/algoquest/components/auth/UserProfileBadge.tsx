'use client'

import React from 'react'
import { User, Flame, Cloud } from 'lucide-react'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
import { useGameStore } from '../../lib/store'

export function UserProfileBadge() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { streakDays } = useGameStore()

  // If Clerk is still loading or in guest mode
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        {/* Streak indicator */}
        <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium">
          <Flame className="w-3.5 h-3.5 fill-orange-400" />
          <span>{streakDays}d</span>
        </div>

        {/* 1-click Sign in to sync */}
        <SignInButton mode="modal">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/[0.08] text-xs font-mono transition-all active:scale-[0.98]"
            title="Guest Mode (Saved in LocalStorage) - Sign in to sync to cloud"
          >
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Guest</span>
            <span className="text-[10px] text-indigo-400 font-semibold bg-indigo-500/10 px-1 rounded border border-indigo-500/20">
              Sync
            </span>
          </button>
        </SignInButton>
      </div>
    )
  }

  // Signed in with Clerk
  return (
    <div className="flex items-center gap-2">
      {/* Streak */}
      <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium">
        <Flame className="w-3.5 h-3.5 fill-orange-400" />
        <span>{streakDays}d</span>
      </div>

      {/* Cloud synced badge */}
      <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
        <Cloud className="w-3 h-3 text-emerald-400" />
        <span>Synced</span>
      </div>

      {/* Clerk User avatar */}
      <div className="flex items-center gap-1.5 pl-1">
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-7 h-7 border border-indigo-500/40 rounded-full',
            },
          }}
        />
        <span className="hidden lg:inline text-xs font-mono text-slate-300 font-medium">
          {user?.firstName || 'Adventurer'}
        </span>
      </div>
    </div>
  )
}
