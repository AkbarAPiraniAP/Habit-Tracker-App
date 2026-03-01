"use client";

import { Header } from "@/components/Header";
import { AddHabitForm } from "@/components/AddHabitForm";
import { HabitList } from "@/components/HabitList";
import { useHabits } from "@/hooks/useHabits";

export default function Home() {
  const { habits, isLoaded, addHabit, deleteHabit, toggleHabit, isCompletedToday } =
    useHabits();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Header />
      <AddHabitForm onAdd={addHabit} />
      {isLoaded ? (
        <HabitList
          habits={habits}
          isCompletedToday={isCompletedToday}
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
