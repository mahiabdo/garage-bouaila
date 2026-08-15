"use client";

import { useEffect, useRef, useState } from "react";

interface Props { to: number; duration?: number; suffix?: string }

export default function Counter({ to, duration = 1000, suffix = "" }: Props) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const start = performance.now();
    function step(now: number) {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(t * to));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [to, duration]);

  return <div className="text-3xl font-black text-[var(--text)]">{value}{suffix}</div>;
}
