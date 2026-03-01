export interface Habit {
  id: string;
  name: string;
  category: string;
  createdAt: string;
  completedDates: string[];
}

export type HabitCategory =
  | "Health"
  | "Productivity"
  | "Learning"
  | "Fitness"
  | "Mindfulness"
  | "Other";

export const HABIT_CATEGORIES: HabitCategory[] = [
  "Health",
  "Productivity",
  "Learning",
  "Fitness",
  "Mindfulness",
  "Other",
];
