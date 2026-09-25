"use client";

import { useState, useTransition } from "react";
import { updateNote } from "../actions";
import type { PrayerNote } from "../types";
import { X, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function EditNoteForm({ note, onDone }: { note: PrayerNote; onDone?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(note.content);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    startTransition(async () => {
      const res = await updateNote(note.id, content);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Note updated!");
        setIsOpen(false);
        router.refresh();
        if (onDone) onDone();
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
      >
        <Pencil className="h-3.5 w-3.5 text-gray-400" />
        Edit Note
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Edit Note</h3>
                <p className="text-xs text-gray-500">Make changes to your journal entry.</p>
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
                <label htmlFor="edit-note-content" className="block text-xs font-semibold text-gray-700 mb-1">
                  Note Content *
                </label>
                <textarea
                  id="edit-note-content"
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={isPending}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white resize-none transition-all"
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
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
