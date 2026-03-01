# Habit Tracker - Feature Plan

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety, better DX |
| Tailwind CSS | Utility-first styling |

---

## Project Folder Structure

```
habit-tracker/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts/metadata
│   │   ├── page.tsx            # Home page - main habit tracker view
│   │   └── globals.css         # Tailwind directives + global styles
│   │
│   ├── components/
│   │   ├── Header.tsx          # App title and current date
│   │   ├── HabitList.tsx       # Container for all habits
│   │   ├── HabitItem.tsx       # Single habit row with toggle
│   │   └── AddHabitForm.tsx    # Input + button to add habit
│   │
│   ├── hooks/
│   │   └── useHabits.ts        # Custom hook for habit CRUD operations
│   │
│   ├── types/
│   │   └── habit.ts            # TypeScript interfaces
│   │
│   └── utils/
│       └── storage.ts          # localStorage read/write helpers
│
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## MVP Components

### 1. Header
- App title: "Habit Tracker"
- Display current date (e.g., "Sunday, March 1")

### 2. AddHabitForm
- Text input for habit name
- Submit button
- Clears input after adding

### 3. HabitList
- Maps over habits array
- Renders HabitItem for each
- Shows empty state when no habits exist

### 4. HabitItem
- Habit name display
- Checkbox to toggle today's completion
- Delete button (trash icon or X)
- Visual distinction for completed vs incomplete

---

## localStorage Data Structure

### Habit Interface
```typescript
interface Habit {
  id: string;              // Unique ID (crypto.randomUUID or Date.now)
  name: string;            // Habit name
  createdAt: string;       // ISO date string
  completedDates: string[]; // Array of "YYYY-MM-DD" strings
}
```

### Storage Key
- Key: `"habit-tracker-habits"`
- Value: `JSON.stringify(Habit[])`

### Operations
| Action | Implementation |
|--------|----------------|
| Load habits | Read key, parse JSON, return array (or empty array) |
| Save habits | Stringify array, write to key |
| Add habit | Create new Habit object, append to array, save |
| Delete habit | Filter out by ID, save |
| Toggle today | Find habit, add/remove today's date from completedDates, save |

### Helper Functions (utils/storage.ts)
- `getStoredHabits(): Habit[]`
- `saveHabits(habits: Habit[]): void`

### Custom Hook (hooks/useHabits.ts)
- Returns: `{ habits, addHabit, deleteHabit, toggleHabit }`
- Loads from localStorage on mount
- Saves to localStorage on every change

---

## Development Rounds

### Round 1 - MVP (Current Focus)
- [x] Project setup (Next.js + TypeScript + Tailwind)
- [ ] Header component with date
- [ ] AddHabitForm component
- [ ] HabitList component
- [ ] HabitItem component with toggle and delete
- [ ] useHabits hook with localStorage persistence
- [ ] Basic responsive layout
- [ ] Empty state when no habits

**Definition of Done for Round 1:**
User can add habits, mark them complete for today, delete them, and data persists on refresh.

---

### Round 2 - History & Feedback
- Weekly calendar view showing last 7 days
- Edit habit name inline
- Current streak counter per habit
- Subtle animations on toggle

---

### Round 3 - Organization & Insights
- Categories/tags for grouping habits
- Frequency options (daily, weekdays, custom)
- Statistics page with completion rates
- Export data as JSON

---

### Round 4+ - Future Enhancements
- Dark mode toggle
- Browser notifications/reminders
- Multiple theme options
- User accounts + cloud sync (requires backend)
- Mobile app (React Native)

---

## Notes

- All data stays in the browser (no backend for MVP)
- Use `"use client"` directive for components that need localStorage
- Date comparisons use "YYYY-MM-DD" format for simplicity
- Keep components small and focused (per CLAUDE.md rules)
