'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useEffect, useState } from 'react'
import { Language } from '../quests/types'
import { getNextLevelId, WORLDS } from '../quests'

export interface CompletedLevelInfo {
  stars: number
  completedAt: number
  bestCode?: string
}

export interface GameState {
  // State variables
  currentLevelId: string
  activeLanguage: Language
  unlockedLevels: string[]
  completedLevels: Record<string, CompletedLevelInfo>
  levelDrafts: Record<string, Record<Language, string>>
  hintsUnlocked: Record<string, number>
  totalXp: number
  streakDays: number
  badges: string[]
  isGuest: boolean
  lastPlayedAt: number
  hasHydrated: boolean

  // Actions
  /* eslint-disable no-unused-vars */
  setActiveLanguage: (lang: Language) => void
  setCurrentLevelId: (levelId: string) => void
  unlockLevel: (levelId: string) => void
  completeLevel: (levelId: string, stars: number, xpAwarded: number, code?: string) => void
  saveDraft: (levelId: string, lang: Language, code: string) => void
  getDraft: (levelId: string, lang: Language) => string
  unlockHint: (levelId: string, tier: 1 | 2 | 3) => void
  getUnlockedHintTier: (levelId: string) => number
  resetLevelProgress: (levelId: string) => void
  resetAllProgress: () => void
  setHasHydrated: (hasHydrated: boolean) => void
  /* eslint-enable no-unused-vars */
}

const DEFAULT_STATE = {
  currentLevelId: 'level-1-first-step',
  activeLanguage: 'python' as Language,
  unlockedLevels: ['level-1-first-step'],
  completedLevels: {} as Record<string, CompletedLevelInfo>,
  levelDrafts: {} as Record<string, Record<Language, string>>,
  hintsUnlocked: {} as Record<string, number>,
  totalXp: 0,
  streakDays: 1,
  badges: [] as string[],
  isGuest: true,
  lastPlayedAt: Date.now(),
  hasHydrated: false,
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      setActiveLanguage: (lang: Language) => set({ activeLanguage: lang }),

      setCurrentLevelId: (levelId: string) => set({ currentLevelId: levelId }),

      unlockLevel: (levelId: string) =>
        set((state) => {
          if (state.unlockedLevels.includes(levelId)) return state
          return {
            unlockedLevels: [...state.unlockedLevels, levelId],
          }
        }),

      completeLevel: (levelId: string, stars: number, xpAwarded: number, code?: string) =>
        set((state) => {
          const existing = state.completedLevels[levelId]
          const isFirstCompletion = !existing
          const newStars = existing ? Math.max(existing.stars, stars) : stars

          const newCompletedLevels = {
            ...state.completedLevels,
            [levelId]: {
              stars: newStars,
              completedAt: Date.now(),
              bestCode: code || existing?.bestCode,
            },
          }

          // XP award
          const newXp = isFirstCompletion ? state.totalXp + xpAwarded : state.totalXp

          // Unlock next level if present
          const nextId = getNextLevelId(levelId)
          const newUnlockedLevels =
            nextId && !state.unlockedLevels.includes(nextId)
              ? [...state.unlockedLevels, nextId]
              : state.unlockedLevels

          // Streak calculation
          const now = Date.now()
          const oneDayMs = 24 * 60 * 60 * 1000
          const daysDiff = Math.floor(now / oneDayMs) - Math.floor(state.lastPlayedAt / oneDayMs)
          let newStreak = state.streakDays
          if (daysDiff === 1) {
            newStreak = state.streakDays + 1
          } else if (daysDiff > 1) {
            newStreak = 1
          }

          // Badges award
          const newBadges = [...state.badges]
          if (!newBadges.includes('first_step')) {
            newBadges.push('first_step')
          }

          for (const world of WORLDS) {
            if (
              !newBadges.includes(world.badge) &&
              world.levelIds.every((id) => id === levelId || !!newCompletedLevels[id])
            ) {
              newBadges.push(world.badge)
            }
          }

          return {
            completedLevels: newCompletedLevels,
            unlockedLevels: newUnlockedLevels,
            totalXp: newXp,
            streakDays: newStreak,
            badges: newBadges,
            lastPlayedAt: now,
          }
        }),

      saveDraft: (levelId: string, lang: Language, code: string) =>
        set((state) => ({
          levelDrafts: {
            ...state.levelDrafts,
            [levelId]: {
              ...(state.levelDrafts[levelId] || { python: '', typescript: '' }),
              [lang]: code,
            },
          },
        })),

      getDraft: (levelId: string, lang: Language) => {
        return get().levelDrafts[levelId]?.[lang] || ''
      },

      unlockHint: (levelId: string, tier: 1 | 2 | 3) =>
        set((state) => ({
          hintsUnlocked: {
            ...state.hintsUnlocked,
            [levelId]: Math.max(state.hintsUnlocked[levelId] || 0, tier),
          },
        })),

      getUnlockedHintTier: (levelId: string) => {
        return get().hintsUnlocked[levelId] || 0
      },

      resetLevelProgress: (levelId: string) =>
        set((state) => {
          const nextCompleted = { ...state.completedLevels }
          delete nextCompleted[levelId]
          const nextDrafts = { ...state.levelDrafts }
          delete nextDrafts[levelId]
          const nextHints = { ...state.hintsUnlocked }
          delete nextHints[levelId]
          return {
            completedLevels: nextCompleted,
            levelDrafts: nextDrafts,
            hintsUnlocked: nextHints,
          }
        }),

      resetAllProgress: () =>
        set({
          ...DEFAULT_STATE,
          lastPlayedAt: Date.now(),
          hasHydrated: true,
        }),

      setHasHydrated: (hasHydrated: boolean) => set({ hasHydrated }),
    }),
    {
      name: 'algoquest-game-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
      partialize: (state) => ({
        currentLevelId: state.currentLevelId,
        activeLanguage: state.activeLanguage,
        unlockedLevels: state.unlockedLevels,
        completedLevels: state.completedLevels,
        levelDrafts: state.levelDrafts,
        hintsUnlocked: state.hintsUnlocked,
        totalXp: state.totalXp,
        streakDays: state.streakDays,
        badges: state.badges,
        isGuest: state.isGuest,
        lastPlayedAt: state.lastPlayedAt,
      }),
    }
  )
)

/**
 * React hook to safely wait for client store hydration before rendering stateful UI
 */
export function useGameStoreHydration(): boolean {
  const [mounted, setMounted] = useState(false)
  const hasHydrated = useGameStore((state) => state.hasHydrated)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && hasHydrated
}
