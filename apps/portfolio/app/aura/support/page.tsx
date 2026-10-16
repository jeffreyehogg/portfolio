import type { Metadata } from "next";
import Link from "next/link";
import BackgroundBlobs from "../../../components/ui/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Aura Support & Help",
  description: "Customer support, troubleshooting, and frequently asked questions for Aura — Spoken Literature in Pure Light.",
  alternates: { canonical: "/aura/support" },
};

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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
          >
            ← Back to Aura
          </Link>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Aura Support & FAQ
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Assistance and common questions for Aura — Spoken Literature in Pure Light
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          {/* Quick Help Card */}
          <section className="p-4 sm:p-5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl">
            <h2 className="text-lg font-semibold text-white mb-2">Need direct help?</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              If you are encountering a bug, playback issue, or have a feature suggestion, reach out directly through the contact page:
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
              >
                Contact Support →
              </Link>
            </div>
          </section>

          {/* FAQs */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>

            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-base font-semibold text-white mb-1">
                Is Aura completely free?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Yes. Aura has no subscriptions, no paywalls, and no in-app purchases. All books available in Aura are public domain masterpieces recorded by volunteer narrators from LibriVox and the Internet Archive.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-base font-semibold text-white mb-1">
                Does Aura require an account or login?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                No. You can open Aura and begin listening immediately. Your playback positions, bookmarks, and saved library are stored securely and directly on your device using Apple&apos;s SwiftData framework.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-base font-semibold text-white mb-1">
                How does background playback and the sleep timer work?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Aura integrates natively with iOS. When you lock your screen, you can control playback, skip back or forward, and scrub directly from the iOS Lock Screen, Dynamic Island, Control Center, or your AirPods remote. The built-in Sleep Timer allows you to select 15m, 30m, 45m, 60m, or &ldquo;End of Chapter&rdquo;, gently fading the volume down over the last 20 seconds.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-base font-semibold text-white mb-1">
                What should I do if an audiobook fails to stream?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Aura streams directly from the Internet Archive and LibriVox servers. Ensure you have an active Wi-Fi or cellular internet connection. If a specific recording is temporarily unavailable on the archive servers, wait a few moments or try another chapter.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-base font-semibold text-white mb-1">
                How do I report an issue or suggest a feature?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Visit{" "}
                <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                  jeffhogg.com/contact
                </Link>{" "}
                and describe the behavior or book title. We read and respond to all feedback!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
