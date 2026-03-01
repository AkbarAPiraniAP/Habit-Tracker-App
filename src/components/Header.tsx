export function Header() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
      <p className="mt-1 text-gray-500">{formattedDate}</p>
    </header>
  );
}
