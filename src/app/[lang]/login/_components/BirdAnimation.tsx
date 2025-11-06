// @/app/[lang]/login/_components/BirdAnimation.tsx
'use client';
import { useEffect, useMemo, useState } from "react";

interface EyePosition {
  leftEyeMoveX: number;
  leftEyeMoveY: number;
  rightEyeMoveX: number;
  rightEyeMoveY: number;
}

export default function BirdAnimation() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [birdCenter, setBirdCenter] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const updateBirdCenter = () => {
      if (typeof window !== "undefined") {
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;
        
        setBirdCenter({ 
          x: viewportCenterX, 
          y: viewportCenterY - 100
        });
      }
    };

    updateBirdCenter();
    window.addEventListener("resize", updateBirdCenter);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateBirdCenter);
    };
  }, []);

  // Вычисляем смещение для зрачков
  const eyePosition: EyePosition = useMemo(() => {
    // На сервере возвращаем нулевые значения
    if (!isClient) {
      return {
        leftEyeMoveX: 0,
        leftEyeMoveY: 0,
        rightEyeMoveX: 0,
        rightEyeMoveY: 0
      };
    }

    // Центр каждого глаза относительно центра птички
    const leftEyeCenterX = birdCenter.x - 90;
    const leftEyeCenterY = birdCenter.y - 20;
    
    const rightEyeCenterX = birdCenter.x - 60;
    const rightEyeCenterY = birdCenter.y - 20;

    // Для левого глаза
    const leftEyeX = position.x - leftEyeCenterX;
    const leftEyeY = position.y - leftEyeCenterY;

    // Для правого глаза
    const rightEyeX = position.x - rightEyeCenterX;
    const rightEyeY = position.y - rightEyeCenterY;

    const leftAngle = Math.atan2(leftEyeY, leftEyeX);
    const rightAngle = Math.atan2(rightEyeY, rightEyeX);

    const maxMovement = 6;

    // Ограничиваем движение зрачков внутри глаза
    const leftDistance = Math.min(Math.sqrt(leftEyeX * leftEyeX + leftEyeY * leftEyeY) / 50, 1);
    const rightDistance = Math.min(Math.sqrt(rightEyeX * rightEyeX + rightEyeY * rightEyeY) / 50, 1);

    const leftX = Math.cos(leftAngle) * maxMovement * leftDistance;
    const leftY = Math.sin(leftAngle) * maxMovement * leftDistance;
    
    const rightX = Math.cos(rightAngle) * maxMovement * rightDistance;
    const rightY = Math.sin(rightAngle) * maxMovement * rightDistance;

    return { 
      leftEyeMoveX: leftX, 
      leftEyeMoveY: leftY,
      rightEyeMoveX: rightX,
      rightEyeMoveY: rightY
    };
  }, [position, birdCenter, isClient]);

  // Используем стиль только после гидратации
  const leftEyeStyle = isClient ? {
    transform: `translate(${eyePosition.leftEyeMoveX}px, ${eyePosition.leftEyeMoveY}px)`
  } : {};

  const rightEyeStyle = isClient ? {
    transform: `translate(${eyePosition.rightEyeMoveX}px, ${eyePosition.rightEyeMoveY}px)`
  } : {};

  return (
    <div className="relative mb-6 z-10">
      {/* Тело */}
      <div className="w-48 h-28 bg-sky-500 rounded-full relative shadow-xl dark:bg-sky-600">
        {/* Голова */}
        <div className="absolute -top-6 -right-6 w-18 h-18 bg-sky-400 rounded-full dark:bg-sky-300">
          {/* Два глаза */}
          <div className="absolute top-4 left-3 w-6 h-6 bg-white rounded-full overflow-hidden">
            <div
              className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full transition-transform duration-150"
              style={leftEyeStyle}
            />
          </div>
          <div className="absolute top-4 right-3 w-6 h-6 bg-white rounded-full overflow-hidden">
            <div
              className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full transition-transform duration-150"
              style={rightEyeStyle}
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