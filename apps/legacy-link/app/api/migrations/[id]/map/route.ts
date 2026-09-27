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
    const { mappings } = await request.json()

    if (!mappings || typeof mappings !== 'object') {
      return NextResponse.json({ error: 'Invalid mappings payload' }, { status: 400 })
    }

    // Update the migration with the new mappings and change status
    await sql`
      UPDATE migrations 
      SET mappings = ${mappings}, status = 'mapped'
      WHERE id = ${id} AND user_id = ${userId}
    `

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}