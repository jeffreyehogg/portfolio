import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { sql } from '@/lib/db'
import CsvUploader from '@/components/csv-uploader'
import FieldMapper from '@/components/field-mapper'

export default async function MigrationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { userId } = await auth()
  const { id } = await params

  if (!userId) redirect('/')

  // 1. Fetch Migration Details
  const migration = await sql`
    SELECT id, name, status, source_system, target_system, mappings, "createdAt" 
    FROM migrations 
    WHERE id = ${id} AND user_id = ${userId}
  `

  if (migration.length === 0) {
    notFound()
  }

  const project = migration[0]

  // 2. Fetch Imported Records count
  const recordCountResult = await sql`
    SELECT COUNT(*) FROM data_records WHERE migration_id = ${id}
  `
  const totalRecords = parseInt(recordCountResult[0].count) || 0
  const hasRecords = totalRecords > 0

  // 3. Fetch a sample to detect columns and show preview
  const records = await sql`
    SELECT id, raw_data FROM data_records 
    WHERE migration_id = ${id} 
    LIMIT 5
  `

  let sourceColumns: string[] = []
  if (records.length > 0 && records[0].raw_data) {
    sourceColumns = Object.keys(records[0].raw_data as Record<string, unknown>)
  }

  const isReadyForExport = hasRecords && (project.mappings || project.status === 'mapped')

  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Breadcrumbs & Status */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-3 transition-colors"
          >
            <span>←</span>
            <span>Back to projects console</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs text-cyan-400 font-medium">
                  Pipeline #{project.id}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                {project.name}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                {project.source_system} ➔ {project.target_system} • {totalRecords.toLocaleString()} ingested records
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                  project.status === 'mapped'
                    ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400'
                    : project.status === 'uploaded'
                    ? 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300'
                    : 'border-amber-500/30 bg-amber-950/40 text-amber-300'
                }`}
              >
                ● {project.status === 'mapped' ? 'Mapped' : project.status === 'uploaded' ? 'Uploaded' : 'Pending'}
              </span>

              {isReadyForExport && (
                <a
                  href={`/api/migrations/${id}/export`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-glow-indigo transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download clean CSV</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* STEP 1: Upload Section (if no records yet) */}
        {!hasRecords && (
          <div className="surface-glass rounded-2xl p-6 shadow-glass-card space-y-4">
            <div>
              <span className="text-xs text-indigo-400 font-medium">
                Stage 1 of 2
              </span>
              <h2 className="text-base font-semibold text-white tracking-tight mt-0.5">
                Ingest legacy access control CSV export
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload raw export dumps from {project.source_system}. Data will be safely stored in PostgreSQL JSONB containers without schema distortion.
              </p>
            </div>
            <CsvUploader migrationId={parseInt(id)} />
          </div>
        )}

        {/* STEP 2: Field Mapping Section (if records exist) */}
        {hasRecords && (
          <FieldMapper
            migrationId={parseInt(id)}
            sourceColumns={sourceColumns}
            initialMappings={project.mappings || {}}
          />
        )}

        {/* Raw Data Preview Section */}
        {hasRecords && (
          <div className="surface-glass rounded-2xl p-6 shadow-glass-card space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  Ingested raw data preview
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sample records stored in raw schema.
                </p>
              </div>
              <span className="text-xs text-slate-400">
                {sourceColumns.length} columns detected
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                  <tr>
                    {sourceColumns.slice(0, 6).map((col) => (
                      <th key={col} className="px-4 py-2.5 whitespace-nowrap font-medium text-[11px]">
                        {col}
                      </th>
                    ))}
                    {sourceColumns.length > 6 && (
                      <th className="px-4 py-2.5 text-slate-500 font-medium text-[11px]">+{sourceColumns.length - 6} more</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {records.map((r) => {
                    const raw = (r.raw_data as Record<string, unknown>) || {}
                    return (
                      <tr key={r.id} className="hover:bg-slate-900/40 transition-colors">
                        {sourceColumns.slice(0, 6).map((col) => (
                          <td key={`${r.id}-${col}`} className="px-4 py-2.5 whitespace-nowrap text-slate-300 text-[11px]">
                            {raw[col] !== undefined && raw[col] !== null ? String(raw[col]) : '—'}
                          </td>
                        ))}
                        {sourceColumns.length > 6 && <td className="px-4 py-2.5 text-slate-600 text-[11px]">...</td>}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}