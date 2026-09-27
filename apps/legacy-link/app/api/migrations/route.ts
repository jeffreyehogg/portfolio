import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, sourceSystem } = await request.json()

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
    }

    // Insert the new migration record
    const result = await sql`
      INSERT INTO migrations (user_id, name, source_system, status)
      VALUES (${userId}, ${name.trim()}, ${sourceSystem || 'Lenel OnGuard'}, 'draft')
      RETURNING id
    `

    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    console.error('Migration create error:', error)
    return NextResponse.json({ error: 'Failed to create migration pipeline' }, { status: 500 })
  }
}

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const migrations = await sql`
      SELECT * FROM migrations 
      WHERE user_id = ${userId} 
      ORDER BY "createdAt" DESC
    `

    return NextResponse.json(migrations)
  } catch (error) {
    console.error('Migration fetch error:', error)
    return NextResponse.json({ error: 'Failed to retrieve migrations' }, { status: 500 })
  }
}