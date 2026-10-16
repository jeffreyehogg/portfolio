import type { Metadata } from "next";
import Link from "next/link";
import BackgroundBlobs from "../../../components/ui/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Aura Privacy Policy",
  description: "Privacy policy for Aura — Spoken Literature in Pure Light iOS application.",
  alternates: { canonical: "/aura/privacy" },
};

export default function AuraPrivacy() {
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
            Privacy Policy for Aura
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Effective Date: October 16, 2026 • Last updated: October 16, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Overview & Core Philosophy</h2>
            <p className="leading-relaxed">
              <strong>Aura</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the app&rdquo;) is built on a principle of total privacy. We believe that enjoying great public-domain literature should not come at the expense of your personal data.
            </p>
            <p className="mt-3 leading-relaxed">
              Aura requires <strong>no account creation</strong>, no email registration, and does not track you across apps or websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Do Not Collect</h2>
            <p className="leading-relaxed">Aura does not collect, transmit, or sell:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
              <li>Names, email addresses, or contact information.</li>
              <li>Location data or GPS coordinates.</li>
              <li>Device identifiers (IDFA) or ad-tracking tokens.</li>
              <li>Financial or payment information (Aura is free and contains no in-app purchases).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. On-Device Local Data Storage</h2>
            <p className="leading-relaxed">
              To provide a seamless listening experience, Aura stores your personal reading progress locally on your Apple device using Apple&apos;s SwiftData framework:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
              <li>Your saved books and shelves.</li>
              <li>Playback timestamps down to the second (for resume capability).</li>
              <li>User-created bookmarks and notes.</li>
              <li>Player preferences (playback speed, sleep timer settings).</li>
            </ul>
            <p className="mt-3 leading-relaxed text-sm text-slate-400">
              This data resides exclusively on your local device. It is never uploaded to external servers or accessible by third parties. You can delete this data at any time by removing books from your library or uninstalling the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Content Services</h2>
            <p className="leading-relaxed">
              Aura streams public domain audio and metadata directly from open catalogs:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
              <li>
                <strong>LibriVox API:</strong> Used for catalog searches and chapter metadata.
              </li>
              <li>
                <strong>Internet Archive:</strong> Hosts public domain audio recordings and cover imagery.
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-sm text-slate-400">
              When querying or streaming audio, your device establishes a standard HTTPS connection with these open services. We do not transmit any personal identifiers or analytics to these services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Children&apos;s Privacy</h2>
            <p className="leading-relaxed">
              Aura complies with the Children&apos;s Online Privacy Protection Act (COPPA). Because the app collects no personal information whatsoever, it is safe for users of all ages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Contact & Inquiries</h2>
            <p className="leading-relaxed">
              If you have any questions or feedback regarding this Privacy Policy, please contact:
            </p>
            <div className="mt-3 p-4 bg-slate-800/50 rounded-lg text-sm border border-slate-700/60">
              <p className="font-medium text-white">Jeff Hogg</p>
              <p className="text-slate-400 mt-1">
                Developer of Aura •{" "}
                <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
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
