# Dark Mode Implementation Plan

## Overview

Add dark mode support to the Habit Tracker app with user preference persistence.

---

## 1. Install next-themes Package

```bash
npm install next-themes
```

**Why next-themes instead of custom context?**
- Prevents hydration mismatch errors (server vs client state)
- Eliminates flash of wrong theme (FOUC)
- Handles localStorage persistence automatically
- Respects system preference (`prefers-color-scheme`)
- Battle-tested with Next.js App Router

---

## 2. Enable Dark Mode in Tailwind

**File:** `tailwind.config.ts`

```typescript
const config: Config = {
  darkMode: "class",
  // ... rest of config
};
```

---

## 3. Create Providers Component

**New File:** `src/app/providers.tsx`

```typescript
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

- `attribute="class"` - Adds `dark` class to `<html>`
- `defaultTheme="system"` - Respects OS preference on first visit
- `enableSystem` - Listens for OS preference changes

---

## 4. Update Root Layout

**File:** `src/app/layout.tsx`

```typescript
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- `suppressHydrationWarning` - Required because next-themes modifies `<html>` after hydration

---

## 5. Create Theme Toggle Button

**New File:** `src/components/ThemeToggle.tsx`

```typescript
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {/* Sun/Moon icon */}
    </button>
  );
}
```

**Critical:** Must check `mounted` state before rendering theme-dependent UI to avoid hydration errors.

---

## 6. Update Components with Dark Mode Classes

### Header.tsx
| Element | Light | Dark |
|---------|-------|------|
| h1 | `text-gray-900` | `dark:text-white` |
| p (date) | `text-gray-500` | `dark:text-gray-400` |
| Add ThemeToggle button |

### Dashboard.tsx
| Element | Light | Dark |
|---------|-------|------|
| Card container | `bg-white border-gray-200` | `dark:bg-gray-800 dark:border-gray-700` |
| Icon backgrounds | `bg-blue-100`, etc. | `dark:bg-blue-900/50`, etc. |
| Label text | `text-gray-500` | `dark:text-gray-400` |
| Value text | `text-gray-900` | `dark:text-white` |

### AddHabitForm.tsx
| Element | Light | Dark |
|---------|-------|------|
| Input | `border-gray-300 text-gray-900` | `dark:bg-gray-800 dark:border-gray-600 dark:text-white` |
| Select | `border-gray-300 bg-white` | `dark:bg-gray-800 dark:border-gray-600 dark:text-white` |

### HabitItem.tsx
| Element | Light | Dark |
|---------|-------|------|
| Card (incomplete) | `border-gray-200 bg-white` | `dark:border-gray-700 dark:bg-gray-800` |
| Card (complete) | `border-green-200 bg-green-50` | `dark:border-green-800 dark:bg-green-900/30` |
| Habit name | `text-gray-900` | `dark:text-white` |
| Done button (inactive) | `bg-gray-100 text-gray-700` | `dark:bg-gray-700 dark:text-gray-200` |
| Delete button | `text-gray-400` | `dark:text-gray-500` |

### HabitList.tsx
| Element | Light | Dark |
|---------|-------|------|
| Empty state border | `border-gray-200` | `dark:border-gray-700` |
| Empty state icon | `text-gray-400` | `dark:text-gray-500` |
| Empty state heading | `text-gray-900` | `dark:text-white` |
| Empty state text | `text-gray-500` | `dark:text-gray-400` |

### ProgressBar.tsx
| Element | Light | Dark |
|---------|-------|------|
| Label text | `text-gray-500` | `dark:text-gray-400` |
| Track background | `bg-gray-200` | `dark:bg-gray-700` |

### Heatmap.tsx
| Element | Light | Dark |
|---------|-------|------|
| Card container | `bg-white border-gray-200` | `dark:bg-gray-800 dark:border-gray-700` |
| Heading | `text-gray-700` | `dark:text-gray-300` |
| Legend text | `text-gray-500` | `dark:text-gray-400` |
| Empty cell | `bg-gray-200` | `dark:bg-gray-700` |

### ExportButton.tsx
- No changes needed (blue button works in both modes)

---

## 7. File Summary

| Action | File |
|--------|------|
| Modify | `tailwind.config.ts` |
| Modify | `src/app/layout.tsx` |
| Create | `src/app/providers.tsx` |
| Create | `src/components/ThemeToggle.tsx` |
| Modify | `src/components/Header.tsx` |
| Modify | `src/components/Dashboard.tsx` |
| Modify | `src/components/AddHabitForm.tsx` |
| Modify | `src/components/HabitItem.tsx` |
| Modify | `src/components/HabitList.tsx` |
| Modify | `src/components/ProgressBar.tsx` |
| Modify | `src/components/Heatmap.tsx` |

**Total:** 2 new files, 9 modified files

---

## 8. Testing Checklist

- [ ] Toggle switches between light and dark modes
- [ ] Preference persists after page refresh
- [ ] System preference respected on first visit (no localStorage)
- [ ] No hydration warnings in console
- [ ] No flash of wrong theme on page load
- [ ] All text readable in both modes
- [ ] Form inputs usable in dark mode
- [ ] Heatmap colors visible in dark mode
- [ ] Category badges maintain distinction

---

## References

- [Dave Gray - Light & Dark Mode in Next.js App Router](https://www.davegray.codes/posts/light-dark-mode-nextjs-app-router-tailwind)
- [next-themes GitHub](https://github.com/pacocoursey/next-themes)
