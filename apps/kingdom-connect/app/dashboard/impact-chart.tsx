"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ImpactChartProps {
  data: {
    month: string;
    hours: number;
  }[];
}

export function ImpactChart({ data }: ImpactChartProps) {
  // If no data, show a friendly empty state
  if (data.length === 0 || data.every((d) => d.hours === 0)) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 rounded-xl border border-gray-100 border-dashed">
        <p className="text-sm font-medium">No service history yet</p>
        <p className="text-xs mt-1">
          Sign up for an event to see your impact grow!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-xs border border-slate-200/80">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-900">
          Your impact over time
        </h3>
        <p className="text-xs text-slate-500">Volunteer hours per month</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "#F3F4F6" }}
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "8px",
                color: "#F9FAFB",
                fontSize: "12px",
                padding: "8px 12px",
              }}
              itemStyle={{ color: "#F9FAFB" }}
            />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.hours > 0 ? "#4F46E5" : "#E5E7EB"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
