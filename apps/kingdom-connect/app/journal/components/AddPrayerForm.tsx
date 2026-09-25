"use client";

import { useState, useTransition } from "react";
import { addPrayer } from "../actions";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

export function AddPrayerForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      const res = await addPrayer(title, category.trim() || null);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Prayer added to your journal!");
        setTitle("");
        setCategory("");
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        Add Prayer
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Add a New Prayer</h3>
                <p className="text-xs text-gray-500">What would you like to bring before God today?</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="prayer-title" className="block text-xs font-semibold text-gray-700 mb-1">
                  Prayer Request *
                </label>
                <input
                  id="prayer-title"
                  type="text"
                  required
                  placeholder="e.g. Healing for Mom, Guidance on new role..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isPending}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label htmlFor="prayer-category" className="block text-xs font-semibold text-gray-700 mb-1">
                  Category (optional)
                </label>
                <input
                  id="prayer-category"
                  type="text"
                  placeholder="e.g. Family, Health, Career, Guidance..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isPending}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white transition-all"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs disabled:opacity-50"
                >
                  {isPending ? "Adding..." : "Add Prayer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
