"use client";

import { useState } from "react";
import { donateToFund } from "@/app/actions";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export function DonationButton({ fundId, fundTitle }: { fundId: number; fundTitle?: string }) {
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    try {
      const res = await donateToFund(fundId, 5000);
      if (res.success) {
        toast.success(res.message, {
          description: fundTitle ? `Partnered with ${fundTitle}` : "Simulated gift recorded.",
        });
      } else {
        toast.error(res.message || "Failed to record donation.");
      }
    } catch (e: any) {
      toast.error(e?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDonate}
      disabled={loading}
      className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
    >
      {loading ? (
        "Recording gift..."
      ) : (
        <>
          <Heart className="h-4 w-4 fill-current" /> Partner with $50 gift
        </>
      )}
    </button>
  );
}
