import type { Metadata } from "next";
import Link from "next/link";
import BackgroundBlobs from "../../../components/ui/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Aura Support & Help",
  description: "Customer support, troubleshooting, and frequently asked questions for Aura — Audiobooks & Podcasts.",
  alternates: { canonical: "/aura/support" },
};

const faqs = [
  {
    question: "Is Aura completely free?",
    answer:
      "Yes. Aura has no subscriptions, no paywalls, and no in-app purchases. All audiobooks in Aura are public-domain classics recorded by volunteer narrators from LibriVox and the Internet Archive, and podcasts are streamed directly from open public RSS feeds.",
  },
  {
    question: "Where does the content come from?",
    answer:
      "Audiobooks are sourced from the LibriVox open catalog and the Internet Archive. Podcasts are discovered using Apple's iTunes Search API and streamed directly from the original creators' RSS audio feeds.",
  },
  {
    question: "Does Aura require an account or login?",
    answer:
      "No. You can open Aura and begin listening immediately. Your playback positions, bookmarks, and saved library are stored securely and directly on your device using Apple's SwiftData framework.",
  },
  {
    question: "How do Offline Downloads and Auto-Cleanup work?",
    answer:
      "Tap the download button on any audiobook page to cache the entire book, or tap the download button on an individual podcast episode row to save it for flights and commutes. Downloaded items are automatically added to your Library and cleaned up automatically once you finish an episode or complete an audiobook.",
  },
  {
    question: "How do I enable New Episode Alerts for a podcast?",
    answer:
      "Open any podcast detail page and tap the bell icon in the top action bar. Aura uses on-device local notifications (UNUserNotificationCenter) to alert you when background sync detects a newly published episode—no account or external push server required.",
  },
  {
    question: "Does Aura support CarPlay, Apple Watch, Widgets, and Siri?",
    answer:
      "Yes. Aura includes a CarPlay audio interface for in-car browsing and playback, a watchOS companion app (AuraWatch) synced over WatchConnectivity, Home Screen and Lock Screen widgets, Dynamic Island & Lock Screen controls, and Siri voice shortcuts such as \"Resume in Aura\".",
  },
  {
    question: "How does background playback and the sleep timer work?",
    answer:
      "Aura integrates natively with iOS. When you lock your screen, you can control playback, skip back or forward, and scrub directly from the Lock Screen, Dynamic Island, Control Center, or your AirPods remote. The built-in Sleep Timer lets you pick 15m, 30m, 45m, 60m, or \"End of Chapter\", gently fading volume out over the final 20 seconds.",
  },
  {
    question: "What should I do if an audiobook or episode fails to stream?",
    answer:
      "Aura streams directly from Internet Archive, LibriVox, and podcast publisher servers. Ensure you have an active Wi-Fi or cellular connection, or download chapters offline before traveling. If a specific remote recording is temporarily unavailable, wait a few moments or try another chapter.",
  },
];

export default function AuraSupport() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <BackgroundBlobs />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-slate-300">
        {/* Header Breadcrumb / Tag */}
        <div className="mb-8">
          <Link
            href="/aura"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors"
          >
            ← Back to Aura
          </Link>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Aura Support &amp; FAQ
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Assistance and common questions for Aura — Audiobooks &amp; Podcasts
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          {/* Quick Help Card */}
          <section className="p-4 sm:p-5 bg-amber-950/25 border border-amber-500/30 rounded-xl">
            <h2 className="text-lg font-semibold text-white mb-2">Need direct help?</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              If you are encountering a bug, playback issue, or have a feature suggestion, reach out directly through the contact page:
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold transition-colors shadow-lg shadow-amber-500/20"
              >
                Contact Support →
              </Link>
            </div>
          </section>

          {/* FAQs */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>

            {faqs.map((item) => (
              <div key={item.question} className="border-t border-slate-800 pt-4">
                <h3 className="text-base font-semibold text-white mb-1">
                  {item.question}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}

            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-base font-semibold text-white mb-1">
                How do I report an issue or suggest a feature?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Visit{" "}
                <Link href="/contact" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
                  jeffhogg.com/contact
                </Link>{" "}
                and describe the behavior or title. We read and respond to all feedback!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
