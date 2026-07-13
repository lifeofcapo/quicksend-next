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
    <section
      className="relative py-12 md:py-16 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(to top, #f8fafc, #bfdbfe)' }}
    >
      <div className="dark:hidden absolute inset-0 bg-linear-to-t from-blue-50 to-blue-200 opacity-80" />
      <div className="hidden dark:block absolute inset-0 bg-linear-to-t from-gray-900 to-gray-800" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {STATS.map(({ icon: Icon, valueKey, labelKey }, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-4">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1">
                {t(valueKey)}
              </span>
              <p className="text-base text-gray-600 dark:text-gray-300">
                {t(labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}