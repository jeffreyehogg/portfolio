"use client";

import { useState } from "react";
import { createFund } from "@/app/actions";
import { Loader2, PlusCircle, DollarSign } from "lucide-react";

export function FundForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      await createFund(formData);
      alert("Fund created successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      alert("Error creating fund");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-emerald-100 p-2 rounded-lg">
          <DollarSign className="h-5 w-5 text-emerald-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Start New Fund</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fund Title
        </label>
        <input
          name="title"
          required
          placeholder="e.g. Winter Coat Drive"
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
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
          placeholder="What is the need?"
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Goal Amount ($)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="goal"
            required
            min="1"
            step="0.01"
            placeholder="5000.00"
            className="w-full pl-7 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <PlusCircle className="h-5 w-5 mr-2" /> Launch Fund
          </>
        )}
      </button>
    </form>
  );
}
