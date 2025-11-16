// components/LottieAnimation.tsx
'use client';

import dynamic from 'next/dynamic';
import { useTheme } from '@/contexts/theme-context';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { 
    ssr: false,
    loading: () => (
      <div 
        className="flex items-center justify-center bg-transparent"
        style={{ 
          height: '500px', 
          width: '500px',
          maxWidth: '100%',
        }}
      >
        <div className="animate-pulse text-gray-400 dark:text-gray-600">
          Loading animation...
        </div>
      </div>
    )
  }
);

export default function ClientLottieAnimation() {
  const { theme } = useTheme();

  console.log('Current theme in animation:', theme); // Для отладки

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Player
        autoplay
        loop
        src="/animations/404 blue.json"
        style={{ 
          height: '500px', 
          width: '500px',
          maxWidth: '100%' 
        }}
      />
    </div>
  );
}