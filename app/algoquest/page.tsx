import type { Metadata } from "next";
import Link from "next/link";
import {
  CodeBracketIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import BackgroundBlobs from "../../components/ui/BackgroundBlobs";

export const metadata: Metadata = {
  title: "AlgoQuest — Swift & Python Coding Puzzles",
  description:
    "Master Swift, Python, and core algorithms through bite-sized dungeon quests, live data-structure visualizers, and daily puzzles—100% free and offline on iPhone.",
  alternates: { canonical: "/algoquest" },
};

const features = [
  {
    icon: CodeBracketIcon,
    title: "Dual-Mode iPhone Editor",
    description:
      "Tap Smart Token chips for effortless one-handed coding on iPhone, or toggle to the full monospace code editor with a custom symbol bar anytime.",
  },
  {
    icon: CpuChipIcon,
    title: "Instant Offline Swift & Python Sandbox",
    description:
      "Runs real Swift and Python code completely on-device with zero latency, step-by-step execution tracing, and built-in infinite-loop protection.",
  },
  {
    icon: SparklesIcon,
    title: "5 Worlds, Bug Hunts, Traces & Daily Runes",
    description:
      "Master variables, loops, stacks, two-pointers, hash maps, binary search, prefix sums, and sliding windows across handcrafted quests.",
  },
  {
    icon: ShieldCheckIcon,
    title: "100% Free & Private by Design",
    description:
      "No accounts, no ads, no subscriptions, and zero data collection. Your progress stays strictly on your device.",
  },
] as const;

export default function AlgoQuestPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <BackgroundBlobs />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-slate-300">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
            Native iOS App • SwiftUI + SpriteKit
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            AlgoQuest
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Master Swift, Python, and core computer science algorithms through tactile dungeon quests, live data-structure visualizers, and daily puzzles—100% free and offline.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/algoquest/privacy"
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm font-medium hover:border-emerald-500/50 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-medium hover:bg-emerald-500/25 transition-colors"
            >
              Support &amp; Feedback
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
            >
              <item.icon className="w-7 h-7 text-emerald-400 mb-3" />
              <h2 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
