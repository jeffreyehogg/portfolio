import type { Metadata } from "next";
import Link from "next/link";
import BackgroundBlobs from "../../components/ui/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Aura — Spoken Literature in Pure Light",
  description:
    "A high-craft, native iOS audio listening app for public domain literature, inspired by the serene, editorial design of Libby and Apple Books.",
  alternates: { canonical: "/aura" },
  openGraph: {
    title: "Aura — Spoken Literature in Pure Light",
    description:
      "A serene, native iOS audiobook player for timeless public domain classics. Free, zero paywalls, no login required.",
    url: "https://www.jeffhogg.com/aura",
  },
};

export default function AuraPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <BackgroundBlobs />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-slate-300">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
            iOS Application • Public Domain Audiobooks
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Aura
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 font-serif italic max-w-xl mx-auto">
            Spoken Literature in Pure Light
          </p>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A high-craft, native iOS audio listening app for public domain literature, inspired by the serene, editorial design of Libby and Apple Books. Completely free, with no waitlists, subscriptions, or login required.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <span className="px-5 py-2.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-sm font-medium">
              Coming soon to the Apple App Store
            </span>
            <Link
              href="/aura/privacy"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/aura/support"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Support & FAQ
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-sm">
            <div className="text-2xl mb-2">⚡️</div>
            <h3 className="text-lg font-semibold text-white mb-2">Zero-Friction Playback</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tap once and listen. No email signup, passwords, or credit cards. Pick a classic and immerse yourself instantly.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-sm">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="text-lg font-semibold text-white mb-2">Dynamic Ambient Lighting</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Soft, blurred atmospheric backdrops dynamically derived from the active book&apos;s cover art illuminate your listening space.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-sm">
            <div className="text-2xl mb-2">🎚️</div>
            <h3 className="text-lg font-semibold text-white mb-2">Tactile Haptic Scrubber</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Custom scrubber with physical touch magnification, micro-haptics on interval passes, and accurate time readouts down to the second.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-sm">
            <div className="text-2xl mb-2">🌙</div>
            <h3 className="text-lg font-semibold text-white mb-2">Sleep Timer & Smart Rewind</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Smooth 20-second volume fadeout before stopping. If playback has been paused for more than 5 minutes, Aura automatically rewinds 10 seconds.
            </p>
          </div>
        </div>

        {/* Legal & App Store Links Footer */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Jeff Hogg. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/aura/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/aura/support" className="hover:text-slate-400 transition-colors">
              Support
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
