"use client";

import { useState } from "react";
import { anchorScriptureToJournal } from "@/app/actions";
import { Sparkles, BookOpen, BookmarkCheck, Heart, Shield, Compass, Sunrise, Smile } from "lucide-react";
import { toast } from "sonner";

interface PromiseCard {
  id: string;
  category: string;
  icon: any;
  label: string;
  verse: string;
  reference: string;
  reflection: string;
}

const PROMISES: PromiseCard[] = [
  {
    id: "anxiety",
    category: "Anxiety & Peace",
    icon: Shield,
    label: "Anxious / Burdened",
    verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    reference: "Philippians 4:6-7",
    reflection: "God does not ask you to carry tomorrow's burdens with today's strength. Release the grip.",
  },
  {
    id: "direction",
    category: "Direction & Calling",
    icon: Compass,
    label: "Seeking Direction",
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    reflection: "You do not need to see the entire staircase to take the first step of obedience.",
  },
  {
    id: "grief",
    category: "Grief & Healing",
    icon: Heart,
    label: "Grieving / Hurting",
    verse: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    reference: "Psalm 34:18",
    reflection: "Your tears are not forgotten. God sits with you in the quiet ashes of loss.",
  },
  {
    id: "weariness",
    category: "Rest & Endurance",
    icon: Sunrise,
    label: "Weary / Exhausted",
    verse: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
    reference: "Matthew 11:28-29",
    reflection: "Spiritual rest is not the absence of work; it is the presence of Christ in your labor.",
  },
  {
    id: "thanksgiving",
    category: "Praise & Joy",
    icon: Smile,
    label: "Full of Gratitude",
    verse: "Praise the Lord, my soul; all my inmost being, praise his holy name. Praise the Lord, my soul, and forget not all his benefits.",
    reference: "Psalm 103:1-2",
    reflection: "Remembering past mercies gives courage for current battles.",
  },
];

export function ScriptureAnchor() {
  const [selectedId, setSelectedId] = useState<string>("anxiety");
  const [isAnchoring, setIsAnchoring] = useState(false);
  const [anchoredMap, setAnchoredMap] = useState<Record<string, boolean>>({});

  const currentPromise = PROMISES.find((p) => p.id === selectedId) || PROMISES[0];

  const handleAnchor = async () => {
    setIsAnchoring(true);
    try {
      const res = await anchorScriptureToJournal(
        currentPromise.reference,
        currentPromise.verse,
        currentPromise.category
      );
      if (res.success) {
        setAnchoredMap({ ...anchoredMap, [currentPromise.id]: true });
        toast.success(res.message, {
          description: "Viewable inside your Personal Prayer Journal.",
        });
      } else {
        toast.error("Could not anchor scripture. Please try again.");
      }
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong.");
    } finally {
      setIsAnchoring(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            Scripture Promise Anchor Engine
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Where is your heart today?
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Select what you are walking through to anchor your soul in God&apos;s unfailing Word.
          </p>
        </div>

        <button
          onClick={handleAnchor}
          disabled={isAnchoring || anchoredMap[currentPromise.id]}
          className={`shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-xs ${
            anchoredMap[currentPromise.id]
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
              : "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20 active:scale-95"
          }`}
        >
          {anchoredMap[currentPromise.id] ? (
            <>
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              <span>Anchored to Journal ✓</span>
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4" />
              <span>{isAnchoring ? "Anchoring..." : "Anchor to My Journal"}</span>
            </>
          )}
        </button>
      </div>

      {/* Heart State Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PROMISES.map((item) => {
          const isSelected = item.id === selectedId;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                isSelected
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/20 font-bold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5 opacity-80" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Radiant Scripture Display Card */}
      <div className="relative rounded-2xl bg-linear-to-br from-rose-50/80 via-slate-50 to-indigo-50/40 p-6 sm:p-8 border border-rose-100 overflow-hidden">
        <div className="relative z-10">
          <blockquote className="text-base sm:text-lg font-serif italic text-slate-800 leading-relaxed">
            &ldquo;{currentPromise.verse}&rdquo;
          </blockquote>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-rose-200/50">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600">
              {currentPromise.reference}
            </span>
            <span className="text-xs text-slate-500 font-light italic">
              {currentPromise.reflection}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
