import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { prayerRequests, prayerInteractions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { PrayerCard } from "./prayer-card";
import { PrayerForm } from "./prayer-form";
import { Heart, Sparkles } from "lucide-react";
import { ScriptureAnchor } from "./scripture-anchor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Prayer Wall | Holy Intercession",
  description:
    "Bear one another's burdens in faith. Share your prayer petitions and stand in holy intercession for brothers and sisters across our community.",
};

export default async function PrayerWallPage() {
  const { userId } = await auth();

  // Fetch Requests
  const requests = await db
    .select()
    .from(prayerRequests)
    .orderBy(desc(prayerRequests.createdAt));

  // Fetch IDs of requests the current user has prayed for
  let userPrayedIds: number[] = [];
  if (userId) {
    const interactions = await db
      .select({ requestId: prayerInteractions.requestId })
      .from(prayerInteractions)
      .where(eq(prayerInteractions.userId, userId));
    userPrayedIds = interactions.map((i) => i.requestId || 0);
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Holy intercession</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Community prayer wall
          </h1>
          <p className="text-slate-600 mt-1.5 max-w-lg mx-auto text-sm leading-relaxed">
            Share petitions and stand in prayer for brothers and sisters across our community.
          </p>
        </div>

        {/* Interactive Feature: Scripture Promise Anchor Engine */}
        <ScriptureAnchor />

        {/* Prayer Input Form */}
        <PrayerForm />

        {/* Wall of Requests */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold text-slate-900">
              Community petitions ({requests.length})
            </h2>
            <span className="text-xs text-slate-500">
              Tap &ldquo;I&apos;ll Pray&rdquo; to stand in agreement
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">The altar is quiet</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                Be the first to share what is on your heart—whether for healing, peace, guidance, or thanksgiving.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {requests.map((req) => (
                <PrayerCard
                  key={req.id}
                  request={req}
                  hasPrayed={userPrayedIds.includes(req.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
