import { EstimatorInputs, EstimatorResults } from './pacs-types'

export function calculatePacsEstimator(inputs: EstimatorInputs): EstimatorResults {
  const {
    cardholderCount,
    legacySystemCount,
    credentialFormat,
    facilityCodeCount,
    doorCount,
    hourlyRate,
  } = inputs

  // 1. Cutover Labor Model
  // Manual: ~9 minutes (0.15h) per cardholder for manual verification, clearance mapping, and Excel cleaning
  const manualCutoverHours = Math.round(cardholderCount * 0.15)
  // Legacy Link: ~18 seconds (0.005h) per cardholder + 4h system setup & verification
  const legacyLinkCutoverHours = Math.round(cardholderCount * 0.005 + 4)
  const hoursSaved = Math.max(0, manualCutoverHours - legacyLinkCutoverHours)
  const dollarSavings = Math.round(hoursSaved * hourlyRate)

  // 2. Wiegand Credential Collision Model (The Birthday Paradox on 26-Bit Credentials)
  // Standard 26-bit Wiegand (H10301) has 16-bit card number = 65,535 possible card IDs per Facility Code
  const cardsPerFacilityCode =
    credentialFormat === '26-bit'
      ? 65535
      : credentialFormat === '35-bit-corp'
      ? 1048575
      : credentialFormat === '37-bit'
      ? 34359738367
      : credentialFormat === 'desfire'
      ? 4294967295
      : 65535 // Mixed format defaults to 26-bit vulnerability

  const totalCardSpace = Math.max(cardsPerFacilityCode, cardsPerFacilityCode * facilityCodeCount)
  const n = cardholderCount

  // Generalized Birthday Problem: P = 1 - exp( - n(n-1) / (2 * N) )
  const exponent = -1 * ((n * (n - 1)) / (2 * totalCardSpace))
  // Guard against extreme exponent float overflow
  const collisionProbability =
    exponent < -50
      ? 1.0
      : Math.min(1.0, Math.max(0.0, 1 - Math.exp(exponent)))

  // Expected unique cards occupied = N * (1 - (1 - 1/N)^n) ~= N * (1 - exp(-n/N))
  const expectedUnique = totalCardSpace * (1 - Math.exp(-n / totalCardSpace))
  const estimatedCollisions = Math.max(0, Math.round(n - expectedUnique))

  // 3. Multi-Factor Complexity Heuristic (1 - 100)
  let volScore = 5
  if (cardholderCount >= 2000 && cardholderCount < 10000) volScore = 15
  else if (cardholderCount >= 10000 && cardholderCount < 50000) volScore = 25
  else if (cardholderCount >= 50000) volScore = 35

  const systemScore = Math.min(30, (legacySystemCount - 1) * 12)

  let formatScore = 10
  if (credentialFormat === 'mixed') formatScore = 30
  else if (credentialFormat === '26-bit') formatScore = 25
  else if (credentialFormat === '35-bit-corp') formatScore = 15
  else if (credentialFormat === '37-bit') formatScore = 10
  else if (credentialFormat === 'desfire') formatScore = 5

  const doorScore = doorCount > 500 ? 15 : doorCount > 100 ? 10 : 5

  const rawScore = volScore + systemScore + formatScore + doorScore
  const complexityScore = Math.min(100, Math.max(12, rawScore))

  let riskTier: 'LOW' | 'MODERATE' | 'CRITICAL' = 'LOW'
  if (complexityScore >= 70 || (collisionProbability > 0.6 && credentialFormat === '26-bit')) {
    riskTier = 'CRITICAL'
  } else if (complexityScore >= 40 || collisionProbability > 0.2) {
    riskTier = 'MODERATE'
  }

  // Typical weekend cutover downtime avoided (shifts 48-hour weekend cutover into single afternoon)
  const weekendOvertimeHoursAvoided = cardholderCount > 5000 ? 44 : 28

  return {
    manualCutoverHours,
    legacyLinkCutoverHours,
    hoursSaved,
    dollarSavings,
    collisionProbability,
    estimatedCollisions,
    complexityScore,
    riskTier,
    weekendOvertimeHoursAvoided,
  }
}
