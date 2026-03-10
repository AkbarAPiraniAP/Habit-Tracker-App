import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Habit Tracker</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{formattedDate}</p>
      </div>
      <ThemeToggle />
    </header>
  );
}
