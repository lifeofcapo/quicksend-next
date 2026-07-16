'use client';

import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import dynamic from 'next/dynamic';
import { ShieldAlert, Music, Ban, FileWarning, ArrowRight, Shield, Music2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((m) => m.Player),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] lg:h-[600px] flex items-center justify-center">
        <Music2 className="w-16 h-16 md:w-24 md:h-24 text-muted-foreground/40" />
      </div>
    ),
  }
);

export default function DspTakedownSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setShowAnimation(!mobile);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: ShieldAlert,  title: t('dsp.protection'),  desc: t('dsp.protectionDesc') },
    { icon: Music,        title: t('dsp.originality'), desc: t('dsp.originalityDesc') },
    { icon: Ban,          title: t('dsp.removal'),     desc: t('dsp.removalDesc') },
    { icon: FileWarning,  title: t('dsp.legal'),       desc: t('dsp.legalDesc') },
  ];

  return (
    <section id="dsptakedown" className="py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

        <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
          {showAnimation ? (
            <Player
              autoplay
              loop
              src="/animations/Man-playing-guitar.json"
              style={{ width: '100%', height: 'auto', maxWidth: '600px', maxHeight: '600px' }}
            />
          ) : (
            <Card className="w-48 h-48 mx-auto flex items-center justify-center">
              <Music className="w-14 h-14 text-primary" />
            </Card>
          )}
        </div>

        <div className="flex-1 order-1 lg:order-2 w-full">
          <div className="text-center lg:text-left mb-6 md:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground">
              {t('dsp.title')}
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto lg:mx-0" />
          </div>

          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 leading-relaxed max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            {t('dsp.description')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 md:mb-12">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <Card key={i} className="p-4 md:p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-1.5 text-foreground">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </Card>
            ))}
          </div>

          <Button size="lg" asChild className="w-full sm:w-auto btn-shimmer">
            <a href={`/${language}/profile`} className="gap-2">
              <Shield className="w-5 h-5" />
              {t('hero.cta')}
            </a>
          </Button>

          <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t('dsp.guarantee')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}