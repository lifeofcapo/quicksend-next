// @/app/[lang]/login/_components/BirdAnimation.tsx
'use client';
import { useEffect, useMemo, useState, useRef } from "react";

export default function BirdAnimation() {
  const birdRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [eyeCenter, setEyeCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateEyeCenter = () => {
      if (!birdRef.current) return;
      const rect = birdRef.current.getBoundingClientRect();
      setEyeCenter({
        x: rect.left + rect.width * 0.72,
        y: rect.top + rect.height * 0.28,
      });
    };

    updateEyeCenter();
    window.addEventListener("resize", updateEyeCenter);

    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", updateEyeCenter);
    };
  }, []);

  const eyePositions = useMemo(() => {
    const dx = mouse.x - eyeCenter.x;
    const dy = mouse.y - eyeCenter.y;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(Math.hypot(dx, dy) / 60, 1);
    const max = 6;

    return {
      left: {
        x: Math.cos(angle) * max * dist,
        y: Math.sin(angle) * max * dist,
      },
      right: {
        x: Math.cos(angle) * max * dist,
        y: Math.sin(angle) * max * dist,
      }
    };
  }, [mouse, eyeCenter]);

  return (
    <div className="relative mb-6 z-10" ref={birdRef}>
      {/* Тело */}
      <div className="w-48 h-28 bg-sky-500 rounded-full relative shadow-xl dark:bg-sky-600">
        {/* Голова */}
        <div className="absolute -top-6 -right-6 w-18 h-18 bg-sky-400 rounded-full dark:bg-sky-300">
          {/* Два глаза */}
          <div className="absolute top-4 left-3 w-6 h-6 bg-white rounded-full overflow-hidden">
            <div
              className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full transition-transform duration-150"
              style={{
                transform: `translate(${eyePositions.left.x}px, ${eyePositions.left.y}px)`,
              }}
            />
          </div>
          <div className="absolute top-4 right-3 w-6 h-6 bg-white rounded-full overflow-hidden">
            <div
              className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full transition-transform duration-150"
              style={{
                transform: `translate(${eyePositions.right.x}px, ${eyePositions.right.y}px)`,
              }}
            />
          </div>

          {/* Клюв */}
          <div className="absolute top-10 left-6 w-6 h-3 bg-amber-400 rounded-sm dark:bg-amber-300 transform rotate-6"></div>
        </div>

        {/* Крыло */}
        <div className="absolute top-8 left-6 w-20 h-12 bg-sky-600 rounded-full dark:bg-sky-500 shadow-inner transform rotate-3" />

        {/* Хвост */}
        <div className="absolute top-8 -left-6 w-10 h-8 bg-sky-700 rounded-r-full dark:bg-sky-500 transform -rotate-6" />
      </div>

      {/* Лапы */}
      <div className="flex gap-6 justify-center mt-1">
        <div className="w-1 h-8 bg-amber-400 rounded-sm dark:bg-amber-300 transform translate-y-2"></div>
        <div className="w-1 h-8 bg-amber-400 rounded-sm dark:bg-amber-300 transform translate-y-2"></div>
      </div>
    </div>
  );
}