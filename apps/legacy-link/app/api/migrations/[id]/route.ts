import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // <--- FIX: Added Promise here
) {
  const { userId } = await auth()
  const { id } = await params // <--- FIX: Ensure we await the params

  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const migration = await sql`
    SELECT * FROM migrations 
    WHERE id = ${id} AND user_id = ${userId}
  `

  if (migration.length === 0) return NextResponse.json({ error: 'Not Found' }, { status: 404 })

  // Also fetch record counts if needed for the UI
  const recordCount = await sql`SELECT COUNT(*) FROM data_records WHERE migration_id = ${id}`

  return NextResponse.json({ 
    ...migration[0], 
    recordCount: parseInt(recordCount[0].count) 
  })
}