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
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{
        zIndex: 0,     
        overflow: 'hidden',
        transform: 'translate(350px, 100px)'
      }}
    >
      <Player
        autoplay
        loop
        src="/animations/Paperplane.json"
        style={{
          width: '1200px',  
          height: '1200px',
        }}
      />
    </div>
  );
}
