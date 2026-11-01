import {
  ExecutionRequest,
  ExecutionResult,
  Language,
  StepEvent,
  WorkerOutMessage,
  ErrorDetails,
  WasmBenchmarkTelemetry,
} from './types'

interface AlgoQuestWasmExports extends WebAssembly.Exports {
  memory: WebAssembly.Memory
  // eslint-disable-next-line no-unused-vars
  wasm_alloc: (len: number) => number
  // eslint-disable-next-line no-unused-vars
  wasm_dealloc: (ptr: number, len: number) => void
  // eslint-disable-next-line no-unused-vars
  run_stress_benchmark_wasm: (ptr: number, len: number) => bigint
}

let cachedWasmExports: AlgoQuestWasmExports | null = null
let cachedWasmSizeKb = 138

async function runClientRustWasmBenchmark(
  levelHint: string
): Promise<WasmBenchmarkTelemetry | undefined> {
  if (typeof window === 'undefined' || typeof WebAssembly === 'undefined') {
    return undefined
  }
  try {
    if (!cachedWasmExports) {
      const res = await fetch('/wasm/algoquest_core.wasm')
      const bytes = await res.arrayBuffer()
      cachedWasmSizeKb = Math.round(bytes.byteLength / 1024)
      const instantiated = (await WebAssembly.instantiate(bytes, {})) as unknown as {
        instance: WebAssembly.Instance
      }
      cachedWasmExports = instantiated.instance.exports as AlgoQuestWasmExports
    }
    const exports = cachedWasmExports
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const encoded = encoder.encode(levelHint)
    const inPtr = exports.wasm_alloc(encoded.length)
    new Uint8Array(exports.memory.buffer, inPtr, encoded.length).set(encoded)

    const t0 = performance.now()
    const packed = exports.run_stress_benchmark_wasm(inPtr, encoded.length)
    const elapsedUs = Math.max(12, Math.round((performance.now() - t0) * 1000))
    exports.wasm_dealloc(inPtr, encoded.length)

    const packedBig = BigInt(packed)
    const outPtr = Number((packedBig >> BigInt(32)) & BigInt(0xffffffff))
    const outLen = Number(packedBig & BigInt(0xffffffff))
    const jsonStr = decoder.decode(new Uint8Array(exports.memory.buffer, outPtr, outLen))
    exports.wasm_dealloc(outPtr, outLen)

    const parsed = JSON.parse(jsonStr)
    return {
      engine: 'rust-wasm',
      operationName: parsed.operationName || 'Spatial Grid Collision & Path Sim (100k Steps)',
      iterations: parsed.iterations || 100000,
      executionTimeUs: elapsedUs,
      opsPerSecond: Math.round(((parsed.iterations || 100000) / elapsedUs) * 1_000_000),
      wasmBinarySizeKb: cachedWasmSizeKb,
    }
  } catch {
    return undefined
  }
}

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
  } else if (language === 'ruby') {
    let line: number | undefined
    let message = rawError
    let type = 'RubyError'

    const lineMatch = rawError.match(/eval:(\d+):/i)
    if (lineMatch && lineMatch[1]) {
      line = parseInt(lineMatch[1], 10)
    }

    const typeMatch = rawError.match(/\(([A-Za-z0-9_:]+Error)\)/)
    if (typeMatch && typeMatch[1]) {
      type = typeMatch[1]
    }

    const colonIdx = rawError.indexOf("': ")
    if (colonIdx > 0) {
      message = rawError.slice(colonIdx + 3).replace(/\s*\([A-Za-z0-9_:]+\).*/s, '').trim()
    }

    return {
      type,
      message,
      line,
    }
  } else if (language === 'lua') {
    let line: number | undefined
    let message = rawError

    const match = rawError.match(/\[string\s+[^\]]+\]:(\d+):\s*(.*)/s)
    if (match) {
      line = parseInt(match[1], 10)
      message = match[2].trim()
    }

    return {
      type: 'LuaError',
      message,
      line,
    }
  } else if (language === 'rust') {
    let errorType = 'rustc[Error]'
    let message = rawError
    const colonIdx = rawError.indexOf(':')
    if (colonIdx > 0 && !rawError.startsWith(' ')) {
      errorType = rawError.slice(0, colonIdx).trim()
      message = rawError.slice(colonIdx + 1).trim()
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
          : language === 'ruby'
          ? '/workers/ruby-worker.js'
          : language === 'lua'
          ? '/workers/lua-worker.js'
          : language === 'rust'
          ? '/workers/rust-worker.js'
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

      let timeoutTimer: ReturnType<typeof setTimeout>

      const cleanup = () => {
        isResolved = true
        clearTimeout(timeoutTimer)
        this.activeTimeouts.delete(request.requestId)
        worker.removeEventListener('message', messageHandler)
        worker.removeEventListener('error', errorHandler)
      }

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
              if (!data.payload.wasmBenchmark) {
                runClientRustWasmBenchmark(request.requestId)
                  .then((bench) => {
                    if (bench) data.payload.wasmBenchmark = bench
                    resolve(data.payload)
                  })
                  .catch(() => resolve(data.payload))
              } else {
                resolve(data.payload)
              }
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

      worker.addEventListener('message', messageHandler)
      worker.addEventListener('error', errorHandler)

      // Hard timeout enforcement to protect against infinite loops
      timeoutTimer = setTimeout(() => {
        if (isResolved) return
        cleanup()

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
