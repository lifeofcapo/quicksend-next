"use client";
import { signIn } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export default function LoginPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  // center of viewport (guarded so code won't run on server)
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // only run on client
    const updateCenter = () => {
      if (typeof window !== "undefined") {
        setCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
    };

    updateCenter();
    window.addEventListener("resize", updateCenter);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateCenter);
    };
  }, []);

  // Позиция для глаз птички (следит за курсором)
  const eyeOffset = 120; // насколько смещён центр глаз относительно центра экрана

  // вычисляем смещение для зрачков с проверкой на клиент
  const { eyeMoveX, eyeMoveY } = useMemo(() => {
    if (typeof window === "undefined") return { eyeMoveX: 0, eyeMoveY: 0 };

    const eyeX = position.x - (center.x - eyeOffset);
    const eyeY = position.y - (center.y - 20); // чуть выше центра

    const angle = Math.atan2(eyeY, eyeX);
    const x = Math.cos(angle) * 6; 
    const y = Math.sin(angle) * 6;

    return { eyeMoveX: x, eyeMoveY: y };
  }, [position, center]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8 bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-slate-900 dark:to-sky-800 relative overflow-hidden transition-colors duration-300">

      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-28 h-28 bg-sky-200 rounded-full opacity-20 animate-float dark:bg-sky-700"></div>
        <div className="absolute top-1/4 -right-10 w-20 h-20 bg-indigo-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-indigo-300 rounded-full opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Большая синяя птичка */}
      <div className="relative mb-6 z-10">
        {/* Тело */}
        <div className="w-48 h-28 bg-sky-500 rounded-full relative shadow-xl dark:bg-sky-600">
          {/* Голова */}
          <div className="absolute -top-6 -right-6 w-18 h-18 bg-sky-400 rounded-full dark:bg-sky-300">
            {/* Два глаза */}
            <div className="absolute top-4 left-3 w-6 h-6 bg-white rounded-full overflow-hidden">
              <div
                className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full transition-transform duration-150"
                style={{ transform: `translate(${eyeMoveX}px, ${eyeMoveY}px)` }}
              />
            </div>
            <div className="absolute top-4 right-3 w-6 h-6 bg-white rounded-full overflow-hidden">
              <div
                className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full transition-transform duration-150"
                style={{ transform: `translate(${eyeMoveX}px, ${eyeMoveY}px)` }}
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

        {/* Лапки */}
        <div className="flex gap-6 justify-center mt-1">
          <div className="w-1 h-8 bg-amber-400 rounded-sm dark:bg-amber-300 transform translate-y-2"></div>
          <div className="w-1 h-8 bg-amber-400 rounded-sm dark:bg-amber-300 transform translate-y-2"></div>
        </div>
      </div>

      {/* Контент */}
      <div className="text-center z-10 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in dark:bg-slate-800/70 dark:border-slate-700">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-700 to-indigo-600 bg-clip-text text-transparent mb-2 dark:from-sky-300 dark:to-indigo-300">
          Рады видеть вас!
        </h1>

        <p className="text-gray-500 mb-8 max-w-md dark:text-gray-400">
          Присоединяйтесь к нашему сообществу и откройте для себя выгодные услуги.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:bg-slate-900 dark:text-gray-100 dark:border-slate-700"
        >
          {/* Анимированный фон кнопки */}
          <div className={`absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

          {/* Контент кнопки */}
          <div className="relative z-10 flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className={isHovered ? 'text-white' : 'text-gray-700'}>
              Continue with Google
            </span>
          </div>
        </button>

        <p className="text-sm text-gray-400 mt-6 dark:text-gray-400">
          Безопасный вход · Конфиденциальность защищена
        </p>
      </div>

      {/* Дополнительные декоративные элементы */}
      <div className="absolute bottom-10 left-10 w-10 h-10 bg-teal-400 rounded-full opacity-20 animate-pulse dark:bg-teal-600"></div>
      <div className="absolute top-10 right-10 w-8 h-8 bg-pink-400 rounded-full opacity-30 animate-bounce dark:bg-pink-600"></div>
    </div>
  );
}
