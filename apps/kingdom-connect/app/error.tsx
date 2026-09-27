"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home, KeyRound } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring or console in dev
    console.error("Kingdom Connect App Error:", error);
  }, [error]);

  const isAuthError =
    error.message?.toLowerCase().includes("clerk") ||
    error.message?.toLowerCase().includes("secret key") ||
    error.message?.toLowerCase().includes("unauthorized") ||
    error.digest?.toLowerCase().includes("clerk");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full rounded-2xl bg-white border border-slate-200/80 p-8 shadow-xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200/60 flex items-center justify-center mx-auto mb-5 text-rose-600 shadow-xs">
          {isAuthError ? <KeyRound className="w-7 h-7" /> : <AlertCircle className="w-7 h-7" />}
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2">
          {isAuthError ? "Authentication Configuration Required" : "Something went wrong"}
        </h2>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {isAuthError
            ? "The Clerk authentication keys for Kingdom Connect appear to be invalid or have not been linked to your Clerk dashboard yet."
            : "We encountered an unexpected error while loading this view. You can try refreshing the action or return to the home sanctuary."}
        </p>

        {isAuthError && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-left text-slate-700 mb-6 font-mono space-y-1">
            <p className="font-bold text-slate-900 font-sans">Quick Resolution:</p>
            <p>1. Open <span className="text-indigo-600 underline">dashboard.clerk.com</span></p>
            <p>2. Create/select your Kingdom Connect app</p>
            <p>3. Update <span className="text-rose-600">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</span> &amp; <span className="text-rose-600">CLERK_SECRET_KEY</span></p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-xs active:scale-[0.98] transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
