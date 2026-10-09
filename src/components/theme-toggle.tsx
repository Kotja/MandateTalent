"use client";

import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "mandate-theme";

function preferredDark() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
  } catch {
    /* private mode */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch {
    /* private mode */
  }
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useLayoutEffect(() => {
    const next = preferredDark();
    applyTheme(next);
    setDark(next);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  function choose(next: boolean) {
    applyTheme(next);
    setDark(next);
  }

  return (
    <button
      type="button"
      aria-label="Dark mode"
      aria-pressed={dark}
      onClick={() => choose(!dark)}
      className="theme-glass-toggle focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#798069]"
    >
      <span
        aria-hidden="true"
        className="theme-glass-toggle__thumb"
        style={{
          transform: dark ? "translateX(16px)" : "translateX(0px)",
          transition: reduceMotion ? "none" : "transform 160ms ease",
        }}
      />
    </button>
  );
}
