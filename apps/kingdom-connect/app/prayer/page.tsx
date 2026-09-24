import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { prayerRequests, prayerInteractions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { PrayerCard } from "./prayer-card";
import { submitPrayerRequest } from "@/app/actions";
import { PlusCircle, Send } from "lucide-react";

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

  async function handlePostPrayer(formData: FormData) {
    "use server";
    await submitPrayerRequest(formData);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Prayer Wall</h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            "Bear one another's burdens, and so fulfill the law of Christ."
            Share your needs and lift others up.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
            <PlusCircle className="w-4 h-4 mr-2 text-indigo-600" />
            Share a Request
          </h3>
          <form action={handlePostPrayer} className="relative">
            <textarea
              name="content"
              required
              rows={3}
              placeholder="How can we pray for you today?"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-sm transition-all"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center shadow-sm"
              >
                <Send className="w-3.5 h-3.5 mr-2" /> Post Request
              </button>
            </div>
          </form>
        </div>

        {/* Masonry Grid of Requests */}
        {requests.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No prayer requests yet. Be the first to share.
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
    </div>
  );
}
