"use client";

import { useState } from "react";
import { GIFT_QUESTIONS, GIFT_PROFILES, GiftProfile } from "./gift-questions";
import { Sparkles, X, ArrowRight, CheckCircle2, RotateCcw, Heart, ChefHat, Hammer, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SpiritualGiftsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0 to questions.length - 1, then results
  const [scores, setScores] = useState<Record<string, number>>({ food: 0, labor: 0, supplies: 0 });
  const [result, setResult] = useState<GiftProfile | null>(null);
  const router = useRouter();

  const handleSelectOption = (category: "food" | "labor" | "supplies") => {
    const updated = { ...scores, [category]: scores[category] + 1 };
    setScores(updated);

    if (step < GIFT_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate dominant gift
      let highestCategory: "food" | "labor" | "supplies" = "food";
      let highestScore = -1;
      (Object.keys(updated) as Array<"food" | "labor" | "supplies">).forEach((cat) => {
        if (updated[cat] > highestScore) {
          highestScore = updated[cat];
          highestCategory = cat;
        }
      });
      const profile = GIFT_PROFILES[highestCategory];
      setResult(profile);
      setStep(GIFT_QUESTIONS.length);
      toast.success(`Gifts Assessment Complete: ${profile.title}!`);
    }
  };

  const handleReset = () => {
    setStep(0);
    setScores({ food: 0, labor: 0, supplies: 0 });
    setResult(null);
  };

  const handleApplyFilter = () => {
    if (result) {
      setIsOpen(false);
      router.push(`/serve?category=${result.category}`);
    }
  };

  const currentQ = GIFT_QUESTIONS[step];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "food":
        return <ChefHat className="w-5 h-5 text-amber-500" />;
      case "labor":
        return <Hammer className="w-5 h-5 text-blue-500" />;
      case "supplies":
        return <Package className="w-5 h-5 text-emerald-500" />;
      default:
        return <Heart className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <>
      {/* Sleek Trigger Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:px-5 sm:py-3.5 border border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block">
              Not sure where your gifts fit best?
            </span>
            <span className="text-xs text-slate-400">
              Take our 60-second gifts matcher for personalized recommendations.
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            handleReset();
            setIsOpen(true);
          }}
          className="shrink-0 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <span>Start 60s matcher</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Spiritual Gifts Matcher
                  </h3>
                  <p className="text-xs text-slate-500">
                    {step < GIFT_QUESTIONS.length
                      ? `Question ${step + 1} of ${GIFT_QUESTIONS.length}`
                      : "Your Ministry Profile Match"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions View */}
            {step < GIFT_QUESTIONS.length && currentQ && (
              <div>
                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${((step + 1) / GIFT_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <div className="mb-6">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {currentQ.prompt}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {currentQ.subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.categoryAffinity)}
                      className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 hover:shadow-md transition-all group active:scale-[0.99] flex items-start gap-3.5"
                    >
                      <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-white transition-colors shrink-0 mt-0.5">
                        {getCategoryIcon(opt.categoryAffinity)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                          {opt.label}
                        </p>
                        <p className="text-xs text-slate-500 group-hover:text-slate-600 mt-1 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results View */}
            {step >= GIFT_QUESTIONS.length && result && (
              <div className="text-center py-2 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mx-auto flex items-center justify-center mb-4 shadow-sm">
                  {getCategoryIcon(result.category)}
                </div>

                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  Dominant gifting profile
                </span>

                <h4 className="text-2xl font-extrabold text-slate-900 mt-3 tracking-tight">
                  {result.title}
                </h4>

                <p className="text-xs italic text-indigo-900 font-serif bg-indigo-50/60 p-3 rounded-xl border border-indigo-100/80 my-4 max-w-md mx-auto">
                  {result.scripture}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                  {result.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleApplyFilter}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <span>{result.actionPrompt}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
