"use client";

import { useState } from "react";
import { donateToFund } from "@/app/actions";
import { Heart } from "lucide-react";

export function DonationButton({ fundId }: { fundId: number }) {
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    // Simulating a $50 donation
    await donateToFund(fundId, 5000);
    setLoading(false);
    alert("Thank you! Donation simulated.");
  };

  return (
    <button
      onClick={handleDonate}
      disabled={loading}
      className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {loading ? (
        "Processing..."
      ) : (
        <>
          <Heart className="h-4 w-4" /> Give $50 Now
        </>
      )}
    </button>
  );
}
