import { Habit } from "@/types/habit";

function getLast30Days(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split("T")[0]);
  }
  return days;
}

function formatDateHeader(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export function generateHabitsCsv(habits: Habit[]): string {
  const days = getLast30Days();

  // Header row
  const headers = [
    "Habit Name",
    "Category",
    "Created Date",
    ...days.map(formatDateHeader),
  ];

  // Data rows
  const rows = habits.map((habit) => {
    const createdDate = new Date(habit.createdAt).toLocaleDateString();
    const completions = days.map((day) =>
      habit.completedDates.includes(day) ? "1" : "0"
    );
    return [habit.name, habit.category, createdDate, ...completions];
  });

  // Combine and escape for CSV
  const allRows = [headers, ...rows];
  return allRows
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");
}

export function downloadCsv(habits: Habit[]): void {
  const csv = generateHabitsCsv(habits);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `habits-export-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
