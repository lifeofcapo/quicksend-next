'use client';

import { useEffect, useRef } from 'react';

export default function AnimationWrapper() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const createBox = () => {
      const box = document.createElement('div');
      box.className = 'absolute w-8 h-8 bg-blue-400/20 rounded-lg';
      box.style.left = Math.random() * 100 + '%';
      box.style.animationDuration = Math.random() * 10 + 10 + 's';
      box.style.animationDelay = Math.random() * 5 + 's';
      box.style.animation = 'float 20s infinite ease-in-out';
      return box;
    };

    const boxes = Array.from({ length: 10 }, createBox);
    boxes.forEach(box => canvasRef.current?.appendChild(box));

    return () => {
      boxes.forEach(box => box.remove());
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div ref={canvasRef} className="relative w-full h-full" />
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10%, 90% { opacity: 0.5; }
          50% { transform: translateY(-100vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}