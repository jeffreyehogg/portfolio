"use client";

import { useTransition, useState } from "react";
import { addNote } from "../actions";
import { toast } from "sonner";
import { Send } from "lucide-react";

export function AddNoteForm({ prayerId }: { prayerId: number }) {
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    startTransition(async () => {
      const result = await addNote(prayerId, content);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Note saved!");
        setContent("");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
      <label htmlFor="note-content" className="block text-xs font-semibold text-slate-700">
        Add an update or thanksgiving
      </label>
      <textarea
        id="note-content"
        placeholder="Write an update, scripture reference, or how God is moving..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
        rows={3}
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white resize-none transition-all"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer active:scale-[0.98]"
        >
          <Send className="w-3.5 h-3.5" />
          {isPending ? "Saving..." : "Save note"}
        </button>
      </div>
    </form>
  );
}
