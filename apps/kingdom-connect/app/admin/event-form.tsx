"use client";

import { useState } from "react";
import { createEvent } from "@/app/actions";
import { Loader2, PlusCircle, Image as ImageIcon } from "lucide-react";
import { FileUpload } from "@/app/components/file-upload"; // New import
import { toast } from "sonner";

export function EventForm() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // Track image URL

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Append the image URL from our state to the form data
    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    try {
      await createEvent(formData);
      toast.success("Event created successfully!");
      (e.target as HTMLFormElement).reset();
      setImageUrl("");
    } catch (error) {
      console.error(error);
      toast.error("Error creating event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Create New Opportunity
      </h3>

      {/* Image Upload Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Image
        </label>
        <FileUpload
          endpoint="eventImage"
          value={imageUrl}
          onChange={(url) => setImageUrl(url || "")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Title
        </label>
        <input
          name="title"
          required
          placeholder="e.g. Community Cleanup"
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          required
          rows={3}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="datetime-local"
            name="date"
            required
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="food">Food Service</option>
            <option value="labor">Labor & Help</option>
            <option value="supplies">Supplies & Logistics</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            name="location"
            required
            placeholder="e.g. Main Hall"
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Volunteers
          </label>
          <input
            type="number"
            name="maxVolunteers"
            defaultValue={10}
            required
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <PlusCircle className="h-5 w-5 mr-2" /> Publish Event
          </>
        )}
      </button>
    </form>
  );
}
