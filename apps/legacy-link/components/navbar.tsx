import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo / Home Link */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-mono">
                L
              </div>
              Legacy Link
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
              <Link href="/dashboard" className="hover:text-black transition-colors">Projects</Link>
              <Link href="#" className="hover:text-black transition-colors">Documentation</Link>
            </div>
          </div>
          
          {/* Right Side: Status & Profile */}
          <div className="flex items-center gap-4">
            
            {/* New Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-emerald-700">
                    System Online
                </span>
            </div>

            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
            
            {/* Clerk User Button */}
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 ring-2 ring-gray-100"
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}