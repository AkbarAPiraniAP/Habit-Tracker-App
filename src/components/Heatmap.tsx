"use client";

import { Habit } from "@/types/habit";

interface HeatmapProps {
  habits: Habit[];
}

function getDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getLast90Days(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push(getDateString(date));
  }
  return days;
}

function getColorClass(count: number): string {
  if (count === 0) return "bg-gray-200";
  if (count <= 2) return "bg-green-300";
  if (count <= 4) return "bg-green-500";
  return "bg-green-700";
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function Heatmap({ habits }: HeatmapProps) {
  const days = getLast90Days();

  // Count completions per day
  const completionCounts: Record<string, number> = {};
  for (const day of days) {
    completionCounts[day] = habits.filter((h) =>
      h.completedDates.includes(day)
    ).length;
  }

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-medium text-gray-700">Last 90 Days</h3>
      <div className="flex flex-wrap gap-1" style={{ maxWidth: "182px" }}>
        {days.map((day) => (
          <div
            key={day}
            className={`h-3 w-3 rounded-sm ${getColorClass(completionCounts[day])} cursor-pointer`}
            title={`${formatDate(day)}: ${completionCounts[day]} completed`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <span>Less</span>
        <div className="h-3 w-3 rounded-sm bg-gray-200" />
        <div className="h-3 w-3 rounded-sm bg-green-300" />
        <div className="h-3 w-3 rounded-sm bg-green-500" />
        <div className="h-3 w-3 rounded-sm bg-green-700" />
        <span>More</span>
      </div>
    </div>
  );
}
