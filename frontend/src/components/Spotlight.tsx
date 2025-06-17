/* src/components/Spotlight.tsx */
"use client";

import { useEffect, useState } from "react";

export default function Spotlight() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(99,102,241,.15) 0%, transparent 50%)`,
      }}
    />
  );
}
