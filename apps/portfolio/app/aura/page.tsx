import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackgroundBlobs from "../../components/ui/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Aura — Audiobooks & Podcasts in Pure Light",
  description:
    "A high-craft, native iOS audio listening app for public domain literature and podcasts, inspired by the serene, editorial design of Libby and Apple Books.",
  alternates: { canonical: "/aura" },
  openGraph: {
    title: "Aura — Audiobooks & Podcasts in Pure Light",
    description:
      "A serene, native iOS player for timeless public domain classics and open podcasts. Free, zero paywalls, no login required.",
    url: "https://www.jeffhogg.com/aura",
    images: ["/images/projects/aura.png"],
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
            iOS Application • Live on the App Store
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Aura
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 font-serif italic max-w-xl mx-auto">
            Audiobooks &amp; Podcasts in Pure Light
          </p>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A high-craft, native iOS audio listening app for timeless literature and podcasts, inspired by the serene, editorial design of Libby and Apple Books. Completely free, with no waitlists, subscriptions, or login required.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://apps.apple.com/app/aura-audiobooks-podcasts/id6823766817"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.98 1.71-.85 2.73.99.08 2.02-.51 2.56-1.23z" />
              </svg>
              Download on the App Store
            </a>
            <a
              href="https://github.com/jeffreyehogg/aura"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/80 border border-white/[0.1] hover:border-white/[0.2] text-slate-200 hover:text-white text-sm font-medium transition-colors"
            >
              Source on GitHub ↗
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-4">
            <Link
              href="/aura/privacy"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/aura/support"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Support &amp; FAQ
            </Link>
          </div>
        </div>

        {/* App Store Preview Showcase */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl shadow-black/60 mb-14 bg-slate-950">
          <Image
            src="/images/projects/aura.png"
            alt="Aura iOS App Store screens — Discover, Podcast Detail, and Now Playing"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
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
