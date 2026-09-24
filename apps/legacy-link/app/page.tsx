import { 
  SignInButton, 
  SignedOut,
} from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import ExpandingArrow from '@/components/expanding-arrow'

export default async function Home() {
  const { userId } = await auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-indigo-500 selection:text-white">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="z-10 text-center space-y-8 px-5 max-w-5xl mx-auto">
        
        {/* Status Pill */}
        <div className="inline-flex items-center rounded-full border border-gray-800 bg-gray-900/50 px-3 py-1 text-sm text-gray-400 backdrop-blur-xl">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          <span className="font-medium">Migration Engine Active</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-8xl">
          <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Legacy Link
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-light">
          The middleware standard for physical security migrations.
          <br className="hidden sm:block" />
          Transform legacy security datasets into clean <strong>Genetec</strong> schemas in minutes.
        </p>
        
        {/* CTA Button */}
        <div className="flex justify-center gap-4 pt-8">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3.5 text-lg font-bold text-black transition-all hover:bg-gray-100 hover:scale-105 hover:ring-4 hover:ring-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
                <span>Start Migration</span>
                <ExpandingArrow className="text-black" />
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
      
      {/* New Footer: Trust Signals */}
      <div className="absolute bottom-10 w-full">
        <div className="flex justify-center gap-8 text-sm font-medium text-gray-600 uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            Secure by Design
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            Universal Mapping
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 16c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/></svg>
            Enterprise Ready
          </span>
        </div>
      </div>
    </main>
  )
}