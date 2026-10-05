"use client";

import { useState } from "react";
import { createFund } from "@/app/actions";
import { Loader2, PlusCircle, DollarSign } from "lucide-react";
import { toast } from "sonner";

export function FundForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await createFund(formData);
      if (res.success) {
        toast.success(res.message);
        form.reset();
      } else {
        toast.error(res.message || "Failed to launch initiative.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating fund initiative. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-7 rounded-3xl shadow-xs border border-slate-200/80 space-y-5"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-2xl">
          <DollarSign className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Launch Kingdom Initiative
          </h3>
          <p className="text-xs text-slate-500">
            Transparent crowdfunding for verified ministry outreach.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="fund-title" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Initiative name
        </label>
        <input
          id="fund-title"
          name="title"
          required
          placeholder="e.g. Outreach Van Replacement Fund"
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white transition-all"
        />
      </div>

      <div>
        <label htmlFor="fund-description" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Mission &amp; impact story
        </label>
        <textarea
          id="fund-description"
          name="description"
          required
          rows={3}
          placeholder="Explain the tangible purpose: Who does this serve, and why is this urgent for our community?..."
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white transition-all resize-none"
        />
      </div>

      <div>
        <label htmlFor="fund-goal" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Goal amount (USD)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <span className="text-slate-400 sm:text-sm font-bold font-mono">$</span>
          </div>
          <input
            id="fund-goal"
            type="number"
            name="goal"
            required
            min="10"
            step="1"
            placeholder="5000"
            className="w-full pl-8 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-900 font-mono bg-slate-50 focus:bg-white transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-98 flex items-center justify-center cursor-pointer text-sm"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <PlusCircle className="h-5 w-5 mr-2" />
        )}
        <span>{loading ? "Publishing Initiative..." : "Launch Kingdom Need"}</span>
      </button>
    </form>
  );
}
