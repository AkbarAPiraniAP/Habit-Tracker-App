"use client";

import { Habit } from "@/types/habit";

interface HabitItemProps {
  habit: Habit;
  isCompleted: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Health: "bg-green-100 text-green-800",
  Productivity: "bg-blue-100 text-blue-800",
  Learning: "bg-purple-100 text-purple-800",
  Fitness: "bg-orange-100 text-orange-800",
  Mindfulness: "bg-pink-100 text-pink-800",
  Other: "bg-gray-100 text-gray-800",
};

export function HabitItem({ habit, isCompleted, onToggle, onDelete }: HabitItemProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-4 transition-all ${
        isCompleted
          ? "border-green-200 bg-green-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            categoryColors[habit.category] || categoryColors.Other
          }`}
        >
          {habit.category}
        </span>
        <span
          className={`text-lg ${
            isCompleted ? "text-gray-500 line-through" : "text-gray-900"
          }`}
        >
          {habit.name}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(habit.id)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isCompleted
              ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500"
          }`}
        >
          {isCompleted ? "Done!" : "Done today"}
        </button>
        <button
          onClick={() => onDelete(habit.id)}
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Delete habit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
