import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  BugAntIcon,
  CodeBracketIcon,
  CpuChipIcon,
  EnvelopeIcon,
  PlayCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import BackgroundBlobs from "../../components/ui/BackgroundBlobs";

export const metadata: Metadata = {
  title: "AlgoQuest — Code & Algorithms",
  description:
    "Learn Swift, Python, and core algorithms through playable dungeon quests and live data-structure visualizers—100% free, 100% offline, with no login, no ads, and no paywalls.",
  alternates: { canonical: "/algoquest" },
  openGraph: {
    title: "AlgoQuest — Code & Algorithms",
    description:
      "Learn Swift, Python, and core algorithms through playable dungeon quests—100% free, offline, no login, no ads.",
    url: "https://www.jeffhogg.com/algoquest",
    images: ["/algoquest/banner.png"],
  },
};

const screenshots = [
  {
    src: "/algoquest/01_quest_dungeon.png",
    title: "Dungeon Quests",
    caption: "Dual-mode Smart Tokens & full code editor",
  },
  {
    src: "/algoquest/02_binary_search.png",
    title: "Live Visualizers",
    caption: "Step-by-step O(log n) & data-structure state",
  },
  {
    src: "/algoquest/03_world_map.png",
    title: "5 Handcrafted Worlds",
    caption: "18 quests from variables to sliding windows",
  },
  {
    src: "/algoquest/04_trace_mode.png",
    title: "Bug Hunts & Traces",
    caption: "Read & Trace challenges + Daily Rune puzzles",
  },
  {
    src: "/algoquest/05_profile_themes.png",
    title: "Free Progression",
    caption: "Earn stars to unlock Hero Themes & badges",
  },
] as const;

const features = [
  {
    icon: CodeBracketIcon,
    title: "Dual-Mode iPhone Editor",
    description:
      "Tap Smart Tokens for effortless one-handed coding on iPhone, or switch to the full monospace code editor with a custom symbol bar anytime.",
  },
  {
    icon: PlayCircleIcon,
    title: "Step-by-Step Visual Debugger",
    description:
      "Play, pause, step, or rewind line-by-line (1x, 2x, 4x) as your SpriteKit hero and live data-structure visualizers update in real time.",
  },
  {
    icon: CpuChipIcon,
    title: "Swift & Python Tracks Offline",
    description:
      "Solve any quest in real Swift or Python inside a deterministic, pure-Swift AST sandbox with instant execution and 1,000-op loop protection.",
  },
  {
    icon: SparklesIcon,
    title: "5 Worlds & 18 Handcrafted Quests",
    description:
      "Master variables, loops, arrays, LIFO stacks, two-pointers, O(1) hash maps, O(log n) binary search, prefix sums, and sliding windows.",
  },
  {
    icon: BugAntIcon,
    title: "4 Puzzle Modes & Daily Rune",
    description:
      "Switch between Dungeon Quests, Bug Hunts, Read & Trace challenges, and a deterministic Daily Rune puzzle every day.",
  },
  {
    icon: ShieldCheckIcon,
    title: "100% Free & Private by Design",
    description:
      "No account, no paywalls, no ads, and zero tracking. Unlock every Hero Theme and badge purely with earned stars.",
  },
] as const;

const faqs = [
  {
    question: "Is AlgoQuest really 100% free and offline?",
    answer:
      "Yes. AlgoQuest has no subscriptions, no in-app purchases, no ads, and no login. All 5 worlds (18 quests) and the Daily Rune puzzle run completely offline on your iPhone.",
  },
  {
    question: "Can I write both Swift and Python?",
    answer:
      "Yes. Every quest supports both Swift and Python tracks, running inside a deterministic, pure-Swift sandboxed AST interpreter with instant feedback and static code-quality hints.",
  },
  {
    question: "How do I jump straight to advanced worlds or topics?",
    answer:
      "Tap the Profile icon in the top-right corner of the World Map and toggle on Practice Mode (Unlock All Quests) to explore any world or algorithm immediately.",
  },
  {
    question: "Does AlgoQuest collect any data or code I write?",
    answer:
      "No. Your code executes strictly on-device, and your progress, XP, streaks, and drafts are stored locally with Apple's SwiftData framework.",
  },
] as const;

export default function AlgoQuestPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <BackgroundBlobs />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-slate-300">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-emerald-500/25 blur-xl pointer-events-none" />
              <Image
                src="/algoquest/app-icon.png"
                alt="AlgoQuest app icon"
                width={84}
                height={84}
                priority
                className="relative rounded-[20px] border border-emerald-400/30 shadow-2xl shadow-emerald-950/60"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium mb-4">
            Native iOS App • SwiftUI + SpriteKit
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            AlgoQuest
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-emerald-300/95 font-medium max-w-xl mx-auto">
            Code Algorithms. Play Offline. Free.
          </p>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Learn Swift, Python, and core algorithms through playable dungeon quests and live data-structure visualizers—100% free, 100% offline, with no login, no ads, and no paywalls.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <span
              aria-disabled="true"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 cursor-default"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.98 1.71-.85 2.73.99.08 2.02-.51 2.56-1.23z" />
              </svg>
              Coming Soon to the App Store
            </span>
            <a
              href="#support"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/80 border border-white/[0.1] hover:border-emerald-400/40 text-slate-200 hover:text-white text-sm font-medium transition-colors"
            >
              Support &amp; FAQ
            </a>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 text-xs">
            <Link
              href="/algoquest/privacy"
              className="font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/donate"
              className="font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              Support Free Apps
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/"
              className="text-slate-400 hover:text-white transition-colors"
            >
              jeffhogg.com
            </Link>
          </div>
        </header>

        {/* Hero Preview Showcase */}
        <div className="relative aspect-[2400/1254] w-full rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-black/60 mb-14 bg-slate-950">
          <Image
            src="/algoquest/banner.png"
            alt="AlgoQuest — Code Algorithms. Play Offline. Free. Swift & Python coding puzzles on iOS"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* App Store Screenshots Gallery */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              App Store Screenshots
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Built for coding on iPhone with Smart Tokens, a live SpriteKit dungeon, and step-by-step data-structure visualizers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {screenshots.map((shot) => (
              <figure
                key={shot.src}
                className="group rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-emerald-500/35 p-2.5 transition-colors"
              >
                <div className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-black">
                  <Image
                    src={shot.src}
                    alt={`AlgoQuest ${shot.title} screen — ${shot.caption}`}
                    width={1320}
                    height={2868}
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
            Master Core CS Algorithms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 rounded-2xl backdrop-blur-sm transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
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

        {/* Support & FAQ Section */}
        <section
          id="support"
          className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Support &amp; Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Questions about Swift/Python tracks, Practice Mode, or offline execution?
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-semibold transition-colors shrink-0"
            >
              <EnvelopeIcon className="w-4 h-4" />
              Contact Support
            </Link>
          </div>

          <div className="divide-y divide-slate-800">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5 first:pt-6 last:pb-1">
                <h3 className="text-base font-semibold text-white mb-1.5">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-slate-300 transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Back to jeffhogg.com
          </Link>
          <div className="flex gap-6">
            <Link href="/algoquest/privacy" className="hover:text-emerald-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-emerald-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
