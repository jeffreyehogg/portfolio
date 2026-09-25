'use server'

import { z } from 'zod'
import { COMMUNITIES } from '../lib/data'
import { TourBookingResponse } from '../lib/types'

const TourBookingSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  communityId: z.string().min(1, 'Please select a community'),
  preferredDate: z.string().min(1, 'Please pick a preferred tour date'),
  preferredTime: z.string().min(1, 'Please pick a preferred tour time slot'),
  floorPlanId: z.string().optional(),
  lotId: z.string().optional(),
  financingStatus: z.enum(['pre_approved', 'cash_buyer', 'exploring_options', 'need_lender']),
  realtorRepresented: z.boolean().default(false),
  notes: z.string().optional(),
})

export async function scheduleTourAction(formData: FormData): Promise<TourBookingResponse> {
  const startTime = Date.now()

  try {
    const getString = (key: string): string => {
      const val = formData.get(key)
      return typeof val === 'string' ? val : ''
    }
    const getOptionalString = (key: string): string | undefined => {
      const val = formData.get(key)
      return typeof val === 'string' && val.trim() !== '' ? val : undefined
    }

    const rawData = {
      fullName: getString('fullName'),
      email: getString('email'),
      phone: getString('phone'),
      communityId: getString('communityId'),
      preferredDate: getString('preferredDate'),
      preferredTime: getString('preferredTime'),
      floorPlanId: getOptionalString('floorPlanId'),
      lotId: getOptionalString('lotId'),
      financingStatus: getString('financingStatus') || 'exploring_options',
      realtorRepresented: formData.get('realtorRepresented') === 'true',
      notes: getOptionalString('notes'),
    }

    const validated = TourBookingSchema.parse(rawData)

    // Find the community and counselor
    const community = COMMUNITIES.find((c) => c.id === validated.communityId) || COMMUNITIES[0]

    // Simulate real-world CRM webhook dispatch with realistic network roundtrip
    await new Promise((resolve) => setTimeout(resolve, 280))

    const latencyMs = Date.now() - startTime
    const confirmationCode = `VIP-${community.metroId.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`
    const leadId = `CRM-LEAD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    // Telemetry log for developer drawer and server console
    console.info(`[CRM Webhook Dispatch] Lead ${leadId} dispatched to ${community.name} sales desk:`, {
      buyer: validated.fullName,
      email: validated.email,
      phone: validated.phone,
      tourDate: validated.preferredDate,
      timeSlot: validated.preferredTime,
      assignedCounselor: community.salesCounselor.name,
      realtorFlag: validated.realtorRepresented,
      latencyMs,
    })

    return {
      success: true,
      confirmationCode,
      timestamp: new Date().toISOString(),
      crmPayload: {
        leadId,
        assignedAgent: community.salesCounselor.name,
        crmStatus: 'DELIVERED_TO_SALESFORCE_WEBHOOK',
        latencyMs,
        webhookEndpoint: 'https://crm.hogghomes.internal/api/v1/webhooks/leads',
      },
      tourDetails: {
        communityName: community.name,
        address: `${community.city}, ${community.state} ${community.zip}`,
        salesCounselor: community.salesCounselor.name,
        counselorPhone: community.salesCounselor.phone,
        date: validated.preferredDate,
        time: validated.preferredTime,
      },
    }
  } catch (error: unknown) {
    console.error('[CRM Webhook Error] Validation or dispatch error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Invalid form submission',
      }
    }
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      }
    }
    return {
      success: false,
      error: 'An unexpected error occurred scheduling your tour.',
    }
  }
}
