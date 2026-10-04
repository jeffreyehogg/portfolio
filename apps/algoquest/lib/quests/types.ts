export type Language = 'python' | 'typescript'

export type TileType =
  | 'path'
  | 'stone'
  | 'lava'
  | 'wall'
  | 'bridge'
  | 'plate'
  | 'chest'
  | 'gate'
  | 'door'
  | 'water'
  | 'grass'
  | 'pedestal'

export interface GridEntity {
  id: string
  x: number
  y: number
  type: 'gem' | 'key' | 'potion' | 'chest' | 'gate' | 'torch' | 'door' | 'plate'
  collected?: boolean
}

export type VisualizerType = 'grid' | 'stack' | 'pointers' | 'array'

export interface GridConfig {
  width: number
  height: number
  heroStart: { x: number; y: number }
  heroDirection: 'north' | 'south' | 'east' | 'west'
  goal: { x: number; y: number }
  tiles: TileType[][]
  entities?: GridEntity[]
}

export interface VisualizerConfig {
  type: VisualizerType
  initialStack?: string[]
  initialPointers?: { left: number; right: number }
  initialArray?: string[]
  targetStack?: string[]
}

export interface Hint {
  tier: 1 | 2 | 3
  title: string
  description: string
  codeSnippet?: {
    python: string
    typescript: string
  }
}

export interface LevelTestCase {
  id: string
  name: string
  expected: any
  description?: string
}

export interface Level {
  id: string
  worldId: string
  number: number
  title: string
  subtitle: string
  concept: string
  badge: string
  xp: number
  objective: string
  instructions: string[]
  gridConfig: GridConfig
  visualizerConfig?: VisualizerConfig
  starterCode: {
    python: string
    typescript: string
  }
  solutionCode: {
    python: string
    typescript: string
  }
  hints: [Hint, Hint, Hint] // Strict 3-tier hints
  testCases: Array<{ id: string; name: string; expected: any; description?: string }>
  /* eslint-disable no-unused-vars */
  prepareCode: (userCode: string, language: Language) => string
  /* eslint-enable no-unused-vars */
}

export interface World {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  badge: string
  themeColor: string
  levelIds: string[]
}
