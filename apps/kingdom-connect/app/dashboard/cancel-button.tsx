"use client";

import { useState } from "react";
import { cancelSignup } from "@/app/actions";
import { Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";

export function CancelButton({ signupId }: { signupId: number }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    toast("Release this volunteer commitment?", {
      description: "This will open up your spot for another brother or sister to serve.",
      action: {
        label: "Confirm Release",
        onClick: async () => {
          setLoading(true);
          try {
            const res = await cancelSignup(signupId);
            if (res.success) {
              toast.success(res.message);
            } else {
              toast.error(res.message || "Failed to update registration.");
            }
          } catch (error) {
            console.error(error);
            toast.error("Failed to cancel commitment. Please try again.");
          } finally {
            setLoading(false);
          }
        },
      },
    });
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors flex items-center font-semibold cursor-pointer border border-rose-200/50"
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin mr-1" />
      ) : (
        <XCircle className="h-3 w-3 mr-1" />
      )}
      {loading ? "Releasing..." : "Release shift"}
    </button>
  );
}
