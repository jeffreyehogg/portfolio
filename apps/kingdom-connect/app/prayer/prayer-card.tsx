"use client";

import { useState, useOptimistic, useTransition } from "react";
import { togglePrayForRequest } from "@/app/actions";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PrayerCardProps {
  request: {
    id: number;
    authorName: string;
    content: string;
    prayedCount: number | null;
    createdAt: Date | null;
  };
  hasPrayed: boolean;
}

export function PrayerCard({ request, hasPrayed }: PrayerCardProps) {
  const [isPending, startTransition] = useTransition();

  // Optimistic State
  const [optimisticState, setOptimisticState] = useOptimistic(
    { count: request.prayedCount || 0, prayed: hasPrayed },
    (state, _payload: unknown) => ({
      count: state.prayed ? state.count - 1 : state.count + 1,
      prayed: !state.prayed,
    })
  );

  const handlePray = async () => {
    startTransition(async () => {
      setOptimisticState(null);

      try {
        await togglePrayForRequest(request.id);
      } catch (error) {
        toast.error("Failed to update prayer status");
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
            {request.authorName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {request.authorName}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(request.createdAt!).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed min-h-20">
          {request.content}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <span className="text-xs text-gray-500 font-medium">
          {optimisticState.count}{" "}
          {optimisticState.count === 1 ? "person" : "people"} praying
        </span>

        <button
          onClick={handlePray}
          disabled={isPending}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all
            ${
              optimisticState.prayed
                ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }
          `}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              optimisticState.prayed ? "fill-current" : ""
            }`}
          />
          {optimisticState.prayed ? "Praying" : "I'll Pray"}
        </button>
      </div>
    </div>
  );
}
