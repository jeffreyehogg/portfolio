"use client";

import { useState, useTransition } from "react";
import { deleteNote } from "../actions";
import type { PrayerNote } from "../types";
import { EditNoteForm } from "./EditNoteForm";
import { MoreVertical, Trash2, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";

export function NoteList({
  notes,
  prayerId,
}: {
  notes: PrayerNote[];
  prayerId: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleDelete = (noteId: number) => {
    setOpenMenuId(null);
    if (!confirm("Are you sure you want to delete this note?")) return;

    startTransition(async () => {
      const res = await deleteNote(noteId, prayerId);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Note deleted.");
      }
    });
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-white rounded-2xl border border-dashed border-gray-200">
        <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-400 text-sm">No notes or updates recorded yet.</p>
        <p className="text-gray-400 text-xs mt-1">Use the form above to log progress or answered prayers!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
        Timeline ({notes.length})
      </h3>

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs relative group transition-all hover:border-indigo-100"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {note.createdAt
                  ? new Date(note.createdAt).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Just now"}
              </span>

              {/* Action Menu */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === note.id ? null : note.id)}
                  disabled={isPending}
                  className="p-1 text-gray-300 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

                {openMenuId === note.id && (
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                    <EditNoteForm note={note} onDone={() => setOpenMenuId(null)} />
                    <div className="my-1 border-t border-gray-100" />
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
              {note.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
