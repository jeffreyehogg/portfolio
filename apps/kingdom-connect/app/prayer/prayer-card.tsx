"use client";

import { useOptimistic, useTransition } from "react";
import { togglePrayForRequest } from "@/app/actions";
import { Heart } from "lucide-react";
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
      count: state.prayed ? Math.max(0, state.count - 1) : state.count + 1,
      prayed: !state.prayed,
    })
  );

  const handlePray = async () => {
    const willBePrayed = !optimisticState.prayed;
    startTransition(async () => {
      setOptimisticState(null);

      try {
        const res = await togglePrayForRequest(request.id);
        if (res && "error" in res) {
          toast.error(res.error);
        } else if (willBePrayed) {
          toast.success("Standing with you in prayer!", {
            description: "Your intercession has been recorded.",
          });
        }
      } catch (error) {
        toast.error("Failed to update prayer status. Please try again.");
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 flex flex-col h-full hover:shadow-xl hover:border-rose-200 card-hover-glow transition-all">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700 font-bold text-xs shrink-0 shadow-2xs">
            {request.authorName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              {request.authorName}
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              {request.createdAt ? new Date(request.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              }) : "Recently"}
            </p>
          </div>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed min-h-16">
          &ldquo;{request.content}&rdquo;
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500 font-medium font-mono">
          {optimisticState.count}{" "}
          {optimisticState.count === 1 ? "believer" : "believers"} standing in prayer
        </span>

        <button
          onClick={handlePray}
          disabled={isPending}
          aria-pressed={optimisticState.prayed}
          aria-label={optimisticState.prayed ? "Stop praying for this request" : "Pray with this believer"}
          className={`
            flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95
            ${
              optimisticState.prayed
                ? "bg-rose-50 text-rose-700 border border-rose-300 shadow-2xs"
                : "bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600"
            }
          `}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              optimisticState.prayed ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
          <span>{optimisticState.prayed ? "Praying With You" : "I'll Pray"}</span>
        </button>
      </div>
    </div>
  );
}
