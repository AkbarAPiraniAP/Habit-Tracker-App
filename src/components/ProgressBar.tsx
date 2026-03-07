"use client";

interface ProgressBarProps {
  completed: number;
  total: number;
  category: string;
}

const categoryBarColors: Record<string, string> = {
  Health: "bg-green-500",
  Productivity: "bg-blue-500",
  Learning: "bg-purple-500",
  Fitness: "bg-orange-500",
  Mindfulness: "bg-pink-500",
  Other: "bg-gray-500",
};

export function ProgressBar({ completed, total, category }: ProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const barColor = categoryBarColors[category] || categoryBarColors.Other;

  return (
    <div className="mt-3 w-full">
      <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
        <span>This week</span>
        <span>
          {completed}/{total} days
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
