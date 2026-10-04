'use client'

import { useState } from 'react'
import Papa from 'papaparse'
import { useRouter } from 'next/navigation'

export default function CsvUploader({ migrationId }: { migrationId: number }) {
  const [uploading, setUploading] = useState(false)
  const [uploadStage, setUploadStage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const router = useRouter()

  const processFile = (file: File) => {
    setErrorMessage(null)

    // 1. Strict validation: Ensure it is a valid CSV
    const isCsv = file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv'
    if (!isCsv) {
      setErrorMessage(
        'Invalid file format. Please upload a plain-text .csv export file (not an Excel .xlsx or binary workbook).'
      )
      return
    }

    setUploading(true)
    setUploadStage('Parsing legacy CSV stream via worker...')

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      worker: true,
      transformHeader: (header) => header.trim(),
      complete: async (results) => {
        setUploadStage('Inspecting binary integrity & null byte guards...')

        // 2. Data sanity check
        const firstRow = results.data[0] ? JSON.stringify(results.data[0]) : ''
        if (firstRow.includes('\u0000') || firstRow.includes('PK')) {
          setErrorMessage(
            'Corrupt format: File contains binary headers. Please export strictly as comma-delimited CSV.'
          )
          setUploading(false)
          setUploadStage(null)
          return
        }

        try {
          setUploadStage(`Streaming ${results.data.length} records to PostgreSQL...`)
          const res = await fetch(`/api/migrations/${migrationId}/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: results.data }),
          })

          if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.details || errorData.error || 'Upload failed')
          }

          setUploadStage('Ingestion verified! Updating project...')
          router.refresh()
        } catch (error: any) {
          console.error('Ingestion error:', error)
          setErrorMessage(`Database ingestion error: ${error.message}`)
        } finally {
          setUploading(false)
          setUploadStage(null)
        }
      },
      error: (error) => {
        console.error('CSV Parsing Error:', error)
        setErrorMessage(`Failed to parse CSV file: ${error.message}`)
        setUploading(false)
        setUploadStage(null)
      },
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    processFile(file)
    e.target.value = ''
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)
          const file = e.dataTransfer.files?.[0]
          if (file) processFile(file)
        }}
        className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-950 ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-950/20 shadow-glow-cyan scale-[1.01]'
            : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
        }`}
      >
        <div className="space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900 text-cyan-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <div className="text-xs">
            {uploading ? (
              <div className="flex flex-col items-center gap-1 font-mono text-cyan-400">
                <span className="animate-pulse font-medium">{uploadStage}</span>
                <span className="text-[10px] text-slate-500">Processing background worker thread</span>
              </div>
            ) : (
              <>
                <span className="font-semibold text-white">Click to upload raw CSV</span>{' '}
                <span className="text-slate-400">or drag and drop</span>
              </>
            )}
          </div>

          <p className="text-[11px] text-slate-500">
            Supported exports: Lenel OnGuard, DNA Fusion, AMAG Symmetry, C•CURE 9000
          </p>
        </div>

        <input
          type="file"
          accept=".csv"
          disabled={uploading}
          onChange={handleFileUpload}
          aria-label="Upload legacy PACS CSV file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 focus:outline-none"
        />
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-300">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}