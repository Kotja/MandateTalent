"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Pt = { x: number; y: number; t: number };

/**
 * Canvas comet: one continuous tapering ribbon along pointer history.
 * Avoids per-segment round-cap “UFO stamps”.
 */
export function TactileGrain() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const points: Pt[] = [];
    const MAX_AGE_MS = 1200;
    const MAX_POINTS = 72;

    let ambientX = 0.58;
    let ambientY = 0.32;
    let ambientTargetX = 0.58;
    let ambientTargetY = 0.32;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isDark = false;

    const readTheme = () => {
      isDark = document.documentElement.classList.contains("dark");
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event: PointerEvent) => {
      if (reduceMotion.matches) return;
      const now = performance.now();
      const x = event.clientX;
      const y = event.clientY;

      if (points.length === 0) {
        // Seed a long starter trail so the first frames are already comet-shaped.
        for (let i = 8; i >= 1; i--) {
          points.push({
            x: x - i * 28,
            y: y + i * 10,
            t: now - i * 70,
          });
        }
      }

      const last = points[points.length - 1];
      if (last && Math.hypot(x - last.x, y - last.y) < 4) {
        last.x = x;
        last.y = y;
        last.t = now;
      } else {
        points.push({ x, y, t: now });
      }
      while (points.length > MAX_POINTS) points.shift();

      ambientTargetX = 0.5 + (x / Math.max(width, 1) - 0.5) * 0.22;
      ambientTargetY = 0.42 + (y / Math.max(height, 1) - 0.5) * 0.18;
    };

    const prune = (now: number) => {
      while (points.length && now - points[0].t > MAX_AGE_MS) points.shift();
    };

    /** Chaikin-ish smooth for a continuous curve */
    const smooth = (pts: Pt[]): Pt[] => {
      if (pts.length < 3) return pts;
      const out: Pt[] = [pts[0]];
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        out.push({
          x: a.x * 0.75 + b.x * 0.25,
          y: a.y * 0.75 + b.y * 0.25,
          t: a.t * 0.75 + b.t * 0.25,
        });
        out.push({
          x: a.x * 0.25 + b.x * 0.75,
          y: a.y * 0.25 + b.y * 0.75,
          t: a.t * 0.25 + b.t * 0.75,
        });
      }
      out.push(pts[pts.length - 1]);
      return out;
    };

    const fillRibbon = (
      pts: Pt[],
      headWidth: number,
      tipWidth: number,
      fill: string,
      blur: number,
    ) => {
      if (pts.length < 2) return;
      const left: { x: number; y: number }[] = [];
      const right: { x: number; y: number }[] = [];

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const p0 = pts[Math.max(0, i - 1)];
        const p1 = pts[Math.min(pts.length - 1, i + 1)];
        let dx = p1.x - p0.x;
        let dy = p1.y - p0.y;
        const len = Math.hypot(dx, dy) || 1;
        dx /= len;
        dy /= len;
        const nx = -dy;
        const ny = dx;
        const t = i / (pts.length - 1); // 0 tip → 1 head
        // Gentle ease — soft comet, not a hard wedge
        const ease = t * t * (3 - 2 * t);
        const w = tipWidth + (headWidth - tipWidth) * ease;
        left.push({ x: p.x + nx * w, y: p.y + ny * w });
        right.push({ x: p.x - nx * w, y: p.y - ny * w });
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowBlur = blur;
      ctx.shadowColor = fill;
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(left[0].x, left[0].y);
      for (let i = 1; i < left.length; i++) ctx.lineTo(left[i].x, left[i].y);
      for (let i = right.length - 1; i >= 0; i--) {
        ctx.lineTo(right[i].x, right[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      prune(now);
      if (reduceMotion.matches || points.length < 2) return;

      const head = points[points.length - 1];
      // Only use real history — no artificial straight spike (that read as a searchlight).
      if (points.length < 3) return;

      const smoothed = smooth(smooth(points));
      const tip = smoothed[0];
      const travel = Math.hypot(head.x - tip.x, head.y - tip.y);
      if (travel < 48) return; // wait until we have a real trail length

      const life = Math.min(1, Math.max(0.35, 1 - (now - head.t) / 650));

      // Softer comet: wide faint halo + slight glow, muted core (no hard disc).
      if (isDark) {
        fillRibbon(smoothed, 96, 28, `rgba(80, 120, 180, ${0.1 * life})`, 56);
        fillRibbon(smoothed, 64, 18, `rgba(120, 160, 215, ${0.18 * life})`, 38);
        fillRibbon(smoothed, 36, 10, `rgba(190, 215, 245, ${0.28 * life})`, 22);
        fillRibbon(smoothed, 18, 5, `rgba(230, 240, 255, ${0.32 * life})`, 10);
      } else {
        fillRibbon(smoothed, 100, 30, `rgba(255, 215, 165, ${0.14 * life})`, 54);
        fillRibbon(smoothed, 68, 20, `rgba(255, 230, 190, ${0.22 * life})`, 36);
        fillRibbon(smoothed, 38, 11, `rgba(255, 245, 220, ${0.32 * life})`, 20);
        fillRibbon(smoothed, 18, 5, `rgba(255, 252, 245, ${0.38 * life})`, 8);
      }

      // Slight head glow — diffuse, not a UFO blob
      const r = 36;
      const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, r * 2.6);
      if (isDark) {
        g.addColorStop(0, `rgba(210, 225, 255, ${0.22 * life})`);
        g.addColorStop(0.45, `rgba(140, 175, 220, ${0.1 * life})`);
        g.addColorStop(1, "rgba(140, 175, 220, 0)");
      } else {
        g.addColorStop(0, `rgba(255, 248, 230, ${0.28 * life})`);
        g.addColorStop(0.45, `rgba(255, 230, 190, ${0.12 * life})`);
        g.addColorStop(1, "rgba(255, 230, 190, 0)");
      }
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(head.x, head.y, r * 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = (now: number) => {
      ambientX += (ambientTargetX - ambientX) * 0.04;
      ambientY += (ambientTargetY - ambientY) * 0.04;
      root.style.setProperty("--glow-x", `${ambientX * 100}%`);
      root.style.setProperty("--glow-y", `${ambientY * 100}%`);
      readTheme();
      draw(now);
      raf = requestAnimationFrame(tick);
    };

    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    readTheme();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    if (!reduceMotion.matches) raf = requestAnimationFrame(tick);

    const onMotionChange = () => {
      cancelAnimationFrame(raf);
      points.length = 0;
      ctx.clearRect(0, 0, width, height);
      if (!reduceMotion.matches) raf = requestAnimationFrame(tick);
    };
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      reduceMotion.removeEventListener("change", onMotionChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="page-atmosphere"
      aria-hidden="true"
      style={{ "--glow-x": "58%", "--glow-y": "32%" } as CSSProperties}
    >
      <div className="page-atmosphere__glow" />
      <canvas ref={canvasRef} className="page-atmosphere__comet-canvas" />
      <div className="page-atmosphere__grain" />
    </div>
  );
}
