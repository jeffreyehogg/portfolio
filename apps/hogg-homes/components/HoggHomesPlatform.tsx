'use client'

import { useState } from 'react'
import Hero from './Hero'
import ExplorerSection from './ExplorerSection'
import QuickMoveInShowcase from './QuickMoveInShowcase'
import RegionalMapSection from './RegionalMapSection'
import CommunityShowcase from './CommunityShowcase'
import ScrollReveal from './ScrollReveal'
import { COMMUNITIES } from '../lib/data'
import { usePlatformModals } from './PlatformModalContext'

export default function HoggHomesPlatform() {
  // Global Market / Filter Selection
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

  const handleSelectCommunityPlans = (communityId: string) => {
    const comm = COMMUNITIES.find((c) => c.id === communityId)
    if (comm) {
      setSelectedMetro(comm.metroId)
      setSearchQuery(comm.name)
    }
    const element = document.getElementById('floor-plans')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleExplorePlans = () => {
    const element = document.getElementById('floor-plans')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Hero & Market Discovery with Model Spotlight */}
      <Hero
        selectedMetro={selectedMetro}
        onSelectMetro={setSelectedMetro}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExplorePlans={handleExplorePlans}
        onOpenTourDrawer={() => openTourDrawer()}
      />

      {/* Faceted Floor Plan & Elevation Explorer */}
      <ScrollReveal>
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
      </ScrollReveal>

      {/* Quick Move-In (Inventory) Showcase */}
      <ScrollReveal>
        <QuickMoveInShowcase onOpenTourDrawer={openTourDrawer} />
      </ScrollReveal>

      {/* Interactive Sunbelt & Texas Regional Territory Map */}
      <ScrollReveal>
        <RegionalMapSection
          onSelectCommunity={handleSelectCommunityPlans}
          onOpenTourDrawer={openTourDrawer}
        />
      </ScrollReveal>

      {/* Featured Communities Showcase */}
      <ScrollReveal>
        <CommunityShowcase
          onSelectCommunityPlans={handleSelectCommunityPlans}
          onOpenTourDrawer={openTourDrawer}
        />
      </ScrollReveal>
    </>
  )
}
