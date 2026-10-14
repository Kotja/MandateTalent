"use client";

import { useEffect } from "react";

const MAX_TILT_DEG = 30;

/**
 * Viewport tilt for .glass-cta — must run after hydrate.
 * A head script used to set --glass-* inline before React hydrated, which
 * triggered hydration mismatches on Register interest / form CTAs.
 */
export function GlassCtaTilt() {
  useEffect(() => {
    let reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tick = false;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      reduce = mq.matches;
      update();
    };
    mq.addEventListener("change", onMotion);

    function update() {
      const nodes = document.querySelectorAll<HTMLElement>(".glass-cta");
      if (reduce) {
        nodes.forEach((el) => {
          el.style.setProperty("--glass-rx", "0deg");
          el.style.setProperty("--glass-top", "0");
          el.style.setProperty("--glass-bot", "0");
        });
        return;
      }

      const mid = window.innerHeight * 0.5;
      nodes.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
        const y = r.top + r.height * 0.5;
        let t = (y - mid) / mid;
        if (t < -1) t = -1;
        if (t > 1) t = 1;
        const deg = -t * MAX_TILT_DEG;
        const top = Math.max(0, t);
        const bot = Math.max(0, -t);
        el.style.setProperty("--glass-rx", `${deg.toFixed(2)}deg`);
        el.style.setProperty("--glass-top", top.toFixed(3));
        el.style.setProperty("--glass-bot", bot.toFixed(3));
      });
    }

    function onScroll() {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        tick = false;
        update();
      });
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      mq.removeEventListener("change", onMotion);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
