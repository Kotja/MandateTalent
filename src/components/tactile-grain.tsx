"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Fixed atmosphere: fine static grain + a soft radial spotlight.
 * The glow drifts slowly on its own and eases toward the pointer.
 */
export function TactileGrain() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let targetX = 58;
    let targetY = 28;
    let currentX = 58;
    let currentY = 28;
    let raf = 0;

    const apply = () => {
      root.style.setProperty("--glow-x", `${currentX}%`);
      root.style.setProperty("--glow-y", `${currentY}%`);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;
      apply();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (reduceMotion.matches) return;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      // Keep response subtle — bias toward the page center so the light never snaps hard.
      const nx = (event.clientX / w) * 100;
      const ny = (event.clientY / h) * 100;
      targetX = 50 + (nx - 50) * 0.55;
      targetY = 42 + (ny - 42) * 0.45;
    };

    apply();

    if (!reduceMotion.matches) {
      raf = requestAnimationFrame(tick);
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    const onMotionChange = () => {
      if (reduceMotion.matches) {
        cancelAnimationFrame(raf);
        targetX = 58;
        targetY = 28;
        currentX = 58;
        currentY = 28;
        apply();
        window.removeEventListener("pointermove", onMove);
      } else {
        raf = requestAnimationFrame(tick);
        window.addEventListener("pointermove", onMove, { passive: true });
      }
    };

    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  const initialGlow = {
    "--glow-x": "58%",
    "--glow-y": "28%",
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="page-atmosphere"
      aria-hidden="true"
      style={initialGlow}
    >
      <div className="page-atmosphere__glow" />
      <div className="page-atmosphere__grain" />
    </div>
  );
}
