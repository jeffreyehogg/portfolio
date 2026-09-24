"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConcatenationBuilder from "./concatenation-builder";

const TARGET_FIELDS = [
  { key: "FirstName", label: "First Name", required: true },
  { key: "LastName", label: "Last Name", required: true },
  { key: "BadgeID", label: "Badge / Card Number", required: true },
  { key: "Email", label: "Email Address", required: false },
  { key: "AccessGroup", label: "Access Level", required: false },
  { key: "Status", label: "Status (Active/Inactive)", required: false },
];

interface MappingRule {
  type: "concatenate" | "static" | "uppercase";
  sources?: string[];
  separator?: string;
}

interface FieldMapperProps {
  migrationId: number;
  sourceColumns: string[];
  initialMappings?: Record<string, string | MappingRule>;
}

export default function FieldMapper({
  migrationId,
  sourceColumns,
  initialMappings,
}: FieldMapperProps) {
  const [mappings, setMappings] = useState<Record<string, any>>(
    initialMappings || {}
  );
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleMapChange = (targetKey: string, value: any) => {
    setMappings((prev) => ({ ...prev, [targetKey]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/migrations/${migrationId}/map`, {
        method: "POST",
        body: JSON.stringify({ mappings }),
      });
      if (!res.ok) throw new Error("Failed to save");
      router.refresh();
    } catch (error) {
      alert("Error saving mappings");
    } finally {
      setIsSaving(false);
    }
  };

  const isComplete = TARGET_FIELDS.filter((f) => f.required).every(
    (f) => mappings[f.key]
  );

  return (
    <div className="overflow-hidden bg-white rounded-2xl shadow-xl ring-1 ring-gray-200">
      {/* Top Header Section */}
      <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Data Schema Mapping
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Connect your legacy attributes to the Genetec Security Center
            schema.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving || !isComplete}
          className={`px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all shadow-lg ${
            isComplete
              ? "bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isSaving ? "Synchronizing..." : "Finalize Mappings"}
        </button>
      </div>

      <div className="p-8">
        {/* Visual Column Labels */}
        <div className="grid grid-cols-12 gap-6 mb-4 px-4">
          <div className="col-span-5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600/60">
              Destination: Genetec System
            </span>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Source: Legacy Database
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {TARGET_FIELDS.map((field) => {
            const currentMap = mappings[field.key];
            const isAdvanced = typeof currentMap === "object";

            return (
              <div
                key={field.key}
                className={`grid grid-cols-12 gap-6 items-center p-4 rounded-xl border transition-all duration-200 group ${
                  currentMap
                    ? "bg-white border-indigo-100 shadow-sm"
                    : "bg-gray-50/30 border-gray-100"
                }`}
              >
                {/* TARGET FIELD (Genetec) */}
                <div className="col-span-5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      {field.label}
                    </span>
                    {field.required && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-rose-500"
                        title="Required Field"
                      ></span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-50 px-1.5 py-0.5 rounded leading-none">
                      {field.key}
                    </span>
                  </div>
                </div>

                {/* VISUAL DIVIDER */}
                <div className="col-span-1 flex justify-center">
                  <div
                    className={`h-px w-8 transition-colors ${
                      currentMap ? "bg-indigo-200" : "bg-gray-200"
                    }`}
                  ></div>
                </div>

                {/* SOURCE DATA (Legacy) */}
                <div className="col-span-6 flex items-center gap-3">
                  {isAdvanced ? (
                    <div className="flex-1 flex items-center justify-between bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-indigo-100">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-indigo-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        <span>
                          {currentMap.sources.join(
                            ` ${currentMap.separator || "+"} `
                          )}
                        </span>
                      </div>
                      <button
                        onClick={() => handleMapChange(field.key, "")}
                        className="p-1 hover:bg-indigo-500 rounded transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="relative flex-1">
                      <select
                        value={currentMap || ""}
                        onChange={(e) =>
                          handleMapChange(field.key, e.target.value)
                        }
                        className={`w-full appearance-none rounded-lg border px-4 py-2.5 text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          currentMap
                            ? "border-indigo-200 bg-indigo-50/30 text-indigo-900"
                            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        <option value="">Choose legacy column...</option>
                        {sourceColumns.map((col) => (
                          <option key={col} value={col}>
                            {col}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setActiveModal(field.key)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-black transition-all active:scale-95"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-0h6m-6 0H6"
                      />
                    </svg>
                    Merge
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeModal && (
        <ConcatenationBuilder
          targetLabel={
            TARGET_FIELDS.find((f) => f.key === activeModal)?.label || ""
          }
          sourceColumns={sourceColumns}
          onClose={() => setActiveModal(null)}
          onSave={(rule) => {
            handleMapChange(activeModal, rule);
            setActiveModal(null);
          }}
        />
      )}
    </div>
  );
}
