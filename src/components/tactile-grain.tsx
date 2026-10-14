"use client";

/**
 * Fixed atmosphere: fine static grain only.
 * No comet trail, sparkle ribbon, ambient glow, or cursor-follow light.
 */
export function TactileGrain() {
  return (
    <div className="page-atmosphere" aria-hidden="true">
      <div className="page-atmosphere__grain" />
    </div>
  );
}
