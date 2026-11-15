import type { Metadata } from "next";
import Link from "next/link";
import { ExclamationTriangleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Tend Privacy Policy & Medical Disclaimer",
  description:
    "Plain-English privacy policy and non-medical choking-prevention disclaimer for Tend — Baby Care & First Foods Log for iOS.",
  alternates: { canonical: "/tend/privacy" },
  openGraph: {
    title: "Tend Privacy Policy & Medical Disclaimer",
    description:
      "Tend collects zero personal data, requires no account, and stores your baby logs on-device and in your private Apple iCloud.",
    url: "https://www.jeffhogg.com/tend/privacy",
  },
};

export default function TendPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2421] relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] h-[22rem] rounded-full bg-[#6BA885]/12 blur-3xl"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/tend"
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF3EE] border border-[#6BA885]/35 text-[#3D6B52] text-xs font-semibold hover:bg-[#DFECE4] transition-colors"
          >
            ← Back to Tend
          </Link>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
            Privacy Policy for Tend
          </h1>
          <p className="mt-2 text-sm text-[#636B66]">
            Effective Date: November 14, 2026
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 bg-white/90 border border-[#E6DFD3] rounded-2xl p-6 sm:p-8 shadow-sm">
          <section>
            <div className="flex items-center gap-2.5 mb-2.5">
              <ShieldCheckIcon className="w-5 h-5 text-[#3D6B52] shrink-0" />
              <h2 className="text-xl font-semibold text-[#1F2421]">
                1. Zero Data Collection by Developer
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#4B524E] leading-relaxed">
              <strong>Tend</strong> (&ldquo;the app&rdquo;) does not collect, sell, track, or transmit your personal information, baby care logs, or usage analytics to Jeff Hogg or any third party. There are no user accounts, no advertising networks, and no third-party tracking SDKs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2421] mb-2.5">
              2. On-Device &amp; Private iCloud Storage
            </h2>
            <p className="text-sm sm:text-base text-[#4B524E] leading-relaxed">
              All feeding, sleep, diaper, food introduction, and vitals logs are stored locally on your device using Apple&apos;s <strong>SwiftData</strong> and <strong>UserDefaults</strong> frameworks. When iCloud is enabled on your Apple device, your data syncs across your own devices via your private Apple iCloud (CloudKit) container, governed by Apple&apos;s iCloud privacy and security protections. The developer has no access to your private iCloud container.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2421] mb-2.5">
              3. Optional Partner Sync &amp; Exports
            </h2>
            <p className="text-sm sm:text-base text-[#4B524E] leading-relaxed">
              If you explicitly choose to share a <strong>1-Tap Handoff</strong> text snapshot or connect a <strong>Shared iCloud Drive Sync File</strong> with a partner&apos;s Apple ID, that information stays strictly within your chosen Apple iCloud Drive share or your device&apos;s Messages/Share sheet transfer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2421] mb-2.5">
              4. Local Notifications
            </h2>
            <p className="text-sm sm:text-base text-[#4B524E] leading-relaxed">
              Optional feeding reminders are scheduled strictly on-device using Apple&apos;s <code className="px-1.5 py-0.5 rounded bg-[#F2EDE4] text-[#3D6B52] text-xs font-mono">UserNotifications</code> framework. Tend does not use remote push notification servers or device push tokens.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2421] mb-2.5">
              5. Data Deletion
            </h2>
            <p className="text-sm sm:text-base text-[#4B524E] leading-relaxed">
              You remain in complete control of your data at all times. You can delete individual entries inside the app, and deleting Tend from your device along with removing its iCloud data in iOS Settings permanently removes your data.
            </p>
          </section>

          {/* Non-Medical & Choking-Prevention Disclaimer */}
          <section className="rounded-xl bg-[#FBEDE9] border border-[#DE826E]/45 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-[#B85441] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-bold text-[#7A3022] mb-2">
                  6. Non-Medical &amp; Choking-Prevention Disclaimer
                </h2>
                <p className="text-sm text-[#5C3128] leading-relaxed">
                  Tend is an informational personal care log and general food-preparation reference. It does <strong>not</strong> provide medical advice, diagnosis, or treatment, and is not a substitute for professional pediatric care. Always supervise meals closely, ensure your baby is seated upright and developmentally ready for solids, and consult your pediatrician for personalized guidance on allergen introduction, feeding schedules, and choking prevention.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-[#1F2421] mb-2.5">
              7. Contact
            </h2>
            <p className="text-sm sm:text-base text-[#4B524E] leading-relaxed">
              If you have questions about this Privacy Policy or Tend, please reach out:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#E6DFD3] text-sm">
              <p className="font-semibold text-[#1F2421]">Jeff Hogg</p>
              <p className="text-[#4B524E] mt-1">
                Developer of Tend •{" "}
                <Link
                  href="/contact"
                  className="text-[#3D6B52] hover:text-[#2B4E3B] font-medium underline underline-offset-2"
                >
                  jeffhogg.com/contact
                </Link>
              </p>
            </div>
          </section>
        </div>

        {/* Footer Nav */}
        <div className="mt-8 flex items-center justify-between text-xs text-[#636B66]">
          <Link href="/tend" className="hover:text-[#1F2421] transition-colors font-medium">
            ← Tend App &amp; Support
          </Link>
          <Link href="/" className="hover:text-[#1F2421] transition-colors font-medium">
            Back to jeffhogg.com
          </Link>
        </div>
      </div>
    </div>
  );
}
