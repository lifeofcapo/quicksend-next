'use client';

import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import dynamic from 'next/dynamic';
import { ShieldAlert, Music, Ban, FileWarning, ArrowRight, Shield, Music2, XCircle, FileCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((m) => m.Player),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] lg:h-[600px] flex items-center justify-center">
        <div className="relative">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-linear-to-br from-blue-100/20 to-cyan-100/20 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-full blur-2xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Music2 className="w-16 h-16 md:w-24 md:h-24 text-blue-400/50 dark:text-blue-500/30 animate-pulse" />
          </div>
        </div>
      </div>
    ),
  }
);

export default function DspTakedownSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      setShowAnimation(!mobile);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: ShieldAlert,
      title: t('dsp.protection'),
      desc: t('dsp.protectionDesc'),
      gradient: 'from-blue-500 to-cyan-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Music,
      title: t('dsp.originality'),
      desc: t('dsp.originalityDesc'),
      gradient: 'from-cyan-400 to-[#AEE5C2]',
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    },
    {
      icon: Ban,
      title: t('dsp.removal'),
      desc: t('dsp.removalDesc'),
      gradient: 'from-[#AEE5C2] to-[#FFD1A6]',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: FileWarning,
      title: t('dsp.legal'),
      desc: t('dsp.legalDesc'),
      gradient: 'from-[#FFD1A6] to-blue-400',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  return (
    <section
      id="dsptakedown"
      className="relative py-12 md:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-blue-500/5 via-cyan-400/5 to-[#AEE5C2]/5 rounded-full mix-blend-multiply filter blur-3xl dark:opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-linear-to-tr from-cyan-400/5 via-blue-400/5 to-[#FFD1A6]/5 rounded-full mix-blend-multiply filter blur-3xl dark:opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

        <div className="relative w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
          {showAnimation ? (
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-cyan-400/10 to-[#AEE5C2]/10 rounded-full blur-3xl"></div>
              <Player
                autoplay
                loop
                src="/animations/Man-playing-guitar.json"
                style={{ width: '100%', height: 'auto', maxWidth: '600px', maxHeight: '600px' }}
              />
            </div>
          ) : (
            <div className="w-full max-w-xs mx-auto py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 via-cyan-400/20 to-[#AEE5C2]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative w-48 h-48 mx-auto rounded-3xl bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl flex items-center justify-center">
                  <div className="absolute inset-4 rounded-2xl bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"></div>
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <Music className="w-14 h-14 text-blue-400 dark:text-blue-300 animate-float" />
                    <div className="flex gap-3">
                      <Shield className="w-8 h-8 text-cyan-400 dark:text-cyan-300 animate-pulse delay-75" />
                      <FileCheck className="w-8 h-8 text-[#AEE5C2] dark:text-[#8ED8A8] animate-pulse delay-150" />
                      <XCircle className="w-8 h-8 text-[#FFD1A6] dark:text-[#FFB87A] animate-pulse delay-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 z-10 order-1 lg:order-2 w-full">
          <div className="text-center lg:text-left mb-6 md:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] dark:from-blue-400 dark:via-cyan-300 dark:to-[#8ED8A8]">
                {t('dsp.title')}
              </span>
            </h2>
            <div className="w-20 md:w-24 h-1.5 bg-linear-to-r from-blue-500 to-cyan-400 rounded-full mx-auto lg:mx-0"></div>
          </div>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 md:mb-10 leading-relaxed max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            {t('dsp.description')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            {features.map(({ icon: Icon, title, desc, gradient, iconBg }, i) => (
              <div
                key={i}
                className="group relative p-4 md:p-6 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute inset-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl"></div>

                <div className="relative">
                  <div className="inline-flex items-center justify-center mb-3 md:mb-4">
                    <div className={`${iconBg} w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                  </div>
                  <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 dark:text-white text-gray-800">
                    {title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA кнопка */}
          <a
            href={`/${language}/profile`}
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3.5 md:py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] group-hover:from-blue-600 group-hover:via-cyan-500 group-hover:to-[#8ED8A8] transition-all duration-500"></div>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center gap-2 md:gap-3">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <span className="text-white text-base md:text-lg font-bold tracking-wide">
                {t('dsp.cta')}
              </span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
          </a>

          <div className="mt-4 flex items-center justify-start gap-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span>{t('dsp.guarantee')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}