"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HabitChart() {
  const [view, setView] = useState<"week" | "month">("week");

  const weeklyData = [
    { day: "S", habits: 6 },
    { day: "M", habits: 3 },
    { day: "T", habits: 4 },
    { day: "W", habits: 2 },
    { day: "Th", habits: 5 },
    { day: "F", habits: 4 },
    { day: "S", habits: 3 },
  ];

  const monthlyData = [
    { week: "Week 1", habits: 20 },
    { week: "Week 2", habits: 25 },
    { week: "Week 3", habits: 18 },
    { week: "Week 4", habits: 30 },
  ];

  const data = view === "week" ? weeklyData : monthlyData;

  return (
    <section className="p-8 bg-neutral-900 text-white rounded-2xl border border-neutral-800 flex-1 h-[28rem]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Habit History</h2>

        <div className="flex gap-2 bg-neutral-800 rounded-lg p-1">
          <button
            onClick={() => setView("week")}
            className={`px-4 py-2 rounded-md text-sm transition ${
              view === "week"
                ? "bg-emerald-600 text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 rounded-md text-sm transition ${
              view === "month"
                ? "bg-emerald-600 text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[20rem]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />

            <XAxis
              dataKey={view === "week" ? "day" : "week"}
              stroke="#aaa"
              tickLine={false}
              axisLine={false}
              interval={0} // keeps all labels visible
              tickMargin={10}
            />

            <YAxis
              stroke="#aaa"
              tickLine={false}
              axisLine={false}
              domain={[0, "auto"]} // fully linear, starts at 0
              allowDecimals={false}
              tickMargin={10}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
              }}
              cursor={{ stroke: "#333", strokeWidth: 1 }}
            />

            <Line
              type="monotone" // not "monotone" so it doesn't bend between points
              dataKey="habits"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
