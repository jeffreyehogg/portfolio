import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ClockIcon,
  CloudArrowUpIcon,
  HeartIcon,
  SparklesIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Tend — Baby Tracker & First Foods",
  description:
    "100% free baby tracker & first foods guide. Log nursing, bottles, naps, diapers, and 66 starter foods in one tap—no login, no subscriptions, no ads.",
  alternates: { canonical: "/tend" },
  openGraph: {
    title: "Tend — Baby Tracker & First Foods",
    description:
      "100% free baby tracker & first foods guide. Log nursing, bottles, naps, diapers, and 66 starter foods in one tap—no login, no subscriptions, no ads.",
    url: "https://www.jeffhogg.com/tend",
    images: ["/tend/banner.png"],
  },
};

const features = [
  {
    icon: HeartIcon,
    accent: "terracotta",
    title: "One-Tap Today Dashboard",
    description:
      "Log Nurse, Bottle, Solids, and Diaper in a single tap with live wake window tracking and 24-hour wet & dirty diaper counts.",
  },
  {
    icon: ClockIcon,
    accent: "sage",
    title: "Persistent Live Nursing & Nap Timers",
    description:
      "Background-safe nursing and sleep stopwatches survive app closes and screen locks, paired with quiet local feed reminders.",
  },
  {
    icon: SparklesIcon,
    accent: "terracotta",
    title: "66 Starter Foods & 21 Allergen-Tagged Foods",
    description:
      "Covers all 9 major allergens with safe-exposure counts, age-matched 6m / 9m / 12m+ prep tips, and reaction flags.",
  },
  {
    icon: CloudArrowUpIcon,
    accent: "sage",
    title: "Private iCloud Sync & 1-Tap Handoff",
    description:
      "Automatic private iCloud sync across your own devices, optional shared iCloud Drive file sync for partners, and a 1-tap Handoff snapshot.",
  },
] as const;

const screenshots = [
  {
    src: "/tend/01_today.png",
    title: "Today Overview",
    caption: "Last feed, wake window & 24h diaper counts",
  },
  {
    src: "/tend/02_first_foods.png",
    title: "First Foods & Allergens",
    caption: "66 starter foods & Big 9 allergen tracking",
  },
  {
    src: "/tend/03_live_timer.png",
    title: "Live Nursing Timer",
    caption: "Persistent timers across screen locks",
  },
  {
    src: "/tend/04_prep_guide.png",
    title: "Age-Matched Prep Guide",
    caption: "6m, 9m & 12m+ prep tips + reaction flags",
  },
  {
    src: "/tend/05_baby_vitals.png",
    title: "Baby, Vitals & Sharing",
    caption: "Private iCloud, Partner Handoff & vitals",
  },
] as const;

const faqs = [
  {
    question: "How does partner sync work?",
    answer:
      "Tend offers two modes: automatic private iCloud sync across your own Apple ID devices, plus optional shared iCloud Drive file sync between two different Apple IDs. You can also send a 1-tap Handoff text snapshot via Messages or the iOS Share sheet.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No account, no subscription, and no ads. Open Tend and begin logging immediately—your data stays on your devices and in your private iCloud.",
  },
  {
    question: "How do age-matched food prep tips work?",
    answer:
      "Setting your baby's birthdate in Baby & Settings automatically highlights 6–8m, 9–11m, or 12m+ preparation guidance across all 66 curated starter foods.",
  },
  {
    question: "How do I turn feed reminders on or off?",
    answer:
      "Open the Baby & Settings tab → Feed Reminder → choose Off or an interval between 1.5 and 4 hours. Reminders are scheduled quietly on-device.",
  },
] as const;

