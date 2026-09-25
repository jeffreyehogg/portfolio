import { Metadata } from 'next'
import Link from 'next/link'
import QuickMoveInsClient from './QuickMoveInsClient'

export const metadata: Metadata = {
  title: 'Quick Move-In Homes & Immediate Delivery Lots | Hogg Homes',
  description:
    'Browse expedited move-in ready homes and under-construction residences across Houston, DFW, Austin, and Phoenix. Benefit from builder rate lock incentives and guaranteed delivery dates.',
}

export default function QuickMoveInsPage() {
  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Quick Move-In Homes</span>
        </nav>

        <QuickMoveInsClient />
      </div>
    </div>
  )
}
