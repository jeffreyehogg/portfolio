import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import postgres from 'postgres'
import Link from 'next/link'
import { timeAgo } from '@/lib/utils'
import NewMigrationButton from '@/components/new-migration-button' // Import the new component

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export default async function Dashboard() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  const migrations = await sql`
    SELECT * FROM migrations 
    WHERE user_id = ${userId} 
    ORDER BY "createdAt" DESC
  `

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Migration Projects</h1>
            <p className="text-gray-500">Manage your legacy system imports</p>
          </div>
          {/* Use the Client Component here */}
          <NewMigrationButton />
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
          {migrations.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <p>No migrations found. Start your first import!</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {migrations.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{m.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{m.source_system || 'Unknown'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{m.target_system}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {m.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">{timeAgo(m.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/migration/${m.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}