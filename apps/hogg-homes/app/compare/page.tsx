import { Metadata } from 'next'
import Link from 'next/link'
import CompareClientView from './CompareClientView'

export const metadata: Metadata = {
  title: 'Side-by-Side Architectural Plan Comparison | Hogg Homes',
  description:
    'Pin and compare 2 or 3 architectural floor plans side-by-side. Analyze square footage, room dimensions, elevation designs, and monthly payment deltas.',
}

export default function ComparePage() {
  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/floor-plans" className="hover:text-amber-400 transition">
            Floor Plans
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Compare Plans</span>
        </nav>

        <CompareClientView />
      </div>
    </div>
  )
}
