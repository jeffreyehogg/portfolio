import { Navbar } from "@/app/components/Navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EventForm } from "./event-form";
import { FundForm } from "./fund-form";
import { db } from "@/lib/db";
import { events, funds } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Calendar } from "lucide-react";

export default async function AdminPage() {
  const { userId } = await auth();

  // Basic protection: Must be logged in
  if (!userId) {
    redirect("/");
  }

  // If you haven't set the env var yet, you can temporarily comment this out to keep testing.
  if (process.env.ADMIN_USER_ID && userId !== process.env.ADMIN_USER_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-gray-500 mt-2">
            You do not have permission to view this page.
          </p>
          <a
            href="/"
            className="mt-4 inline-block text-indigo-600 hover:underline"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  // Fetch recent events to show the list
  const recentEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.date))
    .limit(5);

  // Fetch active funds
  const activeFunds = await db
    .select()
    .from(funds)
    .orderBy(desc(funds.id))
    .limit(5);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Creation Tools */}
          <div className="space-y-8">
            <EventForm />
            <FundForm />
          </div>

          {/* Right Column: Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Events List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-900">
                  Recent Opportunities
                </h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {recentEvents.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {event.title}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 capitalize">
                          {event.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentEvents.length === 0 && (
                    <tr>
                      <td colSpan={2} className="p-6 text-center text-gray-500">
                        No events found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Funds List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Active Funds</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {activeFunds.map((fund) => (
                    <tr key={fund.id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {fund.title}
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 max-w-xs">
                          <div
                            className="bg-emerald-500 h-1.5 rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                ((fund.raised || 0) / fund.goal) * 100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-sm font-bold text-emerald-700">
                          ${((fund.raised || 0) / 100).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          of ${(fund.goal / 100).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeFunds.length === 0 && (
                    <tr>
                      <td colSpan={2} className="p-6 text-center text-gray-500">
                        No funds active.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
