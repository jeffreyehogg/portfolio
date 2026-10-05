"use client";

import { useState } from "react";
import { createEvent } from "@/app/actions";
import { Loader2, PlusCircle } from "lucide-react";
import { FileUpload } from "@/app/components/file-upload";
import { toast } from "sonner";

export function EventForm() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (imageUrl) {
      formData.set("imageUrl", imageUrl);
    }

    try {
      const res = await createEvent(formData);
      if (res.success) {
        toast.success(res.message);
        form.reset();
        setImageUrl("");
      } else {
        toast.error(res.message || "Failed to create opportunity.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating opportunity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-7 rounded-3xl shadow-xs border border-slate-200/80 space-y-5"
    >
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Publish Service Opportunity
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Equip church members and neighbors with a clear, welcoming invitation to serve.
        </p>
      </div>

      {/* Image Upload Field */}
      <div>
        <label htmlFor="event-image-upload" className="block text-xs font-semibold text-slate-700 mb-2">
          Initiative header photo
        </label>
        <div id="event-image-upload">
          <FileUpload
            endpoint="eventImage"
            value={imageUrl}
            onChange={(url) => setImageUrl(url || "")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="event-title" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Opportunity title
        </label>
        <input
          id="event-title"
          name="title"
          required
          placeholder="e.g. Breakfast &amp; Dignity at Centennial Park"
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white transition-all"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="event-description" className="block text-xs font-semibold text-slate-700">
            Impact description &amp; what to expect
          </label>
          <span className="text-[11px] text-slate-400 italic">Focus on people &amp; grace</span>
        </div>
        <textarea
          id="event-description"
          name="description"
          required
          rows={3}
          placeholder="Explain who will be blessed, what volunteers will do, and reassurance that no prior experience is needed..."
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="event-date" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Date &amp; time
          </label>
          <input
            id="event-date"
            type="datetime-local"
            name="date"
            required
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900 bg-slate-50 focus:bg-white transition-all"
          />
        </div>
        <div>
          <label htmlFor="event-category" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Ministry gifting category
          </label>
          <select
            id="event-category"
            name="category"
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900 bg-slate-50 focus:bg-white transition-all"
          >
            <option value="food">Meals &amp; Hospitality (food)</option>
            <option value="labor">Hands &amp; Trades (labor)</option>
            <option value="supplies">Relief &amp; Community Logistics (supplies)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="event-location" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Meeting location &amp; room
          </label>
          <input
            id="event-location"
            name="location"
            required
            placeholder="e.g. Centennial Park Pavilion, Austin, TX"
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white transition-all"
          />
        </div>
        <div>
          <label htmlFor="event-max-volunteers" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Target team size
          </label>
          <input
            id="event-max-volunteers"
            type="number"
            name="maxVolunteers"
            defaultValue={12}
            min={1}
            max={500}
            required
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900 bg-slate-50 focus:bg-white transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold transition-all shadow-md shadow-indigo-600/20 active:scale-98 flex items-center justify-center cursor-pointer text-sm"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <PlusCircle className="h-5 w-5 mr-2" />
        )}
        <span>{loading ? "Publishing Opportunity..." : "Publish Opportunity to Board"}</span>
      </button>
    </form>
  );
}
