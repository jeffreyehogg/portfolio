'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Terminal, Layers, ArrowRight } from 'lucide-react'
import { FloorPlan } from '../lib/types'
import { FLOOR_PLANS } from '../lib/data'
import TourBookingDrawer from './TourBookingDrawer'
import MortgageCalculatorModal from './MortgageCalculatorModal'
import PlanComparisonDrawer from './PlanComparisonDrawer'
import FloorPlanSchematicModal from './FloorPlanSchematicModal'
import VirtualBrochureModal from './VirtualBrochureModal'
import ArchitectureInsightsDrawer from './ArchitectureInsightsDrawer'

interface ModalContextType {
  openTourDrawer: (preselected?: { communityId?: string; floorPlanId?: string; lotId?: string }) => void
  openMortgageModal: (initialPrice?: number) => void
  openCompareDrawer: () => void
  toggleComparePlan: (planId: string) => void
  openSchematic: (plan: FloorPlan) => void
  openBrochure: (plan: FloorPlan) => void
  openArchitectureDrawer: () => void
  comparedPlanIds: string[]
  isPlanCompared: (planId: string) => boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function usePlatformModals() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('usePlatformModals must be used within a PlatformModalProvider')
  }
  return context
}

export function PlatformModalProvider({ children }: { children: ReactNode }) {
  // Plan Comparison State
  const [comparedPlanIds, setComparedPlanIds] = useState<string[]>([])
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false)

  // Modals & Drawers
  const [schematicPlan, setSchematicPlan] = useState<FloorPlan | null>(null)
  const [brochurePlan, setBrochurePlan] = useState<FloorPlan | null>(null)
  const [isTourDrawerOpen, setIsTourDrawerOpen] = useState(false)
  const [tourPreselected, setTourPreselected] = useState<{
    communityId?: string
    floorPlanId?: string
    lotId?: string
  }>({})
  const [isMortgageModalOpen, setIsMortgageModalOpen] = useState(false)
  const [mortgageInitialPrice, setMortgageInitialPrice] = useState<number | undefined>(undefined)
  const [isArchitectureDrawerOpen, setIsArchitectureDrawerOpen] = useState(false)

  const handleOpenTourDrawer = (preselected?: {
    communityId?: string
    floorPlanId?: string
    lotId?: string
  }) => {
    setTourPreselected(preselected || {})
    setIsTourDrawerOpen(true)
  }

  const handleOpenMortgageModal = (price?: number) => {
    setMortgageInitialPrice(price)
    setIsMortgageModalOpen(true)
  }

  const handleToggleCompare = (planId: string) => {
    setComparedPlanIds((prev) => {
      if (prev.includes(planId)) {
        return prev.filter((id) => id !== planId)
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], planId]
      }
      return [...prev, planId]
    })
  }

  const isPlanCompared = (planId: string) => comparedPlanIds.includes(planId)

  const comparedPlans = FLOOR_PLANS.filter((p) => comparedPlanIds.includes(p.id))

  return (
    <ModalContext.Provider
      value={{
        openTourDrawer: handleOpenTourDrawer,
        openMortgageModal: handleOpenMortgageModal,
        openCompareDrawer: () => setIsCompareDrawerOpen(true),
        toggleComparePlan: handleToggleCompare,
        openSchematic: (plan) => setSchematicPlan(plan),
        openBrochure: (plan) => setBrochurePlan(plan),
        openArchitectureDrawer: () => setIsArchitectureDrawerOpen(true),
        comparedPlanIds,
        isPlanCompared,
      }}
    >
      {children}

      {/* Floating Bottom Plan Comparison Bar (Visible when 1+ plans pinned) */}
      {comparedPlanIds.length > 0 && !isCompareDrawerOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full border border-amber-500/40 bg-slate-900/95 px-4 py-2 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-xs font-medium text-white">
              Comparing {comparedPlanIds.length} of 3 plans
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareDrawerOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-amber-500 hover:bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-950 transition"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>View</span>
            </button>
            <button
              onClick={() => setComparedPlanIds([])}
              className="text-xs text-slate-400 hover:text-white px-1.5 py-1"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Modals & Slide-Over Drawers */}
      <TourBookingDrawer
        isOpen={isTourDrawerOpen}
        onClose={() => setIsTourDrawerOpen(false)}
        preselected={tourPreselected}
      />

      <MortgageCalculatorModal
        isOpen={isMortgageModalOpen}
        onClose={() => setIsMortgageModalOpen(false)}
        initialPrice={mortgageInitialPrice}
        onOpenTourDrawer={() => handleOpenTourDrawer()}
      />

      <PlanComparisonDrawer
        isOpen={isCompareDrawerOpen}
        onClose={() => setIsCompareDrawerOpen(false)}
        comparedPlans={comparedPlans}
        onRemovePlan={handleToggleCompare}
        onClearAll={() => setComparedPlanIds([])}
        onOpenTourDrawer={({ floorPlanId }) => handleOpenTourDrawer({ floorPlanId })}
        onOpenSchematic={(plan) => setSchematicPlan(plan)}
      />

      {schematicPlan && (
        <FloorPlanSchematicModal
          floorPlan={schematicPlan}
          onClose={() => setSchematicPlan(null)}
          onOpenTourDrawer={({ floorPlanId }) => handleOpenTourDrawer({ floorPlanId })}
        />
      )}

      {brochurePlan && (
        <VirtualBrochureModal
          floorPlan={brochurePlan}
          onClose={() => setBrochurePlan(null)}
          onOpenTourDrawer={({ floorPlanId }) => handleOpenTourDrawer({ floorPlanId })}
        />
      )}

      <ArchitectureInsightsDrawer
        isOpen={isArchitectureDrawerOpen}
        onClose={() => setIsArchitectureDrawerOpen(false)}
      />
    </ModalContext.Provider>
  )
}
