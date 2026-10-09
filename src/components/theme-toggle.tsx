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
      className="relative inline-flex shrink-0 items-center rounded-full border-0 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#798069]"
      style={{
        height: 22,
        width: 38,
        padding: 2,
        backgroundColor: dark ? "#172033" : "#F3EEE6",
        boxShadow: dark
          ? "inset 0 2px 6px rgba(18, 26, 42, 0.65)"
          : "inset 0 2px 6px rgba(217, 205, 184, 0.9)",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none block rounded-full"
        style={{
          height: 18,
          width: 18,
          backgroundColor: "#798069",
          boxShadow: dark
            ? "0 1px 5px rgba(18, 26, 42, 0.55)"
            : "0 1px 5px rgba(217, 205, 184, 0.85)",
          transform: dark ? "translateX(16px)" : "translateX(0px)",
          transition: reduceMotion ? "none" : "transform 160ms ease",
        }}
      />
    </button>
  );
}
