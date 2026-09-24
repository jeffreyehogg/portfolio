import Link from "next/link";
import { Navbar } from "./components/Navbar";
import { ArrowRight, DollarSign, Users, Calendar, MapPin } from "lucide-react";
import { db } from "@/lib/db";
import { events } from "@/db/schema";
import { desc, gt } from "drizzle-orm";

export default async function Home() {
  // Fetch next 3 upcoming events
  const upcomingEvents = await db
    .select()
    .from(events)
    .where(gt(events.date, new Date())) // Only future events
    .orderBy(desc(events.date)) // Or asc(events.date) to show nearest
    .limit(3);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-linear-to-r from-indigo-900 via-indigo-900/90 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-24 sm:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Connect Your Gifts to <br />
              <span className="text-indigo-300">Kingdom Needs</span>
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl leading-relaxed">
              Find where you fit in the body of Christ. Whether it's cooking a
              meal, painting a wall, or funding a mission—your service matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/serve"
                className="bg-white text-indigo-900 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-indigo-50 shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center"
              >
                Find a Place to Serve
              </Link>
              <Link
                href="/fund"
                className="bg-indigo-700 bg-opacity-50 border border-indigo-400 text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-indigo-600 transition-all backdrop-blur-sm flex items-center justify-center"
              >
                Support a Cause
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Service Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Volunteer Opportunities
            </h3>
            <p className="text-gray-600 mb-6">
              Browse real-time needs from local churches and ministries. Filter
              by your skills and availability.
            </p>
            <Link
              href="/serve"
              className="text-indigo-600 font-semibold flex items-center hover:text-indigo-700"
            >
              Browse Needs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Fund Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Kingdom Fund
            </h3>
            <p className="text-gray-600 mb-6">
              Transparent crowdfunding for verified church projects. See exactly
              where your donation goes.
            </p>
            <Link
              href="/fund"
              className="text-emerald-600 font-semibold flex items-center hover:text-emerald-700"
            >
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Featured Events Section */}
        {upcomingEvents.length > 0 && (
          <div className="border-t border-gray-200 pt-16">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Opportunities
              </h2>
              <Link
                href="/serve"
                className="text-indigo-600 font-semibold hover:underline hidden sm:block"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Link
                  href="/serve"
                  key={event.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="h-40 bg-gray-100 relative">
                    {event.imageUrl && (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                      <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/serve"
                className="text-indigo-600 font-semibold hover:underline"
              >
                View all opportunities &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
