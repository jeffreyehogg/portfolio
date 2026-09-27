import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { funds } from "@/db/schema";
import { DollarSign, TrendingUp, ShieldCheck, HeartHandshake, Eye, Sparkles } from "lucide-react";
import { DonationButton } from "./donation-button";
import { GivingCalculator } from "./giving-calculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kingdom Fund | Transparent Mission Crowdfunding",
  description:
    "Practice joyful, radical stewardship. 100% of every dollar directly funds verified church projects and outreach missions with total financial integrity.",
};

export default async function KingdomFundPage() {
  const fundList = await db.select().from(funds);

  // Schema.org DonateAction structured data
  const donateSchemas = fundList.map((fund) => ({
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: fund.title,
    description: fund.description,
    price: fund.goal / 100,
    priceCurrency: "USD",
    recipient: {
      "@type": "Organization",
      name: "Kingdom Connect Fund",
      url: "https://kingdom.jeffhogg.com/fund",
    },
  }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {donateSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(donateSchemas) }}
        />
      )}

      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono uppercase tracking-wider mb-3 font-bold border border-emerald-200">
            <DollarSign className="w-3.5 h-3.5" /> Generosity with 100% Direct Impact
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Kingdom Fund
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;{" "}
            <span className="font-serif italic font-semibold text-emerald-900">— 2 Corinthians 9:7</span>
          </p>
        </div>

        {/* 3-Pillar Financial Integrity Assurance Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                100% Direct Outreach
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Zero administrative overhead deductions. Every cent goes to verified outreach.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Elder &amp; Pastoral Vetted
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Every project is prayerfully inspected and confirmed by local church leadership.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Real-Time Telemetry
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Transparent milestone tracking and community impact updates.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Feature: Kingdom Giving Impact Calculator */}
        <GivingCalculator primaryFundId={fundList[0]?.id || 1} />

        {/* Fund Campaigns Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Active Verified Initiatives
          </h2>

          {fundList.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                All initiatives currently funded!
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                Praise God for His provision. New verified community outreach projects will be published soon.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fundList.map((fund) => {
                const percentage = Math.min(
                  100,
                  Math.round(((fund.raised || 0) / fund.goal) * 100)
                );

                return (
                  <div
                    key={fund.id}
                    className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-7 hover:shadow-xl hover:border-emerald-200 card-hover-glow transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
                          <DollarSign className="h-6 w-6" />
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wide">
                          Verified Need
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-900 mb-2 leading-snug">
                        {fund.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                        {fund.description}
                      </p>
                    </div>

                    <div>
                      <div className="mb-6 pt-4 border-t border-slate-100">
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-2 font-mono">
                          <span>
                            ${((fund.raised || 0) / 100).toLocaleString()} raised
                          </span>
                          <span className="text-slate-500">
                            Goal: ${(fund.goal / 100).toLocaleString()}
                          </span>
                        </div>
                        <div
                          className="w-full bg-slate-100 rounded-full h-3 overflow-hidden"
                          role="progressbar"
                          aria-valuenow={percentage}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Funding progress for ${fund.title}`}
                        >
                          <div
                            className="bg-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-emerald-600 mt-2 font-bold font-mono flex items-center">
                          <TrendingUp className="h-3.5 w-3.5 mr-1" /> {percentage}% Funded
                        </p>
                      </div>

                      <DonationButton fundId={fund.id} fundTitle={fund.title} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
