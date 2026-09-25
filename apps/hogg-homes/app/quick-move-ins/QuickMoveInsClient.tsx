'use client'

import QuickMoveInShowcase from '../../components/QuickMoveInShowcase'
import { usePlatformModals } from '../../components/PlatformModalContext'

export default function QuickMoveInsClient() {
  const { openTourDrawer } = usePlatformModals()

  return (
    <div>
      <QuickMoveInShowcase onOpenTourDrawer={openTourDrawer} />
    </div>
  )
}
