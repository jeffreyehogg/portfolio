"use client";

import { useState } from "react";
import { volunteerForEvent } from "@/app/actions";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner"; //

export function SignupButton({ eventId }: { eventId: number }) {
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await volunteerForEvent(eventId);

      if (result.success) {
        setSignedUp(true);
        toast.success("Success! You are signed up to serve.");
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
        className="w-full bg-green-100 text-green-700 border border-green-200 py-2 rounded-lg font-medium flex items-center justify-center cursor-default"
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Registered
      </button>
    );
  }

  return (
    <button
      onClick={handleSignup}
      disabled={loading}
      className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Signing up...
        </>
      ) : (
        "Sign Up to Serve"
      )}
    </button>
  );
}
