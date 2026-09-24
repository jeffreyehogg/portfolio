'use client'

import { useState } from 'react'
import Papa from 'papaparse'
import { useRouter } from 'next/navigation'

export default function CsvUploader({ migrationId }: { migrationId: number }) {
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 1. STRICT VALIDATION: Ensure it is actually a CSV
    // Check extension OR mime type (mime types can be flaky on Windows)
    const isCsv = file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv'

    if (!isCsv) {
      alert('Invalid file format. Please upload a strictly formatted .csv file (not an Excel .xlsx file).')
      e.target.value = '' // Reset input
      return
    }

    setUploading(true)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      // Add validation to ensure we don't parse binary garbage
      transformHeader: (header) => header.trim(),
      complete: async (results) => {
        // 2. DATA SANITY CHECK
        // If the first row keys look like binary garbage (contain null bytes), stop.
        const firstRow = results.data[0] ? JSON.stringify(results.data[0]) : ''
        if (firstRow.includes('\u0000') || firstRow.includes('PK')) {
           alert('Error: This looks like a binary file (Excel/Zip) saved with a .csv extension. Please export as "CSV (Comma delimited)".')
           setUploading(false)
           return
        }

        try {
          const res = await fetch(`/api/migrations/${migrationId}/upload`, {
            method: 'POST',
            body: JSON.stringify({ data: results.data }),
          })
          
          if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.details || 'Upload failed')
          }
          
          router.refresh()
        } catch (error: any) {
          console.error(error)
          alert(`Error uploading data: ${error.message}`)
        } finally {
          setUploading(false)
          e.target.value = '' // Reset input so you can retry
        }
      },
      error: (error) => {
        console.error('CSV Parsing Error:', error)
        alert('Failed to read the CSV file. Please check the format.')
        setUploading(false)
      }
    })
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors relative">
      <div className="space-y-2">
        <div className="text-gray-600">
          {uploading ? (
            <span className="animate-pulse font-medium text-indigo-600">Processing & Uploading...</span>
          ) : (
            <>
              <span className="font-medium text-black">Click to upload CSV</span> or drag and drop
            </>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Raw CSV exports only (Lenel, DNA Fusion). <br/>
          <span className="text-red-400">Do not upload .xlsx files.</span>
        </p>
      </div>
      <input
        type="file"
        accept=".csv"
        disabled={uploading}
        onChange={handleFileUpload}
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
      />
    </div>
  )
}