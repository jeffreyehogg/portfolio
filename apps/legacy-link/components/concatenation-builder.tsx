"use client";

import { useState } from "react";

interface ConcatenationBuilderProps {
  targetLabel: string;
  sourceColumns: string[];
  onClose: () => void;
  onSave: (rule: {
    type: "concatenate";
    sources: string[];
    separator: string;
  }) => void;
}

export default function ConcatenationBuilder({
  targetLabel,
  sourceColumns,
  onClose,
  onSave,
}: ConcatenationBuilderProps) {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [separator, setSeparator] = useState(" ");

  const toggleSource = (col: string) => {
    setSelectedSources((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-gray-900">
              Merge Fields for "{targetLabel}"
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Select legacy columns to combine into one standard field.
          </p>

          <div className="space-y-6">
            {/* Source Column Grid */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Available Source Columns
              </label>
              <div className="max-h-48 overflow-y-auto border border-gray-100 rounded-lg p-3 grid grid-cols-2 gap-2 bg-gray-50/50">
                {sourceColumns.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => toggleSource(col)}
                    className={`text-left px-3 py-2 rounded-md text-xs transition-all border ${
                      selectedSources.includes(col)
                        ? "bg-black text-white border-black shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {selectedSources.includes(col) && (
                      <span className="mr-2">✓</span>
                    )}
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Separator Setting */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                Separator (Glue)
              </label>
              <input
                type="text"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                placeholder="e.g. Space, comma, or dash"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-black outline-none transition-shadow"
              />
              <p className="mt-2 text-[10px] text-gray-400 italic">
                Example: {selectedSources.slice(0, 2).join(separator || " ")}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold text-gray-500 hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={selectedSources.length < 2}
              onClick={() =>
                onSave({
                  type: "concatenate",
                  sources: selectedSources,
                  separator,
                })
              }
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-800 transition-all active:scale-95"
            >
              Apply Merge Rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
