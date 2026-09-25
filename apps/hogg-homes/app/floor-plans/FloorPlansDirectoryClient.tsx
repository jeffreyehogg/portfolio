'use client'

import { useState } from 'react'
import ExplorerSection from '../../components/ExplorerSection'
import { usePlatformModals } from '../../components/PlatformModalContext'

export default function FloorPlansDirectoryClient() {
  const [selectedMetro, setSelectedMetro] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const {
    openTourDrawer,
    openMortgageModal,
    openCompareDrawer,
    toggleComparePlan,
    openSchematic,
    openBrochure,
    comparedPlanIds,
  } = usePlatformModals()

  return (
    <div>
      <ExplorerSection
        selectedMetro={selectedMetro}
        onSelectMetro={setSelectedMetro}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery('')}
        onOpenSchematic={openSchematic}
        onOpenBrochure={openBrochure}
        onOpenTourDrawer={openTourDrawer}
        onOpenMortgageModal={openMortgageModal}
        comparedPlanIds={comparedPlanIds}
        onToggleCompare={toggleComparePlan}
        onOpenCompareDrawer={openCompareDrawer}
      />
    </div>
  )
}
