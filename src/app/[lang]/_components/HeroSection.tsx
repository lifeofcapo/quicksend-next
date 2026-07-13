// src/app/[lang]/_components/HeroSection.tsx
'use client';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { ShieldCheck, Music, Image as ImageIcon, Video } from 'lucide-react';

const CONTENT_TYPES = [
  { icon: Music, labelKey: 'hero.typeBeats' },
  { icon: ImageIcon, labelKey: 'hero.typeCovers' },
  { icon: Video, labelKey: 'hero.typeVideos' },
];

export function HeroSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  return (
    <section
      id="hero-section"
      className="relative pt-24 pb-14 md:pt-32 md:pb-24 px-4 bg-white dark:bg-gray-900 transition-colors overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 md:w-96 md:h-96 bg-linear-to-br from-blue-500 via-cyan-400 to-[#AEE5C2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 md:w-96 md:h-96 bg-linear-to-tr from-cyan-400 via-blue-400 to-[#AEE5C2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 md:w-96 md:h-96 bg-linear-to-r from-blue-500 to-[#AEE5C2] rounded-full mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
          {/* Text block */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] dark:from-blue-400 dark:via-cyan-300 dark:to-[#8ED8A8]">
                QuickSend
              </span>
              <br />
              <span className="text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl">
                {t('hero.headline')}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t('description')}
            </p>

            {/* Content type pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              {CONTENT_TYPES.map(({ icon: Icon, labelKey }) => (
                <div
                  key={labelKey}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium"
                >
                  <Icon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  {t(labelKey)}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                href={`/${language}/profile`}
                className="group relative px-7 py-3.5 md:px-8 md:py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] transition-all duration-500" />
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center text-white text-base md:text-lg font-semibold gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  {t('hero.cta')}
                </span>
              </Link>

              <Link
                href={`/${language}/pricing`}
                className="px-7 py-3.5 md:px-8 md:py-4 rounded-xl border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold text-base md:text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                {t('learnMore')}
              </Link>
            </div>

            {/* Trust line */}
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              {t('hero.freeTrial')}
            </p>
          </div>

          {/* Visual block */}
          <div className="flex-1 flex justify-center items-center max-w-md w-full">
            <div className="relative w-full">
              {/* Glow */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 via-cyan-400/20 to-[#AEE5C2]/20 rounded-3xl blur-3xl" />

              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-2xl">
                {/* Status card simulation */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">DSP Takedown</p>
                    <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                      {t('hero.statusActive')}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { platform: 'Spotify', status: t('hero.statusRemoved'), color: 'text-green-500' },
                    { platform: 'Apple Music', status: t('hero.statusPending'), color: 'text-yellow-500' },
                    { platform: 'YouTube', status: t('hero.statusRemoved'), color: 'text-green-500' },
                    { platform: 'SoundCloud', status: t('hero.statusProcessing'), color: 'text-blue-500' },
                  ].map(({ platform, status, color }) => (
                    <div
                      key={platform}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{platform}</span>
                      <span className={`text-xs font-semibold ${color}`}>{status}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{t('hero.avgTime')}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">3–7 {t('hero.days')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}