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
    toast("Delete this prayer reflection note?", {
      description: "This entry will be permanently removed.",
      action: {
        label: "Delete",
        onClick: () => {
          startTransition(async () => {
            const res = await deleteNote(noteId, prayerId);
            if (res?.error) {
              toast.error(res.error);
            } else {
              toast.success("Note removed.");
            }
          });
        },
      },
    });
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-white rounded-3xl border border-dashed border-slate-200">
        <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-slate-500 text-sm">No notes or updates recorded yet.</p>
        <p className="text-slate-400 text-xs mt-1">Use the form above to log progress or answered prayers!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
        Timeline ({notes.length})
      </h3>

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs relative group transition-all hover:border-purple-200"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
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
                  aria-label="Note options"
                  className="p-1 text-slate-300 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

                {openMenuId === note.id && (
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                    <EditNoteForm note={note} onDone={() => setOpenMenuId(null)} />
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
              {note.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
