import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  const { id } = await params

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data } = await request.json()

    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty dataset' }, { status: 400 })
    }

    // 1. Verify migration ownership
    const migration = await sql`
      SELECT id FROM migrations 
      WHERE id = ${id} AND user_id = ${userId}
    `

    if (migration.length === 0) {
      return NextResponse.json({ error: 'Migration not found' }, { status: 404 })
    }

    // 2. Prepare records
    const recordsToInsert = data.map((row) => ({
      migration_id: parseInt(id),
      raw_data: row,
    }))

    // 3. Bulk Insert
    const result = await sql`
      INSERT INTO data_records ${
        sql(recordsToInsert, 'migration_id', 'raw_data')
      }
      RETURNING id
    `

    // 4. Update status
    await sql`
      UPDATE migrations 
      SET status = 'uploaded' 
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true, count: result.length })
  } catch (error: any) {
    console.error('Upload error details:', error)
    return NextResponse.json(
      {
        error: 'Database Error',
        details: error.message || String(error),
      },
      { status: 500 }
    )
  }
}