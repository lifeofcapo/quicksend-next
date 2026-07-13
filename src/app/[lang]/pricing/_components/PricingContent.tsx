// src/app/[lang]/pricing/_components/PricingContent.tsx
'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import {
  ShieldCheck, Music, Image as ImageIcon, Video,
  Check, Zap, Gift, Star, Crown, ArrowRight,
} from 'lucide-react';

interface Bundle {
  id: string;
  qty: number;
  pricePerUnit: number;
  totalPrice: number;
  savings: number;
  savingsPct: number;
  icon: typeof ShieldCheck;
  popular?: boolean;
}

const BUNDLES: Bundle[] = [
  {
    id: 'single',
    qty: 1,
    pricePerUnit: 25,
    totalPrice: 25,
    savings: 0,
    savingsPct: 0,
    icon: Zap,
  },
  {
    id: 'pack5',
    qty: 5,
    pricePerUnit: 22,
    totalPrice: 110,
    savings: 15,
    savingsPct: 12,
    icon: Star,
    popular: true,
  },
  {
    id: 'pack10',
    qty: 10,
    pricePerUnit: 19,
    totalPrice: 190,
    savings: 60,
    savingsPct: 24,
    icon: Crown,
  },
];

const CONTENT_TYPES = [
  { icon: Music,      key: 'pricing.typeBeats' },
  { icon: ImageIcon,  key: 'pricing.typeCovers' },
  { icon: Video,      key: 'pricing.typeVideos' },
];

const FEATURES = [
  'pricing.feature1',
  'pricing.feature2',
  'pricing.feature3',
  'pricing.feature4',
  'pricing.feature5',
];

export default function PricingContent({ lang }: { lang: string }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selected, setSelected] = useState<string>('pack5');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="relative pt-28 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl dark:opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-linear-to-tr from-cyan-400/10 to-[#AEE5C2]/10 rounded-full blur-3xl dark:opacity-20" />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
            <Gift className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              {t('pricing.freeFirst')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] dark:from-blue-400 dark:via-cyan-300 dark:to-[#8ED8A8]">
              {t('pricing')}
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {t('pricing.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {CONTENT_TYPES.map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <Icon className="w-4 h-4 text-blue-500" />
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] p-px">
            <div className="rounded-2xl bg-white dark:bg-gray-900 px-6 py-5 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  {t('pricing.freeBannerTitle')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {t('pricing.freeBannerDesc')}
                </p>
              </div>
              <Link
                href={`/${language}/profile`}
                className="ml-auto shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 text-white font-semibold text-sm hover:opacity-90 transition"
              >
                {t('pricing.tryFree')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bundle selector */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 dark:text-white">
            {t('pricing.buyMoreSaveMore')}
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            {t('pricing.perTakedown', { price: '$25' })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {BUNDLES.map((bundle) => {
              const Icon = bundle.icon;
              const isSelected = selected === bundle.id;
              return (
                <button
                  key={bundle.id}
                  onClick={() => setSelected(bundle.id)}
                  className={`relative rounded-2xl p-6 text-left border-2 transition-all duration-300 hover:scale-[1.02] ${
                    isSelected
                      ? 'border-blue-500 dark:border-blue-400 shadow-xl shadow-blue-500/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  } bg-white dark:bg-gray-800`}
                >
                  {bundle.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold whitespace-nowrap">
                      {t('popular')}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? 'bg-linear-to-br from-blue-500 to-cyan-400'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {bundle.qty === 1
                          ? t('pricing.singleTakedown')
                          : t('pricing.bundleN', { n: bundle.qty })}
                      </p>
                      {bundle.savingsPct > 0 && (
                        <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                          -{bundle.savingsPct}% {t('pricing.discount')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-1">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${bundle.totalPrice}
                    </span>
                    {bundle.qty > 1 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        (${bundle.pricePerUnit} {t('pricing.each')})
                      </span>
                    )}
                  </div>

                  {bundle.savings > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {t('pricing.youSave', { amount: `$${bundle.savings}` })}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href={`/${language}/profile`}
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] group-hover:from-blue-600 group-hover:via-cyan-500 group-hover:to-[#8ED8A8] transition-all duration-500" />
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <ShieldCheck className="relative w-5 h-5 text-white" />
              <span className="relative text-white text-lg font-bold">
                {t('pricing.startCta')}
              </span>
              <ArrowRight className="relative w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* What's included */}
      <div className="px-4 pb-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto max-w-2xl pt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 dark:text-white">
            {t('pricing.whatsIncluded')}
          </h2>
          <div className="space-y-4">
            {FEATURES.map((key) => (
              <div key={key} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-gray-700 dark:text-gray-300">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}