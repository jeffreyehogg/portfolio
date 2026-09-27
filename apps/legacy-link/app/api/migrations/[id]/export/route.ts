import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Papa from 'papaparse'
import { sql } from '@/lib/db'

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

    // 3. Transformation Engine
    const cleanData = records.map((record) => {
      const raw = record.raw_data as Record<string, any>
      const mappedRow: Record<string, string | number> = {}

      Object.entries(mappings).forEach(([targetField, rule]) => {
        // Direct Mapping
        if (typeof rule === 'string') {
          mappedRow[targetField] = raw[rule] || ''
        }
        // Advanced Transformations
        else if (typeof rule === 'object' && rule !== null) {
          const transformation = rule as any

          switch (transformation.type) {
            case 'concatenate':
              mappedRow[targetField] = (transformation.sources || [])
                .map((src: string) => raw[src] || '')
                .join(transformation.separator || ' ')
                .trim()
              break

            case 'static':
              mappedRow[targetField] = transformation.value || ''
              break

            case 'uppercase':
              mappedRow[targetField] = String(raw[transformation.source] || '').toUpperCase()
              break

            case 'access-flatten':
              mappedRow[targetField] = String(raw[transformation.source] || '')
                .split(transformation.inputDelimiter || ';')
                .map((s: string) => s.trim())
                .filter(Boolean)
                .join(transformation.outputDelimiter || ', ')
              break

            case 'status-normalize': {
              const val = String(raw[transformation.source] || '').trim().toLowerCase()
              const actives = (transformation.activeValues || ['1', 'true', 'active']).map((v: string) =>
                v.toLowerCase()
              )
              mappedRow[targetField] = actives.includes(val) ? 'Active' : 'Inactive'
              break
            }

            default:
              mappedRow[targetField] = ''
          }
        }
      })

      return mappedRow
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
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}