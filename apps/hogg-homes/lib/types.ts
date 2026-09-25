export interface Elevation {
  id: 'A' | 'B' | 'C'
  name: string
  styleName: string
  description: string
  imageUrl: string
}

export interface RoomDimension {
  room: string
  dimensions: string
  features: string[]
}

export interface FloorPlan {
  id: string
  name: string
  slug: string
  series: 'Heritage Collection' | 'Signature Series' | 'Pinnacle Collection'
  basePrice: number
  sqft: number
  bedrooms: number
  bathrooms: number
  halfBaths: number
  stories: 1 | 2
  garageBays: 2 | 3
  elevations: Elevation[]
  rooms: RoomDimension[]
  features: string[]
  availableInCommunities: string[]
  popularTag?: string
  schematicSvgData?: {
    primarySuite: string
    greatRoom: string
    kitchen: string
    patio: string
    garage: string
  }
}

export interface CommunityAmenity {
  name: string
  icon: string
  description: string
}

export interface Community {
  id: string
  name: string
  slug: string
  metroId: string
  city: string
  county: string
  state: string
  zip: string
  priceRange: string
  startingPrice: number
  description: string
  heroImage: string
  amenities: CommunityAmenity[]
  schoolDistrict: string
  hoaDues: string
  taxRate: string
  salesCounselor: {
    name: string
    phone: string
    email: string
    avatar: string
  }
  activeFloorPlanIds: string[]
  moveInReadyCount: number
}

export interface Metro {
  id: string
  name: string
  state: string
  code: string
  communityCount: number
  planCount: number
  inventoryCount: number
  startingPrice: number
  description: string
  heroImage: string
}

export type ConstructionStage = 'Framing' | 'Drywall' | 'Move-In Ready Today'

export interface QuickMoveInLot {
  id: string
  lotNumber: string
  streetAddress: string
  communityId: string
  communityName: string
  metroId: string
  floorPlanId: string
  floorPlanName: string
  elevation: 'A' | 'B' | 'C'
  sqft: number
  bedrooms: number
  bathrooms: number
  stories: 1 | 2
  garageBays: 2 | 3
  originalPrice: number
  currentPrice: number
  savingsAmount: number
  constructionStage: ConstructionStage
  constructionProgressPercent: number
  estimatedCompletion: string
  incentive: string
  highlightFeatures: string[]
  heroImage: string
  interiorImages: string[]
}

export interface TourBookingRequest {
  fullName: string
  email: string
  phone: string
  communityId: string
  preferredDate: string
  preferredTime: string
  floorPlanId?: string
  lotId?: string
  financingStatus: 'pre_approved' | 'cash_buyer' | 'exploring_options' | 'need_lender'
  realtorRepresented: boolean
  notes?: string
}

export interface TourBookingResponse {
  success: boolean
  confirmationCode?: string
  timestamp?: string
  crmPayload?: {
    leadId: string
    assignedAgent: string
    crmStatus: string
    latencyMs: number
    webhookEndpoint: string
  }
  tourDetails?: {
    communityName: string
    address: string
    salesCounselor: string
    counselorPhone: string
    date: string
    time: string
  }
  error?: string
}

export interface ArchitectureMetric {
  metric: string
  legacyValue: string
  nextjsValue: string
  gain: string
}
