import Papa from 'papaparse'
import { MappingRule, TransformedRowResult } from './pacs-types'
import { TARGET_GENETEC_FIELDS } from './pacs-presets'

export function transformRecord(
  raw: Record<string, string>,
  mappings: Record<string, MappingRule>,
  index: number
): TransformedRowResult {
  const data: Record<string, string> = {}
  const errors: string[] = []
  const warnings: string[] = []

  TARGET_GENETEC_FIELDS.forEach((field) => {
    const rule = mappings[field.key]

    if (!rule) {
      data[field.key] = ''
      if (field.required) {
        errors.push(`Missing required field: ${field.label}`)
      }
      return
    }

    // Direct String Mapping
    if (typeof rule === 'string') {
      data[field.key] = raw[rule] || ''
    }
    // Advanced Rule Object
    else if (typeof rule === 'object' && rule !== null) {
      switch (rule.type) {
        case 'direct':
          data[field.key] = raw[rule.source] || ''
          break

        case 'concatenate':
          data[field.key] = (rule.sources || [])
            .map((src) => raw[src] || '')
            .filter(Boolean)
            .join(rule.separator || ' ')
            .trim()
          break

        case 'wiegand-compose': {
          const fc = raw[rule.facilityCodeSource] || ''
          const cn = raw[rule.cardNumberSource] || ''
          if (rule.outputFormat === 'tuple') {
            data[field.key] = fc ? `${fc}:${cn}` : cn
          } else if (rule.outputFormat === 'padded') {
            data[field.key] = `${fc.padStart(3, '0')}${cn.padStart(5, '0')}`
          } else {
            data[field.key] = cn
          }
          break
        }

        case 'status-normalize': {
          const val = (raw[rule.source] || '').trim()
          const isActive = (rule.activeValues || ['1', 'True', 'Active']).some(
            (v) => v.toLowerCase() === val.toLowerCase()
          )
          data[field.key] = isActive ? 'Active' : 'Inactive'
          break
        }

        case 'access-flatten': {
          const val = raw[rule.source] || ''
          data[field.key] = val
            .split(rule.inputDelimiter || ';')
            .map((s) => s.trim())
            .filter(Boolean)
            .join(rule.outputDelimiter || ', ')
          break
        }

        case 'uppercase':
          data[field.key] = String(raw[rule.source] || '').toUpperCase()
          break

        case 'static':
          data[field.key] = rule.value || ''
          break

        default:
          data[field.key] = ''
      }
    }

    // Validation checks
    if (field.required && !data[field.key]) {
      errors.push(`Required field '${field.label}' is empty`)
    }
  })

  // Specific PACS Credential Validations
  if (data.BadgeID) {
    if (data.BadgeID.includes('E+') || data.BadgeID.includes('e+')) {
      errors.push(`Critical: Scientific notation corruption detected in BadgeID: ${data.BadgeID}`)
    }
  }

  return {
    recordIndex: index,
    data,
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

export function transformAllRecords(
  records: Record<string, string>[],
  mappings: Record<string, MappingRule>
): {
  results: TransformedRowResult[]
  totalRecords: number
  validCount: number
  duplicateBadgeCollisions: string[]
} {
  const badgeCounts = new Map<string, number>()
  const results: TransformedRowResult[] = []

  records.forEach((raw, i) => {
    const res = transformRecord(raw, mappings, i)
    results.push(res)

    const badge = res.data.BadgeID
    if (badge) {
      badgeCounts.set(badge, (badgeCounts.get(badge) || 0) + 1)
    }
  })

  const duplicateBadgeCollisions: string[] = []
  badgeCounts.forEach((count, badge) => {
    if (count > 1) {
      duplicateBadgeCollisions.push(badge)
    }
  })

  // Add duplicate warnings
  if (duplicateBadgeCollisions.length > 0) {
    results.forEach((res) => {
      if (res.data.BadgeID && duplicateBadgeCollisions.includes(res.data.BadgeID)) {
        res.warnings.push(`Duplicate badge ID collision: #${res.data.BadgeID}`)
      }
    })
  }

  const validCount = results.filter((r) => r.isValid).length

  return {
    results,
    totalRecords: records.length,
    validCount,
    duplicateBadgeCollisions,
  }
}

export function exportToGenetecCsv(
  results: TransformedRowResult[],
  filenamePrefix = 'genetec_synergis_export'
): void {
  if (typeof window === 'undefined') return

  const cleanRows = results.map((r) => r.data)
  const csv = Papa.unparse(cleanRows, {
    quotes: true,
    header: true,
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${filenamePrefix}_${Date.now()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
