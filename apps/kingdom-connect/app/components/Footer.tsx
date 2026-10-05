import Link from "next/link";
import { Heart, Users, DollarSign, BookOpen, ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-24 md:pb-12 mt-auto" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-500 transition-all shadow-xs">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Kingdom<span className="text-indigo-400">Connect</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              One Body, Many Gifts. Mobilizing local believers to love our neighbors through hands-on service, transparent stewardship, and steadfast prayer.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% direct outreach verified</span>
            </div>
          </div>

          {/* Ministry Pillars */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 mb-4">
              Four core pillars
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/serve" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Hands-on service</span>
                </Link>
              </li>
              <li>
                <Link href="/fund" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kingdom fund</span>
                </Link>
              </li>
              <li>
                <Link href="/prayer" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Prayer wall &amp; praise</span>
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                  <span>Prayer sanctuary</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Resources */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 mb-4">
              Community &amp; discipleship
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-indigo-400 transition-colors">
                  My steward dashboard
                </Link>
              </li>
              <li>
                <Link href="/journal/answered" className="hover:text-violet-400 transition-colors">
                  Stones of remembrance (Answered)
                </Link>
              </li>
              <li>
                <Link href="/serve" className="hover:text-indigo-400 transition-colors">
                  Spiritual gifts matcher
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-slate-300 transition-colors flex items-center gap-1 text-xs text-slate-400">
                  <span>Ministry leader portal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Scriptural Anchor */}
          <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80">
            <p className="text-xs font-semibold text-indigo-400 mb-2">
              Scripture anchor
            </p>
            <blockquote className="text-xs text-slate-300 italic font-serif leading-relaxed">
              &quot;Each of you should use whatever gift you have received to serve others, as faithful stewards of God&apos;s grace in its various forms.&quot;
            </blockquote>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              — 1 Peter 4:10
            </p>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Kingdom Connect. Built for the glory of God and the joy of all peoples.</p>
          <div className="flex items-center gap-4">
            <span>Grace in Action · Community in Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
