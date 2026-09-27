export type PacsVendor = 'lenel' | 'dna_fusion' | 'amag' | 'ccure' | 'brivo'

export interface DirectRule {
  type: 'direct'
  source: string
}

export interface ConcatenateRule {
  type: 'concatenate'
  sources: string[]
  separator: string
}

export interface WiegandComposeRule {
  type: 'wiegand-compose'
  facilityCodeSource: string
  cardNumberSource: string
  outputFormat: 'tuple' | 'raw-int' | 'padded'
}

export interface StatusNormalizeRule {
  type: 'status-normalize'
  source: string
  activeValues: string[]
}

export interface AccessFlattenRule {
  type: 'access-flatten'
  source: string
  inputDelimiter: string
  outputDelimiter: string
}

export interface StaticRule {
  type: 'static'
  value: string
}

export interface UppercaseRule {
  type: 'uppercase'
  source: string
}

export type MappingRule =
  | string
  | DirectRule
  | ConcatenateRule
  | WiegandComposeRule
  | StatusNormalizeRule
  | AccessFlattenRule
  | StaticRule
  | UppercaseRule

export interface PacsPreset {
  id: PacsVendor
  name: string
  version: string
  vendorBadge: string
  description: string
  sourceColumns: string[]
  sampleRecords: Record<string, string>[]
  defaultMappings: Record<string, MappingRule>
}

export interface GenetecTargetField {
  key: string
  label: string
  required: boolean
  description: string
  schemaType: string
}

export interface TransformedRowResult {
  recordIndex: number
  data: Record<string, string>
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface EstimatorInputs {
  cardholderCount: number
  legacySystemCount: number
  credentialFormat: '26-bit' | '37-bit' | '35-bit-corp' | 'desfire' | 'mixed'
  facilityCodeCount: number
  doorCount: number
  hourlyRate: number
}

export interface EstimatorResults {
  manualCutoverHours: number
  legacyLinkCutoverHours: number
  hoursSaved: number
  dollarSavings: number
  collisionProbability: number
  estimatedCollisions: number
  complexityScore: number
  riskTier: 'LOW' | 'MODERATE' | 'CRITICAL'
  weekendOvertimeHoursAvoided: number
}

export interface MatrixRow {
  attributeKey: string
  label: string
  category: 'identity' | 'credential' | 'access' | 'temporal' | 'gotcha'
  systems: Record<
    PacsVendor | 'genetec',
    {
      value: string
      notes?: string
      gotcha?: string
      transformRegex?: string
    }
  >
}
