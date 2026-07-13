// src/app/[lang]/_components/StatsSection.tsx
'use client';
import { useTranslation } from '@/hooks/useTranslation';
import { ShieldCheck, Music, Clock } from 'lucide-react';

const STATS = [
  { icon: ShieldCheck, valueKey: 'stats.takedownsValue', labelKey: 'stats.takedowns' },
  { icon: Music,       valueKey: 'stats.platformsValue', labelKey: 'stats.platforms' },
  { icon: Clock,       valueKey: 'stats.avgDaysValue',   labelKey: 'stats.avgDays' },
];

export function StatsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 px-4 bg-secondary/40 border-y border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {STATS.map(({ icon: Icon, valueKey, labelKey }, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl md:text-4xl font-bold text-foreground mb-1 tabular-nums">
                {t(valueKey)}
              </span>
              <p className="text-sm text-muted-foreground">
                {t(labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}