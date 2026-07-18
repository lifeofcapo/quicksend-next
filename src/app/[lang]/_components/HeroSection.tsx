// src/app/[lang]/_components/HeroSection.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { ShieldCheck, Music, Image as ImageIcon, Video, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CONTENT_TYPES = [
  { icon: Music, labelKey: 'hero.typeMusic' },
  { icon: ImageIcon, labelKey: 'hero.typeCovers' },
  { icon: Video, labelKey: 'hero.typeVideos' },
];

const NOTIFICATION_TEMPLATES = [
  { title: 'Spotify', iconSrc: 'https://cdn.simpleicons.org/spotify', message: 'The reported track has been removed from Spotify.' },
  { title: 'YouTube', iconSrc: 'https://cdn.simpleicons.org/youtube', message: 'Video taken down due to a copyright claim.' },
  { title: 'QuickSend', iconSrc: 'icons/quicksend.ico', message: 'Your takedown request was approved. 1 credit used.' }, 
  { title: 'Apple Music', iconSrc: 'https://cdn.simpleicons.org/applemusic', message: 'Content removed following your DMCA request.' },
  { title: 'SoundCloud', iconSrc: 'https://cdn.simpleicons.org/soundcloud', message: 'Track successfully taken down.' },
  { title: 'TikTok', iconSrc: 'https://cdn.simpleicons.org/tiktok', message: 'Video removed for copyright infringement.' },
  { title: 'Deezer', iconSrc: 'https://cdn.simpleicons.org/deezer', message: 'Track has been taken down from Deezer.' },
  { title: 'Tidal', iconSrc: 'https://cdn.simpleicons.org/tidal', message: 'Content removed following your request.' },
  { title: 'Amazon Music', iconSrc: 'icons/amazon.svg', message: 'Track removed from Amazon Music.' },
] as const;

interface FeedItem {
  id: number;
  template: (typeof NOTIFICATION_TEMPLATES)[number];
  entered: boolean;
  leaving: boolean;
}

const MAX_VISIBLE = 4;
const SLOT_HEIGHT = 78; // px между карточками — стек позиционируется через transform, не влияет на layout
const ADD_INTERVAL_MS = 2400;
const EXIT_DURATION_MS = 450;

export function HeroSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const [items, setItems] = useState<FeedItem[]>([]);
  const nextId = useRef(0);
  const templateIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const template = NOTIFICATION_TEMPLATES[templateIndex.current % NOTIFICATION_TEMPLATES.length];
      templateIndex.current += 1;
      const id = nextId.current++;

      setItems((prev) => {
        const next: FeedItem[] = [{ id, template, entered: false, leaving: false }, ...prev];

        if (next.length > MAX_VISIBLE) {
          const overflowing = next[next.length - 1];
          overflowing.leaving = true;
          setTimeout(() => {
            setItems((cur) => cur.filter((it) => it.id !== overflowing.id));
          }, EXIT_DURATION_MS);
        }

        return next;
      });

      requestAnimationFrame(() => {
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, entered: true } : it)));
      });
    }, ADD_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

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
            <Card className="w-full p-5 border-0 shadow-md bg-primary-lighter">
              <div className="flex items-center justify-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-primary-dark" />
                <p className="text-xs font-semibold text-primary-dark uppercase tracking-wide">
                  Live takedown activity
                </p>
              </div>

              <div
                className="relative overflow-hidden"
                style={{ height: MAX_VISIBLE * SLOT_HEIGHT }}
              >
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="absolute inset-x-0 top-0"
                    style={{
                      transform: `translateY(${!item.entered ? -SLOT_HEIGHT : index * SLOT_HEIGHT}px)`,
                      opacity: item.leaving || !item.entered ? 0 : 1,
                      transition: 'transform 500ms ease, opacity 400ms ease',
                    }}
                  >
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-card shadow-sm">
                      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 p-1.5 shadow-sm">
                        {item.template.iconSrc ? (
                          <img src={item.template.iconSrc} alt={item.template.title} className="w-full h-full object-contain" />
                        ) : (
                          <Sparkles className="w-full h-full text-primary" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">{item.template.title}</p>
                        <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                          {item.template.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}