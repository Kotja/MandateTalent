"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Fixed atmosphere: fine static grain + soft radial spotlight.
 * Main glow keeps the liked gradient (slow drift + gentle pointer ease).
 * A second, more postponed “tail” glow lags behind the cursor.
 */
export function TactileGrain() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Ambient / primary spotlight — mild response so the gradient stays soft.
    let targetX = 58;
    let targetY = 28;
    let currentX = 58;
    let currentY = 28;

    // Postponed tail — heavier lag so it reads as a delayed trail, not a snap.
    let tailTargetX = 58;
    let tailTargetY = 28;
    let tailX = 58;
    let tailY = 28;

    // Short history so the tail aims at where the pointer was ~280ms ago.
    const history: { x: number; y: number; t: number }[] = [];
    const TAIL_DELAY_MS = 420;
    let raf = 0;

    const apply = () => {
      root.style.setProperty("--glow-x", `${currentX}%`);
      root.style.setProperty("--glow-y", `${currentY}%`);
      root.style.setProperty("--tail-x", `${tailX}%`);
      root.style.setProperty("--tail-y", `${tailY}%`);
    };

    const pointerToField = (clientX: number, clientY: number) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (clientX / w) * 100;
      const ny = (clientY / h) * 100;
      // Bias toward center so the light never snaps hard to edges.
      return {
        x: 50 + (nx - 50) * 0.55,
        y: 42 + (ny - 42) * 0.45,
      };
    };

    const delayedPointer = (now: number) => {
      const want = now - TAIL_DELAY_MS;
      while (history.length > 1 && history[1].t <= want) {
        history.shift();
      }
      if (history.length === 0) {
        return { x: tailTargetX, y: tailTargetY };
      }
      if (history.length === 1 || history[0].t >= want) {
        return { x: history[0].x, y: history[0].y };
      }
      const a = history[0];
      const b = history[1];
      const span = b.t - a.t || 1;
      const t = Math.min(1, Math.max(0, (want - a.t) / span));
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
      };
    };

    const tick = (now: number) => {
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;

      const delayed = delayedPointer(now);
      tailTargetX = delayed.x;
      tailTargetY = delayed.y;
      // Extra ease on top of the time delay → soft trailing feel.
      tailX += (tailTargetX - tailX) * 0.055;
      tailY += (tailTargetY - tailY) * 0.055;

      apply();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (reduceMotion.matches) return;
      const field = pointerToField(event.clientX, event.clientY);
      targetX = field.x;
      targetY = field.y;
      history.push({ x: field.x, y: field.y, t: performance.now() });
      // Cap history so idle memory stays small (~1s).
      while (history.length > 64) history.shift();
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
        tailTargetX = 58;
        tailTargetY = 28;
        tailX = 58;
        tailY = 28;
        history.length = 0;
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
    "--tail-x": "58%",
    "--tail-y": "28%",
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="page-atmosphere"
      aria-hidden="true"
      style={initialGlow}
    >
      <div className="page-atmosphere__glow" />
      <div className="page-atmosphere__tail" />
      <div className="page-atmosphere__grain" />
    </div>
  );
}
