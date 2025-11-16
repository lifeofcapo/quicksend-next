'use client';

import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import dynamic from 'next/dynamic';
import { ShieldAlert, Music, Ban, FileWarning } from 'lucide-react';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((m) => m.Player),
  { ssr: false }
);

export default function DspTakedownSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const features = [
    {
      icon: ShieldAlert,
      title: t('dsp.protection'),
      desc: t('dsp.protectionDesc'),
    },
    {
      icon: Music,
      title: t('dsp.originality'),
      desc: t('dsp.originalityDesc'),
    },
    {
      icon: Ban,
      title: t('dsp.removal'),
      desc: t('dsp.removalDesc'),
    },
    {
      icon: FileWarning,
      title: t('dsp.legal'),
      desc: t('dsp.legalDesc'),
    },
  ];

  return (
    <section
      id="dsptakedown"
      className="
        relative py-24 px-6 
        bg-gradient-to-br from-white to-gray-100 
        dark:from-gray-900 dark:to-black
        overflow-hidden
      "
    >

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* LEFT ANIMATION */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <Player
            autoplay
            loop
            src="/animations/Man-playing-guitar.json"
            style={{
              width: '1000px',
              height: '1000px',
              transform: 'translate(20px, 0px)'
            }}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 dark:text-white text-center lg:text-left">
            {t('dsp.title')}
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-2xl">
            {t('dsp.description')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="
                  p-5 rounded-xl 
                  bg-white/40 dark:bg-gray-800/40 
                  backdrop-blur-md border border-gray-200 dark:border-gray-700 
                  shadow-sm hover:shadow-lg 
                  transition
                "
              >
                <Icon className="mb-3 h-10 w-10 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{desc}</p>
              </div>
            ))}
          </div>

          <a
            href={`/${language}/profile`}
            className="
              inline-block px-8 py-4 
              bg-blue-600 hover:bg-blue-700 
              dark:bg-blue-700 dark:hover:bg-blue-600 
              text-white text-lg rounded-xl 
              shadow-lg transition
            "
          >
            {t('dsp.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
