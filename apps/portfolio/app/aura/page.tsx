import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownTrayIcon,
  BellAlertIcon,
  BoltIcon,
  BookmarkIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import BackgroundBlobs from "../../components/ui/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Aura — Audiobooks & Podcasts",
  description:
    "A native iOS and watchOS listening app for classic public-domain audiobooks and top podcasts. Stream or download offline—100% free, zero ads, no login required.",
  alternates: { canonical: "/aura" },
  openGraph: {
    title: "Aura — Audiobooks & Podcasts",
    description:
      "Stream or download timeless literature and top podcasts with a calm, distraction-free listening experience. 100% free, no login or ads.",
    url: "https://www.jeffhogg.com/aura",
    images: ["/images/projects/aura.png"],
  },
};

const screenshots = [
  {
    src: "/images/projects/aura/discover.png",
    title: "Discover",
    caption: "Editorial shelves & rotating spotlight",
  },
  {
    src: "/images/projects/aura/detail.png",
    title: "Book & Podcast Detail",
    caption: "One-tap offline downloads & alerts",
  },
  {
    src: "/images/projects/aura/now-playing.png",
    title: "Now Playing",
    caption: "Cover-derived warm ambient lighting",
  },
  {
    src: "/images/projects/aura/search.png",
    title: "Search",
    caption: "Instant audiobook & podcast discovery",
  },
  {
    src: "/images/projects/aura/library.png",
    title: "Library",
    caption: "Continue Listening, saved shows & bookmarks",
  },
] as const;

const features = [
  {
    icon: BoltIcon,
    title: "Instant, Account-Free Playback",
    description:
      "Tap once and listen. No email sign-ups, passwords, subscriptions, or ads—start enjoying timeless literature and podcasts immediately.",
  },
  {
    icon: ArrowDownTrayIcon,
    title: "Offline Downloads & Auto-Cleanup",
    description:
      "Cache entire audiobooks or individual podcast episodes in one tap for flights and commutes. Finished audio cleans itself up automatically.",
  },
  {
    icon: BellAlertIcon,
    title: "Per-Show New Episode Alerts",
    description:
      "Opt into quiet, on-device notifications on any podcast show page so you know the moment a new episode publishes—no account or push server needed.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "CarPlay, Apple Watch, Widgets & Siri",
    description:
      "Seamless playback across iOS, watchOS companion app, CarPlay audio templates, Home & Lock Screen widgets, Dynamic Island, and Siri voice shortcuts.",
  },
  {
    icon: SparklesIcon,
    title: "Dynamic Lighting & Tactile Haptics",
    description:
      "Soft atmospheric backdrops derived from active cover art meet a tactile scrubber with micro-haptic ticks, variable speeds (0.75x–2x), and Smart Rewind.",
  },
  {
    icon: BookmarkIcon,
    title: "On-Device SwiftData Privacy & Bookmarks",
    description:
      "Multi-item Continue Listening queues, timestamped bookmarks, and 20-second fadeout sleep timers stay strictly private on your Apple devices.",
  },
] as const;

export default function AuraPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <BackgroundBlobs />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-slate-300">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-amber-500/25 blur-xl pointer-events-none" />
              <Image
                src="/images/projects/aura-icon.png"
                alt="Aura app icon"
                width={84}
                height={84}
                priority
                className="relative rounded-[20px] border border-amber-400/30 shadow-2xl shadow-amber-950/60"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-medium mb-4">
            iOS &amp; watchOS Application • Live on the App Store
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Aura
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-amber-300/95 font-serif italic max-w-xl mx-auto">
            Classic Audiobooks &amp; Top Podcasts. 100% Free.
          </p>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stream or download timeless public-domain literature and top podcasts in a calm, editorial listening experience. Built natively in Swift 6 with offline downloads, per-show new episode alerts, CarPlay, Apple Watch, Widgets, and Siri—with zero logins or ads.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://apps.apple.com/app/aura-audiobooks-podcasts/id6823766817"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/80 border border-white/[0.1] hover:border-amber-400/40 text-slate-200 hover:text-white text-sm font-medium transition-colors"
            >
              Source on GitHub ↗
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-4">
            <Link
              href="/aura/privacy"
              className="text-xs font-medium text-amber-400 hover:text-amber-300 underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/aura/support"
              className="text-xs font-medium text-amber-400 hover:text-amber-300 underline underline-offset-4"
            >
              Support &amp; FAQ
            </Link>
          </div>
        </div>

        {/* Hero Preview Showcase */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/60 mb-14 bg-slate-950">
          <Image
            src="/images/projects/aura.png"
            alt="Aura iOS App Store screens — Detail, Discover, and Now Playing"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* App Store Screenshots Gallery */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                App Store Screenshots
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Warm editorial surfaces crafted with SwiftUI and SwiftData for distraction-free listening.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {screenshots.map((shot) => (
              <figure
                key={shot.src}
                className="group rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-amber-500/35 p-2.5 transition-colors"
              >
                <div className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-black">
                  <Image
                    src={shot.src}
                    alt={`Aura ${shot.title} screen — ${shot.caption}`}
                    width={660}
                    height={1434}
                    className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 190px"
                  />
                </div>
                <figcaption className="mt-2.5 px-1">
                  <div className="text-xs font-semibold text-white">
                    {shot.title}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                    {shot.caption}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Feature Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6">
            Built for Focused Listening
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 rounded-2xl backdrop-blur-sm transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Legal & App Store Links Footer */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Jeff Hogg. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/aura/privacy" className="hover:text-amber-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/aura/support" className="hover:text-amber-300 transition-colors">
              Support
            </Link>
            <Link href="/contact" className="hover:text-amber-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
