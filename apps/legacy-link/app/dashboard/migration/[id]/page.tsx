import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import postgres from 'postgres'
import Link from 'next/link'
import CsvUploader from '@/components/csv-uploader'
import FieldMapper from '@/components/field-mapper'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export default async function MigrationPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { userId } = await auth()
  const { id } = await params

  if (!userId) redirect('/')

  // 1. Fetch Migration Details (including the mappings column)
  const migration = await sql`
    SELECT id, name, status, source_system, target_system, mappings, "createdAt" 
    FROM migrations 
    WHERE id = ${id} AND user_id = ${userId}
  `

  if (migration.length === 0) {
    notFound()
  }

  const project = migration[0]

  // 2. Fetch Imported Records info
  const recordCountResult = await sql`
    SELECT COUNT(*) FROM data_records WHERE migration_id = ${id}
  `
  const totalRecords = parseInt(recordCountResult[0].count)
  const hasRecords = totalRecords > 0
  
  // 3. Fetch a sample to detect columns and show preview
  const records = await sql`
    SELECT * FROM data_records 
    WHERE migration_id = ${id} 
    LIMIT 5
  `

  // Extract keys from the first record to use as Source Columns for the mapper
  let sourceColumns: string[] = []
  if (records.length > 0 && records[0].raw_data) {
    sourceColumns = Object.keys(records[0].raw_data)
  }

  // Check if project is ready for export (has mappings or status is 'mapped')
  const isReadyForExport = hasRecords && (project.mappings || project.status === 'mapped')

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-black mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-500 mt-1">
                {project.source_system} to {project.target_system} • {totalRecords} records
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                project.status === 'mapped' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>

              {/* EXPORT BUTTON - Only visible if mapped */}
              {isReadyForExport && (
                <a
                  href={`/api/migrations/${id}/export`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  ↓ Download Clean CSV
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* STEP 1: Upload Section - Only show if NO records exist yet */}
          {!hasRecords && (
            <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-900/5">
              <h2 className="text-lg font-semibold mb-4">1. Upload Legacy Data</h2>
              <div className="relative h-48">
                <CsvUploader migrationId={parseInt(id)} />
              </div>
            </div>
          )}

          {/* STEP 2: Mapping Section - Show if records EXIST */}
          {hasRecords && (
            <FieldMapper 
              migrationId={parseInt(id)} 
              sourceColumns={sourceColumns}
              initialMappings={project.mappings || {}} 
            />
          )}

          {/* Data Preview Section */}
          {hasRecords && (
            <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-900/5 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Raw Data Preview</h2>
                <span className="text-sm text-gray-400">First 5 records</span>
              </div>
              
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                  <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                      {sourceColumns.slice(0, 6).map((col) => (
                        <th key={col} className="px-4 py-2 whitespace-nowrap">{col}</th>
                      ))}
                      {sourceColumns.length > 6 && <th className="px-4 py-2">...</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {records.map((r, i) => (
                      <tr key={r.id}>
                        {sourceColumns.slice(0, 6).map((col) => (
                          <td key={`${r.id}-${col}`} className="px-4 py-2 whitespace-nowrap text-gray-600">
                            {/* @ts-ignore */}
                            {r.raw_data[col]?.toString() || '-'}
                          </td>
                        ))}
                        {sourceColumns.length > 6 && <td className="px-4 py-2 text-gray-400">...</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}