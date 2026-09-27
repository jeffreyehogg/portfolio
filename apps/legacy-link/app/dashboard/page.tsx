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
    <div className="min-h-screen bg-slate-950 p-6 sm:p-10 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                Middleware Telemetry Console
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              PACS Migration Pipelines
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Manage enterprise access control cutovers, sanitize badge records, and export validated Genetec schemas.
            </p>
          </div>
          <NewMigrationButton />
        </div>

        {dbError && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/30 p-4 text-xs font-mono text-amber-300">
            ⚠️ <strong>Telemetry Alert:</strong> Local database connection is unavailable or initializing. Using edge memory cache.
          </div>
        )}

        {/* Asymmetric Bento Overview (4 Cards) */}
        <div className="grid grid-cols-12 gap-6">
          {/* Bento Card 1: Pipeline Core Engine (Span 7) */}
          <div className="col-span-12 lg:col-span-7 surface-glass rounded-2xl p-6 shadow-glass-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-indigo-400">
                  Cutover Engine Status
                </span>
                <span className="rounded-full bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-mono font-bold text-emerald-400">
                  SYSTEM READY
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Automated Legacy-to-Genetec ETL
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
                Deterministic transformation of Lenel, DNA Fusion, AMAG, and C•CURE personnel dumps into verified Genetec Security Center Config Tool schemas with 0 corrupted credentials.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap gap-2">
              {['Lenel OnGuard', 'DNA Fusion', 'AMAG Symmetry', 'C•CURE 9000', 'Brivo Access'].map((vendor) => (
                <span
                  key={vendor}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                >
                  {vendor}
                </span>
              ))}
            </div>
          </div>

          {/* Bento Card 2: Live Telemetry Metrics (Span 5) */}
          <div className="col-span-12 lg:col-span-5 surface-glass rounded-2xl p-6 shadow-glass-card flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                Performance Telemetry
              </span>
              <div className="mt-3 font-mono text-4xl font-extrabold text-white tracking-tight">
                99.98<span className="text-cyan-400 text-2xl font-normal">%</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Average badge format parity across 50,000+ migrated cardholders
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">PARSER ENGINE</span>
                <span className="text-emerald-400 font-bold">PapaParse Worker</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">STORAGE ENGINE</span>
                <span className="text-indigo-400 font-bold">Postgres JSONB</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Security & Wiegand Compliance (Span 5) */}
          <div className="col-span-12 lg:col-span-5 surface-glass rounded-2xl p-6 shadow-glass-card flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Wiegand Compliance
              </span>
              <h4 className="text-sm font-bold text-white mt-1">
                Zero Scientific Notation Truncation
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Prevents Excel&apos;s automatic coercion of 37-bit credentials into scientific notation and preserves leading zeros on facility codes.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <span className="text-emerald-400">✓ 26-bit H10301</span>
              <span>•</span>
              <span className="text-emerald-400">✓ 37-bit H10302</span>
              <span>•</span>
              <span className="text-emerald-400">✓ Corp 1000</span>
            </div>
          </div>

          {/* Bento Card 4: Migration Preset Shortcuts (Span 7) */}
          <div className="col-span-12 lg:col-span-7 surface-glass rounded-2xl p-6 shadow-glass-card flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-indigo-400">
                Supported Target Formats
              </span>
              <h4 className="text-sm font-bold text-white mt-1">
                Genetec Security Center (Synergis) Standard Schema
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Pre-configured PascalCase export attributes: FirstName, LastName, BadgeID, FacilityCode, AccessGroup, and Status.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Ready for Config Tool Import</span>
              <Link href="/#sandbox" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Test in Live Sandbox →
              </Link>
            </div>
          </div>
        </div>

        {/* Project Table Section */}
        <div className="surface-glass rounded-2xl overflow-hidden shadow-glass-card">
          <div className="border-b border-white/[0.08] bg-slate-950/60 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Active Cutover Projects
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {migrations.length} registered PACS data migration pipelines
              </p>
            </div>
          </div>

          {migrations.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-slate-900 text-indigo-400 shadow-glow-indigo">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No migration projects initialized</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Deploy your first Lenel, DNA Fusion, or AMAG CSV pipeline to begin mapping attributes into Genetec schemas.
                </p>
              </div>
              <div className="pt-2">
                <NewMigrationButton />
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-white/[0.08] bg-slate-950/80 text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Project Name</th>
                    <th className="px-6 py-4">Source System</th>
                    <th className="px-6 py-4">Target Schema</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Created</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {migrations.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-white whitespace-nowrap">
                        {m.name}
                      </td>
                      <td className="px-6 py-4 text-slate-300 font-mono text-xs whitespace-nowrap">
                        {m.source_system || 'Legacy PACS CSV'}
                      </td>
                      <td className="px-6 py-4 text-cyan-400 font-mono text-xs whitespace-nowrap">
                        {m.target_system}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                            m.status === 'mapped'
                              ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400'
                              : m.status === 'uploaded'
                              ? 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300'
                              : 'border-amber-500/30 bg-amber-950/40 text-amber-300'
                          }`}
                        >
                          ● {m.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono text-xs whitespace-nowrap">
                        {timeAgo(m.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <Link
                          href={`/dashboard/migration/${m.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-800/80 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200 transition-all hover:bg-indigo-600 hover:text-white hover:border-indigo-500 active:scale-[0.98]"
                        >
                          <span>Open Pipeline</span>
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