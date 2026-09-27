"use client";

import { useState } from "react";
import { volunteerForEvent } from "@/app/actions";
import { CheckCircle2, Loader2, Heart } from "lucide-react";
import { toast } from "sonner";

export function SignupButton({ eventId }: { eventId: number }) {
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await volunteerForEvent(eventId);

      if (result.success) {
        setSignedUp(true);
        toast.success(result.message || "You are registered! Thank you for blessing our community.");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (signedUp) {
    return (
      <button
        disabled
        className="w-full bg-emerald-50 text-emerald-700 border border-emerald-200 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center cursor-default shadow-xs"
      >
        <CheckCircle2 className="h-4 w-4 mr-1.5 text-emerald-600" />
        Confirmed · See You There!
      </button>
    );
  }

  return (
    <button
      onClick={handleSignup}
      disabled={loading}
      className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 active:scale-98 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Reserving Your Spot...
        </>
      ) : (
        <>
          <Heart className="h-3.5 w-3.5 mr-1.5 fill-current" />
          I&apos;ll Be There to Serve
        </>
      )}
    </button>
  );
}
