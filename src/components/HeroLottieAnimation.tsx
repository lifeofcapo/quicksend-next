'use client';

import dynamic from 'next/dynamic';
import { useTheme } from '@/contexts/theme-context';

const Player = dynamic(
  () =>
    import('@lottiefiles/react-lottie-player').then(
      (mod) => mod.Player
    ),
  { ssr: false }
);

export default function HeroLottieAnimation() {
  const { theme } = useTheme();

  return (
    <div 
      className="
        pointer-events-none 
        absolute inset-0 
        flex items-center justify-center
        hidden md:flex  {/* Скрыто на мобильных */}
      "
      style={{
        zIndex: 0,     
        overflow: 'hidden',
        transform: 'translate(400px, 100px) scale(1.2)'
      }}
    >
      <Player
        autoplay
        loop
        src="/animations/Paperplane.json"
        style={{
          width: '1200px',  
          height: '1200px',
          opacity: 0.8
        }}
      />
    </div>
  );
}