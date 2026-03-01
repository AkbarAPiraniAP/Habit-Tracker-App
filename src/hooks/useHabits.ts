"use client";

import { useState, useEffect } from "react";
import { Habit } from "@/types/habit";
import { getStoredHabits, saveHabits, getTodayDateString } from "@/utils/storage";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedHabits = getStoredHabits();
    setHabits(storedHabits);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveHabits(habits);
    }
  }, [habits, isLoaded]);

  const addHabit = (name: string, category: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      category,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const toggleHabit = (id: string) => {
    const today = getTodayDateString();
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const isCompleted = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter((date) => date !== today)
            : [...habit.completedDates, today],
        };
      })
    );
  };

  const isCompletedToday = (id: string): boolean => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return false;
    return habit.completedDates.includes(getTodayDateString());
  };

  return {
    habits,
    isLoaded,
    addHabit,
    deleteHabit,
    toggleHabit,
    isCompletedToday,
  };
}
