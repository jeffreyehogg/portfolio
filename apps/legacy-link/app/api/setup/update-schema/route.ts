import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(request: Request) {
  const { userId } = await auth()
  const { searchParams } = new URL(request.url)
  const secretKey = searchParams.get('key')

  const isAuthorized =
    Boolean(userId) ||
    Boolean(process.env.SETUP_SECRET && secretKey === process.env.SETUP_SECRET) ||
    process.env.NODE_ENV !== 'production'

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized DDL execution' }, { status: 401 })
  }

  try {
    await sql`
      ALTER TABLE migrations 
      ADD COLUMN IF NOT EXISTS mappings JSONB;
    `
    return NextResponse.json({ message: 'Schema updated: mappings column verified' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}