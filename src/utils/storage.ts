import { Habit } from "@/types/habit";

const STORAGE_KEY = "habit-tracker-habits";

export function getStoredHabits(): Habit[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Habit[];
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}
