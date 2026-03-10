"use client";

import { Habit } from "@/types/habit";
import { ProgressBar } from "./ProgressBar";

interface HabitItemProps {
  habit: Habit;
  isCompleted: boolean;
  streak: number;
  weeklyCompletions: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Health: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  Productivity: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  Learning: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  Fitness: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  Mindfulness: "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300",
  Other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
};

export function HabitItem({ habit, isCompleted, streak, weeklyCompletions, onToggle, onDelete }: HabitItemProps) {
  return (
    <div
      className={`rounded-lg border p-4 transition-all ${
        isCompleted
          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30"
          : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
      }`}
    >
      <div className="flex items-center justify-between">
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
            isCompleted ? "text-gray-500 line-through dark:text-gray-400" : "text-gray-900 dark:text-white"
          }`}
        >
          {habit.name}
        </span>
        {streak > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            {streak} day{streak !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(habit.id)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isCompleted
              ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {isCompleted ? "Done!" : "Done today"}
        </button>
        <button
          onClick={() => onDelete(habit.id)}
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:text-gray-500 dark:hover:bg-red-900/30 dark:hover:text-red-400"
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
      <ProgressBar completed={weeklyCompletions} total={7} category={habit.category} />
    </div>
  );
}
