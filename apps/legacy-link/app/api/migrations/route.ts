import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function POST(request: Request) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, sourceSystem } = await request.json()

    // Insert the new migration record
    const result = await sql`
      INSERT INTO migrations (user_id, name, source_system, status)
      VALUES (${userId}, ${name}, ${sourceSystem}, 'draft')
      RETURNING id
    `

    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    console.error('Migration create error:', error)
    return NextResponse.json({ error: 'Failed to create migration' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const migrations = await sql`
    SELECT * FROM migrations 
    WHERE user_id = ${userId} 
    ORDER BY "createdAt" DESC
  `
  
  return NextResponse.json(migrations)
}