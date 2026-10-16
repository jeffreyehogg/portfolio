import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Papa from 'papaparse'
import { sql } from '@/lib/db'
import { transformRecord } from '@/lib/pacs-transformer'

const FORMULA_INJECTION_PREFIXES = ['=', '+', '-', '@', '\t', '\r']

function sanitizeCsvValue(val: unknown): string {
  const str = val === null || val === undefined ? '' : String(val)
  if (FORMULA_INJECTION_PREFIXES.some((char) => str.startsWith(char))) {
    return `'${str}`
  }
  return str
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  const { id } = await params

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. Fetch Migration Config (Mappings)
    const migrationResult = await sql`
      SELECT mappings, target_system FROM migrations 
      WHERE id = ${id} AND user_id = ${userId}
    `

    if (migrationResult.length === 0) {
      return NextResponse.json({ error: 'Migration not found' }, { status: 404 })
    }

    const { mappings } = migrationResult[0]

    if (!mappings) {
      return NextResponse.json({ error: 'No mappings found' }, { status: 400 })
    }

    // 2. Fetch All Raw Records
    const records = await sql`
      SELECT raw_data FROM data_records 
      WHERE migration_id = ${id}
      ORDER BY id ASC
    `

    // 3. Transformation Engine using transformRecord and CSV formula sanitization
    const cleanData = records.map((record, index) => {
      const { data: mappedRow } = transformRecord(
        record.raw_data as Record<string, string>,
        mappings,
        index
      )

      const sanitizedRow: Record<string, string> = {}
      for (const [key, value] of Object.entries(mappedRow)) {
        sanitizedRow[key] = sanitizeCsvValue(value)
      }
      return sanitizedRow
    })

    // 4. Convert to CSV
    const csv = Papa.unparse(cleanData, { quotes: true })

    // 5. Return as Download
    const filename = `genetec_synergis_export_${id}_${Date.now()}.csv`

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error: any) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Failed to generate CSV export' }, { status: 500 })
  }
}