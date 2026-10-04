export type Language = 'python' | 'typescript'

export type StepEventType = 'step' | 'jump' | 'collect' | 'at_goal' | 'turn' | 'log'

export interface StepEvent {
  type: StepEventType
  timestamp: number
  data?: {
    direction?: string
    position?: { x: number; y: number }
    item?: string
    message?: string
    [key: string]: unknown
  }
}

export interface TestCase {
  id: string | number
  name?: string
  input?: unknown
  expected?: unknown
  hidden?: boolean
  description?: string
}

export interface TestCaseResult {
  id: string | number
  name?: string
  passed: boolean
  input?: unknown
  expected?: unknown
  actual?: unknown
  error?: string
  executionTimeMs?: number
}

export interface GridState {
  position?: { x: number; y: number }
  direction?: 'north' | 'south' | 'east' | 'west' | string
  grid?: unknown
  inventory?: string[]
  goal?: { x: number; y: number }
  items?: Array<{ id: string; x: number; y: number; type: string }>
  [key: string]: unknown
}

export interface ExecutionRequest {
  requestId: string
  language: Language
  code: string
  testCases?: TestCase[]
  initialState?: GridState
  timeoutMs?: number
}

export interface ErrorDetails {
  line?: number
  column?: number
  type?: string
  message: string
}

export interface ExecutionResult {
  requestId: string
  success: boolean
  output: string[]
  steps: StepEvent[]
  testResults: TestCaseResult[]
  allTestsPassed: boolean
  executionTimeMs: number
  error?: string
  errorDetails?: ErrorDetails
}

export type WorkerInMessage =
  | { type: 'INIT' }
  | { type: 'EXECUTE'; payload: ExecutionRequest }

export type WorkerOutMessage =
  | { type: 'READY'; language: Language }
  | { type: 'STDOUT'; text: string }
  | { type: 'STEP'; step: StepEvent }
  | { type: 'RESULT'; payload: ExecutionResult }
  | { type: 'ERROR'; error: string }
