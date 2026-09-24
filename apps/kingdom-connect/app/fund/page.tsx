import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { funds } from "@/db/schema";
import { DollarSign, TrendingUp } from "lucide-react";
import { donateToFund } from "@/app/actions";

// Small client component for the button to interact with Server Action
import { DonationButton } from "./donation-button";

export default async function KingdomFundPage() {
  const fundList = await db.select().from(funds);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Kingdom Fund</h1>
          <p className="text-gray-600 mt-2">
            Directly support verified projects. 100% goes to the cause.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {fundList.map((fund) => {
            const percentage = Math.min(
              100,
              Math.round(((fund.raised || 0) / fund.goal) * 100)
            );

            return (
              <div
                key={fund.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Verified Need
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {fund.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {fund.description}
                </p>

                <div className="mb-6">
                  <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                    <span>
                      ${((fund.raised || 0) / 100).toLocaleString()} raised
                    </span>
                    <span className="text-gray-500">
                      Goal: ${(fund.goal / 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> {percentage}% Funded
                  </p>
                </div>

                <DonationButton fundId={fund.id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
