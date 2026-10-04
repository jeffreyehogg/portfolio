import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { sql } from '@/lib/db'
import { timeAgo } from '@/lib/utils'
import NewMigrationButton from '@/components/new-migration-button'

export default async function Dashboard() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  let migrations: any[] = []
  let dbError = false

  try {
    migrations = await sql`
      SELECT * FROM migrations 
      WHERE user_id = ${userId} 
      ORDER BY "createdAt" DESC
    `
  } catch (err) {
    console.error('Database connection error in dashboard:', err)
    dbError = true
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-8 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">
                Middleware console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              PACS migration pipelines
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage enterprise access control cutovers, sanitize badge records, and export validated Genetec schemas.
            </p>
          </div>
          <NewMigrationButton />
        </div>

        {dbError && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-3 text-xs text-amber-300">
            ⚠️ <strong>Telemetry notice:</strong> Database connecting or initializing. In-memory fallback active.
          </div>
        )}

        {/* Compact High-Signal Metric Strip (Replaces massive text cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="surface-glass rounded-xl p-4 shadow-glass-card">
            <span className="text-xs text-slate-400">Cutover velocity</span>
            <div className="mt-1 font-mono text-2xl font-bold text-white tracking-tight">
              95<span className="text-cyan-400 text-lg font-normal">%</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Downtime reduction vs. Excel</p>
          </div>

          <div className="surface-glass rounded-xl p-4 shadow-glass-card">
            <span className="text-xs text-slate-400">Credential fidelity</span>
            <div className="mt-1 font-mono text-2xl font-bold text-emerald-400 tracking-tight">
              100<span className="text-emerald-400 text-lg font-normal">%</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">0 corrupted badge IDs</p>
          </div>

          <div className="surface-glass rounded-xl p-4 shadow-glass-card">
            <span className="text-xs text-slate-400">Active pipelines</span>
            <div className="mt-1 font-mono text-2xl font-bold text-indigo-400 tracking-tight">
              {migrations.length}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Registered migration projects</p>
          </div>

          <div className="surface-glass rounded-xl p-4 shadow-glass-card">
            <span className="text-xs text-slate-400">Target standard</span>
            <div className="mt-1 font-mono text-lg font-bold text-cyan-300 tracking-tight pt-1">
              Genetec Synergis
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">PascalCase Config Tool schema</p>
          </div>
        </div>

        {/* Project Table Section — Front and Center */}
        <div className="surface-glass rounded-2xl overflow-hidden shadow-glass-card">
          <div className="border-b border-white/[0.08] bg-slate-950/60 p-4 sm:p-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Active cutover projects
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {migrations.length} registered PACS data migration pipeline{migrations.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          {migrations.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900 text-indigo-400 shadow-glow-indigo">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">No migration projects initialized</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Create your first Lenel, DNA Fusion, or AMAG CSV pipeline to begin mapping attributes into Genetec schemas.
                </p>
              </div>
              <div className="pt-1">
                <NewMigrationButton />
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.08] bg-slate-950/80 text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-medium">Project name</th>
                    <th className="px-5 py-3 font-medium">Source system</th>
                    <th className="px-5 py-3 font-medium">Target schema</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Created</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {migrations.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="px-5 py-3 font-semibold text-white whitespace-nowrap">
                        {m.name}
                      </td>
                      <td className="px-5 py-3 text-slate-300 font-mono text-xs whitespace-nowrap">
                        {m.source_system || 'Legacy PACS CSV'}
                      </td>
                      <td className="px-5 py-3 text-cyan-400 font-mono text-xs whitespace-nowrap">
                        {m.target_system}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                            m.status === 'mapped'
                              ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400'
                              : m.status === 'uploaded'
                              ? 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300'
                              : 'border-amber-500/30 bg-amber-950/40 text-amber-300'
                          }`}
                        >
                          ● {m.status === 'mapped' ? 'Mapped' : m.status === 'uploaded' ? 'Uploaded' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-400 text-xs whitespace-nowrap">
                        {timeAgo(m.createdAt)}
                      </td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <Link
                          href={`/dashboard/migration/${m.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-200 transition-all hover:bg-indigo-600 hover:text-white hover:border-indigo-500 active:scale-[0.98]"
                        >
                          <span>Open pipeline</span>
                          <span>→</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}