"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Atmosphere: fine grain + soft ambient wash + comet-like cursor trail.
 * Head eases toward the pointer; the bright streak lags and stretches behind.
 */
export function TactileGrain() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Soft ambient wash (not a hard UFO blob) — mild pointer ease.
    let ambientTargetX = 58;
    let ambientTargetY = 32;
    let ambientX = 58;
    let ambientY = 32;

    // Comet head (near pointer) + mid + tip (postponed trail).
    let headTargetX = 58;
    let headTargetY = 32;
    let headX = 58;
    let headY = 32;
    let midX = 52;
    let midY = 36;
    let tipX = 46;
    let tipY = 40;
    let angleDeg = -18;
    let length = 18;

    const history: { x: number; y: number; t: number }[] = [];
    const MID_DELAY_MS = 160;
    const TIP_DELAY_MS = 480;
    let raf = 0;
    let lastMoveAt = 0;

    const apply = () => {
      root.style.setProperty("--glow-x", `${ambientX}%`);
      root.style.setProperty("--glow-y", `${ambientY}%`);
      root.style.setProperty("--head-x", `${headX}%`);
      root.style.setProperty("--head-y", `${headY}%`);
      root.style.setProperty("--mid-x", `${midX}%`);
      root.style.setProperty("--mid-y", `${midY}%`);
      root.style.setProperty("--tip-x", `${tipX}%`);
      root.style.setProperty("--tip-y", `${tipY}%`);
      root.style.setProperty("--comet-angle", `${angleDeg}deg`);
      root.style.setProperty("--comet-length", `${length}`);
      root.style.setProperty(
        "--comet-active",
        performance.now() - lastMoveAt < 900 ? "1" : "0.55",
      );
    };

    const pointerToField = (clientX: number, clientY: number) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (clientX / w) * 100;
      const ny = (clientY / h) * 100;
      return {
        x: 50 + (nx - 50) * 0.72,
        y: 48 + (ny - 48) * 0.62,
      };
    };

    const sampleAt = (now: number, delayMs: number, fallbackX: number, fallbackY: number) => {
      const want = now - delayMs;
      while (history.length > 1 && history[1].t <= want) {
        history.shift();
      }
      if (history.length === 0) return { x: fallbackX, y: fallbackY };
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
      ambientX += (ambientTargetX - ambientX) * 0.03;
      ambientY += (ambientTargetY - ambientY) * 0.03;

      headX += (headTargetX - headX) * 0.14;
      headY += (headTargetY - headY) * 0.14;

      const midSample = sampleAt(now, MID_DELAY_MS, midX, midY);
      const tipSample = sampleAt(now, TIP_DELAY_MS, tipX, tipY);
      midX += (midSample.x - midX) * 0.1;
      midY += (midSample.y - midY) * 0.1;
      tipX += (tipSample.x - tipX) * 0.07;
      tipY += (tipSample.y - tipY) * 0.07;

      const dx = headX - tipX;
      const dy = headY - tipY;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.35) {
        angleDeg += (((Math.atan2(dy, dx) * 180) / Math.PI) - angleDeg) * 0.12;
        length += (Math.min(42, Math.max(14, dist * 1.35)) - length) * 0.1;
      } else {
        length += (14 - length) * 0.06;
      }

      apply();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (reduceMotion.matches) return;
      const field = pointerToField(event.clientX, event.clientY);
      lastMoveAt = performance.now();
      headTargetX = field.x;
      headTargetY = field.y;
      // Ambient wash drifts gently with the pointer, not locked to it.
      ambientTargetX = 50 + (field.x - 50) * 0.35;
      ambientTargetY = 40 + (field.y - 40) * 0.28;
      history.push({ x: field.x, y: field.y, t: lastMoveAt });
      while (history.length > 96) history.shift();
    };

    apply();

    if (!reduceMotion.matches) {
      raf = requestAnimationFrame(tick);
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    const onMotionChange = () => {
      if (reduceMotion.matches) {
        cancelAnimationFrame(raf);
        ambientX = ambientTargetX = 58;
        ambientY = ambientTargetY = 32;
        headX = headTargetX = 58;
        headY = headTargetY = 32;
        midX = 52;
        midY = 36;
        tipX = 46;
        tipY = 40;
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

  const initial = {
    "--glow-x": "58%",
    "--glow-y": "32%",
    "--head-x": "58%",
    "--head-y": "32%",
    "--mid-x": "52%",
    "--mid-y": "36%",
    "--tip-x": "46%",
    "--tip-y": "40%",
    "--comet-angle": "-18deg",
    "--comet-length": "18",
    "--comet-active": "0.55",
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="page-atmosphere"
      aria-hidden="true"
      style={initial}
    >
      <div className="page-atmosphere__glow" />
      <div className="page-atmosphere__comet">
        <div className="page-atmosphere__comet-streak" />
        <div className="page-atmosphere__comet-head" />
      </div>
      <div className="page-atmosphere__grain" />
    </div>
  );
}
