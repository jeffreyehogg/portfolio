import {
  ExecutionRequest,
  ExecutionResult,
  Language,
  StepEvent,
  WorkerOutMessage,
  ErrorDetails,
} from './types'

/* eslint-disable no-unused-vars */
export interface RunnerCallbacks {
  onStdout?: (text: string) => void
  onStep?: (step: StepEvent) => void
  onReady?: (language: Language) => void
}
/* eslint-enable no-unused-vars */

/**
 * Friendly error message cleaner
 */
function cleanErrorMessage(rawError: string, language: Language): ErrorDetails {
  if (language === 'python') {
    const lines = rawError.trim().split('\n')
    const lastLine = lines[lines.length - 1] || 'Python runtime error'

    let errorType = 'RuntimeError'
    let message = lastLine

    const colonIdx = lastLine.indexOf(':')
    if (colonIdx > 0 && !lastLine.startsWith(' ')) {
      errorType = lastLine.slice(0, colonIdx).trim()
      message = lastLine.slice(colonIdx + 1).trim()
    }

    const lineMatch = rawError.match(/line\s+(\d+)/i)
    const line = lineMatch && lineMatch[1] ? parseInt(lineMatch[1], 10) : undefined

    return {
      type: errorType,
      message,
      line,
    }
  } else {
    // JavaScript / TypeScript error cleaning
    let message = rawError
    let errorType = 'Error'

    const colonIdx = rawError.indexOf(':')
    if (colonIdx > 0 && !rawError.startsWith(' ')) {
      errorType = rawError.slice(0, colonIdx).trim()
      message = rawError.slice(colonIdx + 1).trim()
    }

    const lineMatch = rawError.match(/(?:line|:)\s*(\d+)/i)
    const line = lineMatch && lineMatch[1] ? parseInt(lineMatch[1], 10) : undefined

    return {
      type: errorType,
      message,
      line,
    }
  }
}

/**
 * ExecutionRunner manages Web Worker instances for in-browser sandboxed execution.
 */
export class ExecutionRunner {
  private activeWorkers: Map<Language, Worker | null> = new Map()
  private activeTimeouts: Map<string, ReturnType<typeof setTimeout>> = new Map()

  /**
   * Spawns or returns existing worker instance for requested language
   */
  private getWorker(language: Language): Worker {
    if (typeof window === 'undefined') {
      throw new Error('Execution runner can only run in a browser environment')
    }

    let worker = this.activeWorkers.get(language)
    if (!worker) {
      const workerUrl =
        language === 'python'
          ? '/workers/pyodide-worker.js'
          : '/workers/ts-worker.js'

      worker = new Worker(workerUrl)
      this.activeWorkers.set(language, worker)
    }

    return worker
  }

  /**
   * Terminate active worker for a specific language (e.g. after infinite loop or timeout)
   */
  public terminate(language?: Language) {
    if (language) {
      const worker = this.activeWorkers.get(language)
      if (worker) {
        worker.terminate()
        this.activeWorkers.set(language, null)
      }
    } else {
      for (const [lang, worker] of this.activeWorkers.entries()) {
        if (worker) {
          worker.terminate()
          this.activeWorkers.set(lang, null)
        }
      }
    }
  }

  /**
   * Pre-warm / initialize worker runtime (e.g. trigger Pyodide download in background)
   */
  public preload(language: Language): void {
    if (typeof window === 'undefined') return
    try {
      const worker = this.getWorker(language)
      worker.postMessage({ type: 'INIT' })
    } catch {
      // Ignore background preload errors
    }
  }

  /**
   * Executes user code inside the language-specific Web Worker
   */
  public execute(
    request: ExecutionRequest,
    callbacks?: RunnerCallbacks
  ): Promise<ExecutionResult> {
    return new Promise((resolve) => {
      const startTime = performance.now()
      const timeoutMs = request.timeoutMs || 4000
      let isResolved = false

      if (typeof window === 'undefined') {
        resolve({
          requestId: request.requestId,
          success: false,
          output: [],
          steps: [],
          testResults: [],
          allTestsPassed: false,
          executionTimeMs: 0,
          error: 'Execution cannot run on server',
        })
        return
      }

      let worker: Worker
      try {
        worker = this.getWorker(request.language)
      } catch (err) {
        resolve({
          requestId: request.requestId,
          success: false,
          output: [],
          steps: [],
          testResults: [],
          allTestsPassed: false,
          executionTimeMs: 0,
          error: err instanceof Error ? err.message : String(err),
        })
        return
      }

      // Hard timeout enforcement to protect against infinite loops
      const timeoutTimer = setTimeout(() => {
        if (isResolved) return
        isResolved = true

        // Forcibly kill worker thread
        this.terminate(request.language)

        const executionTimeMs = Math.round(performance.now() - startTime)
        const timeoutError = `Execution timed out after ${timeoutMs}ms. Check for infinite loops or deep recursion.`

        resolve({
          requestId: request.requestId,
          success: false,
          output: [],
          steps: [],
          testResults: [],
          allTestsPassed: false,
          executionTimeMs,
          error: timeoutError,
          errorDetails: {
            type: 'TimeoutError',
            message: timeoutError,
          },
        })
      }, timeoutMs)

      this.activeTimeouts.set(request.requestId, timeoutTimer)

      // Temporary listener for this execution
      const messageHandler = (e: MessageEvent<WorkerOutMessage>) => {
        const data = e.data
        if (!data) return

        switch (data.type) {
          case 'READY':
            callbacks?.onReady?.(data.language)
            break

          case 'STDOUT':
            callbacks?.onStdout?.(data.text)
            break

          case 'STEP':
            callbacks?.onStep?.(data.step)
            break

          case 'RESULT':
            if (data.payload.requestId === request.requestId) {
              cleanup()
              resolve(data.payload)
            }
            break

          case 'ERROR': {
            cleanup()
            const errorDetails = cleanErrorMessage(data.error, request.language)
            resolve({
              requestId: request.requestId,
              success: false,
              output: [],
              steps: [],
              testResults: [],
              allTestsPassed: false,
              executionTimeMs: Math.round(performance.now() - startTime),
              error: data.error,
              errorDetails,
            })
            break
          }
        }
      }

      const errorHandler = (err: ErrorEvent) => {
        cleanup()
        const errMsg = err.message || 'Worker execution error'
        const errorDetails = cleanErrorMessage(errMsg, request.language)
        resolve({
          requestId: request.requestId,
          success: false,
          output: [],
          steps: [],
          testResults: [],
          allTestsPassed: false,
          executionTimeMs: Math.round(performance.now() - startTime),
          error: errMsg,
          errorDetails,
        })
      }

      const cleanup = () => {
        isResolved = true
        clearTimeout(timeoutTimer)
        this.activeTimeouts.delete(request.requestId)
        worker.removeEventListener('message', messageHandler)
        worker.removeEventListener('error', errorHandler)
      }

      worker.addEventListener('message', messageHandler)
      worker.addEventListener('error', errorHandler)

      // Dispatch execution payload to worker
      worker.postMessage({
        type: 'EXECUTE',
        payload: request,
      })
    })
  }
}

// Global runner singleton for standard usage
export const executionRunner = new ExecutionRunner()

/**
 * Standalone convenience execution function
 */
export async function executeCode(
  request: ExecutionRequest,
  callbacks?: RunnerCallbacks
): Promise<ExecutionResult> {
  return executionRunner.execute(request, callbacks)
}
