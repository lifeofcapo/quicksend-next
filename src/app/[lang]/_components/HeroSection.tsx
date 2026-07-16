// src/app/[lang]/_components/HeroSection.tsx
'use client';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { ShieldCheck, Music, Image as ImageIcon, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const CONTENT_TYPES = [
  { icon: Music, labelKey: 'hero.typeBeats' },
  { icon: ImageIcon, labelKey: 'hero.typeCovers' },
  { icon: Video, labelKey: 'hero.typeVideos' },
];

const STATUS_ROWS = [
  { platform: 'Spotify',      statusKey: 'hero.statusRemoved',    dot: 'bg-emerald-500' },
  { platform: 'Apple Music',  statusKey: 'hero.statusPending',    dot: 'bg-amber-500' },
  { platform: 'YouTube',      statusKey: 'hero.statusRemoved',    dot: 'bg-emerald-500' },
  { platform: 'SoundCloud',   statusKey: 'hero.statusProcessing', dot: 'bg-sky-500' },
];

export function HeroSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  return (
    <section
      id="hero-section"
      className="relative pt-24 pb-14 md:pt-32 md:pb-24 px-4 bg-background overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight text-foreground">
              <span className="text-primary">QuickSend</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                {t('hero.headline')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('description')}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {CONTENT_TYPES.map(({ icon: Icon, labelKey }) => (
                <Badge key={labelKey} variant="secondary" className="gap-1.5 py-1.5 px-3 font-normal">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {t(labelKey)}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <Button size="lg" asChild className='btn-shimmer'>
                <Link href={`/${language}/profile`} className="gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  {t('hero.cta')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/${language}/pricing`}>{t('learnMore')}</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              {t('hero.freeTrial')}
            </p>
          </div>

          <div className="flex-1 flex justify-center items-center max-w-md w-full">
            <Card className="w-full p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">DSP Takedown</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    {t('hero.statusActive')}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                {STATUS_ROWS.map(({ platform, statusKey, dot }) => (
                  <div
                    key={platform}
                    className="flex items-center justify-between py-2.5 px-1 border-b border-border last:border-b-0"
                  >
                    <span className="text-sm text-foreground">{platform}</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                      {t(statusKey)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t('hero.avgTime')}</span>
                <span className="font-semibold text-primary">3–7 {t('hero.days')}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}