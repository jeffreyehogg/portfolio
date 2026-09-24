"use client";

import { useState } from "react";
import { cancelSignup } from "@/app/actions";
import { Loader2, XCircle } from "lucide-react";

export function CancelButton({ signupId }: { signupId: number }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this signup?")) return;

    setLoading(true);
    try {
      await cancelSignup(signupId);
      // The page will automatically refresh via revalidatePath
    } catch (error) {
      console.error(error);
      alert("Failed to cancel. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors flex items-center font-medium"
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin mr-1" />
      ) : (
        <XCircle className="h-3 w-3 mr-1" />
      )}
      {loading ? "Cancelling" : "Cancel Signup"}
    </button>
  );
}
