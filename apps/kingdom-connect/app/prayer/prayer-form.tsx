"use client";

import { useState } from "react";
import { submitPrayerRequest } from "@/app/actions";
import { PlusCircle, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function PrayerForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await submitPrayerRequest(formData);
      if (res.success) {
        toast.success(res.message);
        form.reset();
      } else {
        toast.error(res.message || "Failed to share request.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Please sign in to share a request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-slate-200/80 mb-12">
      <div className="flex items-center justify-between mb-4">
        <label
          htmlFor="prayer-content"
          className="text-sm font-bold text-slate-900 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-rose-600" />
          Share a Prayer Petition or Praise Report
        </label>
        <span className="text-[11px] text-slate-400 font-mono">Shared with church community</span>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <textarea
          id="prayer-content"
          name="content"
          required
          rows={3}
          placeholder="What would you like our community to bring before the Lord with you? (e.g. healing, family peace, guidance, or thanksgiving)..."
          aria-label="Write your prayer request"
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none text-sm text-slate-900 placeholder-slate-400 transition-all leading-relaxed"
        />
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-500 italic">
            &ldquo;Do not be anxious about anything... present your requests to God.&rdquo; — Phil 4:6
          </p>
          <button
            type="submit"
            disabled={loading}
            className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center shadow-md shadow-rose-600/20 active:scale-95 cursor-pointer self-end sm:self-auto disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                Sharing...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 mr-2" /> Share on Prayer Wall
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