export default function TendPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2421] relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle warm ambient washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[46rem] h-[26rem] rounded-full bg-[#6BA885]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#DE826E]/15 blur-3xl"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2.5 rounded-[28px] bg-gradient-to-br from-[#6BA885]/30 to-[#DE826E]/30 blur-xl"
              />
              <Image
                src="/tend/app-icon.png"
                alt="Tend app icon"
                width={88}
                height={88}
                priority
                className="relative rounded-[22px] border border-[#E6DFD3] shadow-xl shadow-[#1F2421]/10"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF3EE] border border-[#6BA885]/30 text-[#3D6B52] text-xs font-semibold tracking-wide mb-4">
            iOS 18+ • Baby Care &amp; First Foods
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2421] tracking-tight text-balance">
            Tend
          </h1>

          <p className="mt-3 text-lg sm:text-xl text-[#3D6B52] font-serif italic max-w-xl mx-auto">
            100% Free. Calm Baby Care.
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#4B524E] max-w-2xl mx-auto leading-relaxed text-pretty">
            Log nursing, bottles, naps, diapers, and 66 starter foods in one tap—even at 2 a.m. No sign-up, no login, no subscriptions, and no ads.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <span
              aria-disabled="true"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#1F2421] text-[#FAF7F2] font-semibold text-sm shadow-md shadow-[#1F2421]/10 cursor-default"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.98 1.71-.85 2.73.99.08 2.02-.51 2.56-1.23z" />
              </svg>
              Coming Soon to the App Store
            </span>

            <a
              href="#support"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 border border-[#E6DFD3] hover:border-[#6BA885]/60 text-[#1F2421] text-sm font-medium transition-colors"
            >
              Support &amp; FAQ
            </a>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 text-xs font-medium">
            <Link
              href="/tend/privacy"
              className="text-[#3D6B52] hover:text-[#2B4E3B] underline underline-offset-4"
            >
              Privacy Policy &amp; Disclaimer
            </Link>
            <span className="text-[#C8C0B4]">•</span>
            <Link
              href="/donate"
              className="text-[#B85441] hover:text-[#984232] underline underline-offset-4"
            >
              Support This App
            </Link>
            <span className="text-[#C8C0B4]">•</span>
            <Link
              href="/"
              className="text-[#636B66] hover:text-[#1F2421] transition-colors"
            >
              jeffhogg.com
            </Link>
          </div>
        </header>

        {/* Hero Preview Showcase */}
        <div className="relative aspect-[2400/1254] w-full rounded-2xl overflow-hidden border border-[#E6DFD3] shadow-xl shadow-[#1F2421]/10 mb-14 bg-[#0D211A]">
          <Image
            src="/tend/banner.png"
            alt="Tend — 100% Free. Calm Baby Care. Feeds, naps, diapers & 66 starter foods on iOS"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* Feature Overview (4 cards) */}
        <section aria-labelledby="features-heading" className="mb-16">
          <div className="mb-6">
            <h2
              id="features-heading"
              className="text-2xl font-bold text-[#1F2421] tracking-tight"
            >
              Built for Calm, One-Handed Care
            </h2>
            <p className="text-sm text-[#636B66] mt-1">
              Everything you need from newborn feeds through 12-month first foods—without clutter or accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isTerracotta = feature.accent === "terracotta";
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-white/85 border border-[#E6DFD3] shadow-sm hover:border-[#D4C9B8] transition-colors"
                >
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 border ${
                      isTerracotta
                        ? "bg-[#FBEDE9] border-[#DE826E]/35 text-[#B85441]"
                        : "bg-[#EBF3EE] border-[#6BA885]/35 text-[#3D6B52]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1F2421] mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#4B524E] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Screenshot Showcase Grid */}
        <section aria-labelledby="screenshots-heading" className="mb-16">
          <div className="mb-6">
            <h2
              id="screenshots-heading"
              className="text-2xl font-bold text-[#1F2421] tracking-tight"
            >
              Inside Tend
            </h2>
            <p className="text-sm text-[#636B66] mt-1">
              Designed in SwiftUI for effortless 2 a.m. readability and fast daily logging.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {screenshots.map((shot) => (
              <figure
                key={shot.src}
                className="group rounded-2xl bg-white/85 border border-[#E6DFD3] p-2.5 shadow-sm hover:border-[#6BA885]/50 transition-colors"
              >
                <div className="overflow-hidden rounded-[16px] border border-[#E6DFD3] bg-[#141717]">
                  <Image
                    src={shot.src}
                    alt={`Tend ${shot.title} screen — ${shot.caption}`}
                    width={1320}
                    height={2868}
                    className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 190px"
                  />
                </div>
                <figcaption className="mt-2.5 px-1">
                  <div className="text-xs font-semibold text-[#1F2421]">
                    {shot.title}
                  </div>
                  <div className="text-[11px] text-[#636B66] leading-snug mt-0.5">
                    {shot.caption}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Support & FAQ Section */}
        <section
          id="support"
          aria-labelledby="support-heading"
          className="rounded-2xl bg-white/90 border border-[#E6DFD3] p-6 sm:p-8 shadow-sm mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6DFD3]">
            <div>
              <h2
                id="support-heading"
                className="text-2xl font-bold text-[#1F2421] tracking-tight"
              >
                Support &amp; Frequently Asked Questions
              </h2>
              <p className="text-sm text-[#636B66] mt-1">
                Questions about partner sync, reminders, or food prep guidance?
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#3D6B52] hover:bg-[#325944] text-white text-sm font-semibold transition-colors shrink-0"
            >
              <EnvelopeIcon className="w-4 h-4" />
              Contact Support
            </Link>
          </div>

          <div className="divide-y divide-[#EFE9DF]">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5 first:pt-6 last:pb-1">
                <h3 className="text-base font-semibold text-[#1F2421] mb-1.5">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#4B524E] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sub-page Footer Links */}
        <div className="border-t border-[#E6DFD3] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#636B66] gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-medium text-[#4B524E] hover:text-[#1F2421] transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Back to jeffhogg.com
          </Link>
          <div className="flex items-center gap-6 font-medium">
            <Link
              href="/tend/privacy"
              className="inline-flex items-center gap-1.5 text-[#3D6B52] hover:text-[#2B4E3B] transition-colors"
            >
              <ShieldCheckIcon className="w-4 h-4" />
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#1F2421] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
