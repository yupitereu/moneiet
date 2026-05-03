'use client';

import { MoonIcon, SunIcon } from '@repo/ui';
import { useState } from 'react';

type Theme = 'light' | 'dark';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
  document.cookie = `theme=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

export function ThemeToggle({ initialTheme }: { initialTheme: Theme }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const handleToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent"
      aria-label="Toggle dark mode"
      aria-pressed={theme === 'dark'}
    >
      {theme === 'dark' ? <SunIcon size="md" /> : <MoonIcon size="md" />}
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}
