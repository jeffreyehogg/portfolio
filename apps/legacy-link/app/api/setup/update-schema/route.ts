import { NextResponse } from 'next/server'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function GET() {
  try {
    await sql`
      ALTER TABLE migrations 
      ADD COLUMN IF NOT EXISTS mappings JSONB;
    `
    return NextResponse.json({ message: 'Schema updated: mappings column added' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}