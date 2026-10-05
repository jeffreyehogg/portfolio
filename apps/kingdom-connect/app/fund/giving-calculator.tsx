"use client";

import { useState } from "react";
import { DollarSign, Sparkles, Heart, Coffee, ShieldCheck, Shirt, Backpack } from "lucide-react";
import { donateToFund } from "@/app/actions";
import { toast } from "sonner";

interface GivingCalculatorProps {
  primaryFundId?: number;
}

export function GivingCalculator({ primaryFundId = 1 }: GivingCalculatorProps) {
  const [amount, setAmount] = useState<number>(50);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Unit conversions:
  // $3.50 per hot breakfast with coffee
  // $25 per heavy winter coat & thermal gloves
  // $20 per loaded student backpack
  const mealsProvided = Math.floor(amount / 3.5);
  const coatsProvided = Math.floor(amount / 25);
  const backpacksProvided = Math.floor(amount / 20);

  const presets = [25, 50, 100, 250];

  const handleDonate = async () => {
    setIsSubmitting(true);
    try {
      const res = await donateToFund(primaryFundId, amount * 100);
      if (res.success) {
        toast.success(res.message, {
          description: `Equivalent to ${mealsProvided} hot meals or ${coatsProvided > 0 ? coatsProvided : 1} winter coats for our neighbors.`,
        });
      } else {
        toast.error(res.message || "Could not process donation.");
      }
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-linear-to-br from-emerald-950 via-slate-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-emerald-500/20 shadow-xl mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Stewardship calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              See what your generosity accomplishes
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 font-light">
              Slide to any amount to see the tangible fruit of 100% direct kingdom giving.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl shrink-0 self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-emerald-200 font-medium">100% direct allocation</span>
          </div>
        </div>

        {/* Amount Selector */}
        <div className="bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-800 backdrop-blur-md mb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-xs text-slate-400 font-medium">
              Select or slide gift amount
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono flex items-center">
              <span>$</span>
              <span>{amount}</span>
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={10}
            max={500}
            step={5}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            aria-label="Donation amount slider"
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-5"
          />

          {/* Preset Buttons - Single-row pill bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 mr-1 hidden sm:inline">Quick presets:</span>
            {presets.map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all active:scale-[0.98] cursor-pointer ${
                  amount === val
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                ${val}
              </button>
            ))}
          </div>
        </div>

        {/* Deliverables Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          <div className="bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-800/80 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white font-mono">{mealsProvided}</p>
              <p className="text-xs font-semibold text-amber-300">Hot meals &amp; coffee</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Prepared hot breakfast for unhoused neighbors.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-800/80 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white font-mono">{coatsProvided}</p>
              <p className="text-xs font-semibold text-emerald-300">Winter coats &amp; gloves</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Fleece jackets and thermal gloves for cold nights.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-800/80 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
              <Backpack className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white font-mono">{backpacksProvided}</p>
              <p className="text-xs font-semibold text-indigo-300">Equipped backpacks</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                School supply backpacks for local students.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400 italic">
            &quot;God loves a cheerful giver.&quot; — 2 Corinthians 9:7
          </p>
          <button
            onClick={handleDonate}
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>{isSubmitting ? "Recording gift..." : `Simulate partner gift of $${amount}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
