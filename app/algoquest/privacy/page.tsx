import type { Metadata } from "next";
import Link from "next/link";
import BackgroundBlobs from "../../../components/ui/BackgroundBlobs";

export const metadata: Metadata = {
  title: "AlgoQuest Privacy Policy",
  description:
    "Privacy policy for AlgoQuest — Swift & Python Algorithmic Coding Puzzles for iOS.",
  alternates: { canonical: "/algoquest/privacy" },
};

export default function AlgoQuestPrivacy() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <BackgroundBlobs />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-slate-300">
        <div className="mb-8">
          <Link
            href="/algoquest"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
          >
            ← Back to AlgoQuest
          </Link>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy for AlgoQuest
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Effective Date: November 22, 2026 • Last updated: November 22, 2026
          </p>
        </div>

        <div className="space-y-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Overview &amp; Core Philosophy
            </h2>
            <p className="leading-relaxed">
              <strong>AlgoQuest</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the app&rdquo;) is designed to be 100% private, offline-first, and completely free. Learning algorithms and coding should never require handing over your personal data.
            </p>
            <p className="mt-3 leading-relaxed">
              AlgoQuest requires <strong>no account creation</strong>, no email registration, contains no ads or third-party analytics SDKs, and does not track you across apps or websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Information We Do Not Collect
            </h2>
            <p className="leading-relaxed">
              AlgoQuest does not collect, transmit, or sell:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
              <li>Names, email addresses, or contact information.</li>
              <li>Location data or GPS coordinates.</li>
              <li>Device identifiers (IDFA), behavioral analytics, or crash telemetry.</li>
              <li>Code you write inside the app (all Swift &amp; Python code executes locally in an on-device sandbox).</li>
              <li>Financial or payment information (AlgoQuest is free with no in-app purchases).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. On-Device Local Data Storage
            </h2>
            <p className="leading-relaxed">
              AlgoQuest stores your game progress exclusively on your device using Apple&apos;s SwiftData framework:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
              <li>Completed quests, 3-star mastery ratings, XP, ranks, and unlocked badges.</li>
              <li>Daily Rune completion records and daily play streaks.</li>
              <li>Per-level Swift and Python code drafts and unlocked hint tiers.</li>
              <li>App preferences (preferred language, hero theme, haptic feedback toggle).</li>
            </ul>
            <p className="mt-3 leading-relaxed text-sm text-slate-400">
              This data never leaves your device and is never sent to external servers. You can clear it at any time from Profile &amp; Settings inside the app or by uninstalling AlgoQuest.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Children&apos;s Privacy
            </h2>
            <p className="leading-relaxed">
              AlgoQuest complies with the Children&apos;s Online Privacy Protection Act (COPPA). Because the app collects no personal information whatsoever, it is safe for learners of all ages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Contact &amp; Support
            </h2>
            <p className="leading-relaxed">
              If you have questions, bug reports, or feedback regarding AlgoQuest or this Privacy Policy, please contact:
            </p>
            <div className="mt-3 p-4 bg-slate-800/50 rounded-lg text-sm border border-slate-700/60">
              <p className="font-medium text-white">Jeff Hogg</p>
              <p className="text-slate-400 mt-1">
                Developer of AlgoQuest •{" "}
                <Link
                  href="/contact"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  jeffhogg.com/contact
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
