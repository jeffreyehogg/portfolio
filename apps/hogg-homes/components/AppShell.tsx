'use client'

import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { PlatformModalProvider, usePlatformModals } from './PlatformModalContext'
import { QUICK_MOVE_IN_LOTS } from '../lib/data'

function AppShellInner({ children }: { children: ReactNode }) {
  const {
    openTourDrawer,
    openMortgageModal,
    openCompareDrawer,
    openArchitectureDrawer,
    comparedPlanIds,
  } = usePlatformModals()

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar
        onOpenTourDrawer={openTourDrawer}
        onOpenMortgageModal={() => openMortgageModal()}
        onOpenCompareDrawer={openCompareDrawer}
        comparedCount={comparedPlanIds.length}
        moveInReadyCount={QUICK_MOVE_IN_LOTS.length}
      />
      <main className="flex-1">{children}</main>
      <Footer onOpenArchitectureDrawer={openArchitectureDrawer} />
    </div>
  )
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <PlatformModalProvider>
      <AppShellInner>{children}</AppShellInner>
    </PlatformModalProvider>
  )
}
