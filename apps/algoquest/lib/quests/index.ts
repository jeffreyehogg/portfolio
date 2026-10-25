import { Level, World } from './types'
import { WORLD_1, WORLD_1_LEVELS } from './world1-basics'
import { WORLD_2, WORLD_2_LEVELS } from './world2-loops'
import { WORLD_3, WORLD_3_LEVELS } from './world3-data'
import { WORLD_4, WORLD_4_LEVELS } from './world4-algorithms'

export * from './types'
export { WORLD_1, WORLD_1_LEVELS } from './world1-basics'
export { WORLD_2, WORLD_2_LEVELS } from './world2-loops'
export { WORLD_3, WORLD_3_LEVELS } from './world3-data'
export { WORLD_4, WORLD_4_LEVELS } from './world4-algorithms'

export const WORLDS: World[] = [WORLD_1, WORLD_2, WORLD_3, WORLD_4]

export const LEVELS: Level[] = [
  ...WORLD_1_LEVELS,
  ...WORLD_2_LEVELS,
  ...WORLD_3_LEVELS,
  ...WORLD_4_LEVELS,
]

export function getAllWorlds(): World[] {
  return WORLDS
}

export function getAllLevels(): Level[] {
  return LEVELS
}

export function getLevelById(id: string): Level | undefined {
  return LEVELS.find((lvl) => lvl.id === id)
}

export function getNextLevelId(currentId: string): string | null {
  const currentIndex = LEVELS.findIndex((lvl) => lvl.id === currentId)
  if (currentIndex === -1 || currentIndex >= LEVELS.length - 1) {
    return null
  }
  return LEVELS[currentIndex + 1].id
}

export function getPreviousLevelId(currentId: string): string | null {
  const currentIndex = LEVELS.findIndex((lvl) => lvl.id === currentId)
  if (currentIndex <= 0) {
    return null
  }
  return LEVELS[currentIndex - 1].id
}
