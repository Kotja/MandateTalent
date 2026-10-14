/**
 * Markup-only toggle. Theme flip is handled by the head script in layout.tsx
 * so it still works when client hydration fails (e.g. tunnelled previews).
 * Thumb position is pure CSS via `html.dark .theme-glass-toggle__thumb`.
 */
export function ThemeToggle() {
  return (
    <button
      type="button"
      data-theme-toggle
      aria-label="Dark mode"
      className="theme-glass-toggle focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#798069]"
    >
      <span className="theme-glass-toggle__track" aria-hidden="true">
        <span className="theme-glass-toggle__thumb" />
      </span>
    </button>
  );
}
