import { getTodayDateString } from "./storage";

/**
 * Calculates the current streak for a habit based on completed dates.
 * A streak = number of consecutive days the habit was completed.
 * If a day is missed, the streak resets to 0.
 */
export function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) {
    return 0;
  }

  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));
  const today = getTodayDateString();
  const yesterday = getDateString(-1);

  const mostRecentDate = sortedDates[0];
  if (mostRecentDate !== today && mostRecentDate !== yesterday) {
    return 0;
  }

  let streak = 0;
  let expectedDate = mostRecentDate === today ? today : yesterday;

  for (const date of sortedDates) {
    if (date === expectedDate) {
      streak++;
      expectedDate = getPreviousDateString(expectedDate);
    } else if (date < expectedDate) {
      break;
    }
  }

  return streak;
}

/**
 * Gets a date string for a day offset from today.
 * Negative values go into the past.
 */
function getDateString(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split("T")[0];
}

/**
 * Gets the date string for the day before the given date.
 */
function getPreviousDateString(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
}
