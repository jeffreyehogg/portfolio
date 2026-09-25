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
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
      <label htmlFor="note-content" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
        Add an Update or Thanksgiving
      </label>
      <textarea
        id="note-content"
        placeholder="Write an update, scripture reference, or how God is moving..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
        rows={3}
        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none transition-all"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          {isPending ? "Saving..." : "Save Note"}
        </button>
      </div>
    </form>
  );
}
