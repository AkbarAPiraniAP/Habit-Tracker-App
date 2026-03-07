/**
 * Gets the dates for the current week (Monday to Sunday)
 */
function getCurrentWeekDates(): string[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  // Adjust so Monday is 0, Sunday is 6
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + mondayOffset + i);
    weekDates.push(date.toISOString().split("T")[0]);
  }

  return weekDates;
}

/**
 * Calculates how many days this week a habit was completed
 */
export function getWeeklyCompletions(completedDates: string[]): number {
  const weekDates = getCurrentWeekDates();
  return completedDates.filter((date) => weekDates.includes(date)).length;
}
