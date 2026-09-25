"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import {
  deletePrayer,
  updatePrayerStatus,
  updatePrayerOrder,
} from "../actions";
import type { PersonalPrayer, PrayerStatus } from "../types";
import { EditPrayerForm } from "./EditPrayerForm";
import {
  GripVertical,
  MoreVertical,
  Trash2,
  CheckCircle2,
  Clock,
  Flame,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortablePrayerItem({ prayer }: { prayer: PersonalPrayer }) {
  const [isPending, startTransition] = useTransition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: prayer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleStatusChange = (newStatus: PrayerStatus) => {
    setStatusMenuOpen(false);
    startTransition(async () => {
      const res = await updatePrayerStatus(prayer.id, newStatus);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(`Status updated to ${newStatus}`);
      }
    });
  };

  const handleDelete = () => {
    setMenuOpen(false);
    if (!confirm("Are you sure you want to delete this prayer request?")) return;
    startTransition(async () => {
      const res = await deletePrayer(prayer.id);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Prayer deleted.");
      }
    });
  };

  const getStatusBadge = (status: PrayerStatus) => {
    switch (status) {
      case "Answered":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Answered
          </span>
        );
      case "Praying":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Flame className="w-3 h-3" /> Praying
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 bg-white border border-gray-100 rounded-2xl shadow-xs flex items-center justify-between gap-3 group transition-all hover:border-indigo-100 hover:shadow-sm ${
        isDragging ? "opacity-50 ring-2 ring-indigo-500 shadow-lg" : ""
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          {...attributes}
          {...listeners}
          type="button"
          aria-label="Drag to reorder"
          className="cursor-grab active:cursor-grabbing p-1 text-gray-300 hover:text-gray-600 rounded-md transition-colors"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/journal/${prayer.id}`}
              className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors truncate"
            >
              {prayer.title}
            </Link>
            {prayer.category && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium">
                {prayer.category}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Added {prayer.createdAt ? new Date(prayer.createdAt).toLocaleDateString() : "recently"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => setStatusMenuOpen(!statusMenuOpen)}
            disabled={isPending}
            className="cursor-pointer focus:outline-none"
          >
            {getStatusBadge(prayer.status)}
          </button>

          {statusMenuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={() => handleStatusChange("Pending")}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Clock className="w-3.5 h-3.5 text-indigo-500" /> Pending
              </button>
              <button
                onClick={() => handleStatusChange("Praying")}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Praying
              </button>
              <button
                onClick={() => handleStatusChange("Answered")}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Answered
              </button>
            </div>
          )}
        </div>

        {/* View Details Link */}
        <Link
          href={`/journal/${prayer.id}`}
          className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg transition-colors"
          title="View notes"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>

        {/* Action Menu (Edit / Delete) */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              <EditPrayerForm prayer={prayer} onDone={() => setMenuOpen(false)} />
              <div className="my-1 border-t border-gray-100" />
              <button
                onClick={handleDelete}
                className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PrayerList({
  prayers: initialPrayers,
  emptyMessage,
}: {
  prayers: PersonalPrayer[];
  emptyMessage?: string;
}) {
  const [prayers, setPrayers] = useState<PersonalPrayer[]>(initialPrayers);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setPrayers(initialPrayers);
  }, [initialPrayers]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = prayers.findIndex((item) => item.id === active.id);
      const newIndex = prayers.findIndex((item) => item.id === over.id);
      const newArray = arrayMove(prayers, oldIndex, newIndex);
      setPrayers(newArray);
      const orderedIds = newArray.map((item) => item.id);
      startTransition(async () => {
        await updatePrayerOrder(orderedIds);
      });
    }
  }

  if (prayers.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-400 text-sm">
          {emptyMessage || "You haven't added any prayers yet. Click 'Add Prayer' to start!"}
        </p>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={prayers.map((p) => p.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3">
          {prayers.map((prayer) => (
            <SortablePrayerItem key={prayer.id} prayer={prayer} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
