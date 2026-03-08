"use client";

import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { ExportButton } from "@/components/ExportButton";
import { AddHabitForm } from "@/components/AddHabitForm";
import { HabitList } from "@/components/HabitList";
import { useHabits } from "@/hooks/useHabits";

export default function Home() {
  const { habits, isLoaded, addHabit, deleteHabit, toggleHabit, isCompletedToday, getStreak, getStats } =
    useHabits();

  const stats = getStats();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Header />
      {isLoaded && (
        <>
          <Dashboard
            totalHabits={stats.totalHabits}
            completedToday={stats.completedToday}
            longestStreak={stats.longestStreak}
          />
          <div className="mb-6 flex justify-end">
            <ExportButton habits={habits} />
          </div>
        </>
      )}
      <AddHabitForm onAdd={addHabit} />
      {isLoaded ? (
        <HabitList
          habits={habits}
          isCompletedToday={isCompletedToday}
          getStreak={getStreak}
          onToggle={toggleHabit}
          onDelete={deleteHabit}
        />
      ) : (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      )}
    </main>
  );
}
