"use client";

import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reduceMotion;
}

export function useTilt(active = true) {
  const ref = useRef<HTMLElement | null>(null);
  const [style, setStyle] = useState({ transform: "" });
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !active || reduce) return;

    const handle = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 8;
      const rotateX = (0.5 - py) * 8;
      setStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)` });
    };

    const reset = () => {
      setStyle({ transform: "rotateX(0deg) rotateY(0deg) translateZ(0)" });
    };

    el.addEventListener("pointermove", handle);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointerup", reset);

    return () => {
      el.removeEventListener("pointermove", handle);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointerup", reset);
    };
  }, [active, reduce]);

  return { ref, style } as const;
}
