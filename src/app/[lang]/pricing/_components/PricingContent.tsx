// src/app/[lang]/pricing/_components/PricingContent.tsx
'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import {
  ShieldCheck, Music, Image as ImageIcon, Video,
  Check, Zap, Gift, Star, Crown, ArrowRight,
  Upload, UserCheck, CheckCircle2, Lock, Globe, Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PaymentMethodSelector, type PaymentMethodId } from './PaymentMethodSelector';
import { PricingPlan, PRICING_PLANS } from '@/lib/pricing';

const CONTENT_TYPES = [
  { icon: Music,     key: 'pricing.typeBeats' },
  { icon: ImageIcon, key: 'pricing.typeCovers' },
  { icon: Video,     key: 'pricing.typeVideos' },
];

const FEATURES = [
  'pricing.feature1',
  'pricing.feature2',
  'pricing.feature3',
  'pricing.feature4',
  'pricing.feature5',
];

const STEPS = [
  { icon: Upload,       titleKey: 'pricing.step1Title', descKey: 'pricing.step1Desc' },
  { icon: UserCheck,    titleKey: 'pricing.step2Title', descKey: 'pricing.step2Desc' },
  { icon: CheckCircle2, titleKey: 'pricing.step3Title', descKey: 'pricing.step3Desc' },
];

const STATS = [
  { icon: ShieldCheck, valueKey: 'stats.takedownsValue', labelKey: 'stats.takedowns' },
  { icon: Globe,       valueKey: 'stats.platformsValue', labelKey: 'stats.platforms' },
  { icon: Clock,       valueKey: 'stats.avgDaysValue',   labelKey: 'stats.avgDays' },
];

export default function PricingContent({ lang }: { lang: string }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedId, setSelectedId] =
  useState<PricingPlan['id']>('five');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('paypal');

  const selectedBundle = useMemo(
    () => PRICING_PLANS.find((b) => b.id === selectedId) ?? PRICING_PLANS[0],
    [selectedId]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-primary-lighter opacity-60 blur-3xl" />
        </div>

        <div className="pt-28 pb-14 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
              {t('pricingTitle')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t('pricing.subtitle')}
            </p>
            <div className="flex justify-center mt-6">
              <div className="inline-flex items-center rounded-full border border-border bg-card/60 backdrop-blur-sm px-1.5 py-1.5 shadow-sm">
                {CONTENT_TYPES.map(({ icon: Icon, key }, i) => (
                  <div key={key} className="flex items-center">
                    {i > 0 && <span className="w-px h-3.5 bg-border mx-1" aria-hidden />}
                    <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium text-foreground/80 whitespace-nowrap">
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                      {t(key)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 grid grid-cols-3 max-w-lg mx-auto divide-x divide-border border-y border-border py-5">
              {STATS.map(({ icon: Icon, valueKey, labelKey }) => (
                <div key={labelKey} className="px-3">
                  <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-foreground tabular-nums">
                    <Icon className="w-4 h-4 text-primary" />
                    {t(valueKey)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{t(labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-10">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl bg-primary-lighter px-6 py-5">
            <div className="w-11 h-11 rounded-lg bg-card flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <p className="font-semibold text-foreground">{t('pricing.freeBannerTitle')}</p>
              <p className="text-muted-foreground text-sm">{t('pricing.freeBannerDesc')}</p>
            </div>
            <Button asChild className="shrink-0 gap-2">
              <Link href={`/${language}/profile`}>
                {t('pricing.tryFree')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="px-4 pb-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {t('pricing.buyMoreSaveMore')}
            </h2>
            <p className="text-muted-foreground">
              {t('pricing.perTakedown', { price: '$25' })}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              {PRICING_PLANS.map((pricingPlan) => {
                const Icon = pricingPlan.icon;
                const isSelected = selectedId === pricingPlan.id;
                return (
                  <button
                    key={pricingPlan.id}
                    type="button"
                    onClick={() => setSelectedId(pricingPlan.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      'relative rounded-xl p-5 text-left border bg-card transition-all flex flex-col h-full sm:flex-1 min-w-0',
                      isSelected ? 'border-primary ring-1 ring-primary shadow-md' : 'border-border hover:border-primary/40'
                    )}
                  >
                    {pricingPlan.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                        {t('popular')}
                      </span>
                    )}

                    <div className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center mb-3',
                      isSelected ? 'bg-primary' : 'bg-secondary'
                    )}>
                      <Icon className={cn('w-4 h-4', isSelected ? 'text-primary-foreground' : 'text-muted-foreground')} />
                    </div>

                    <p className="font-semibold text-foreground text-sm mb-1.5">
                      {pricingPlan.qty === 1 ? t('pricing.singleTakedown') : t('pricing.bundleN', { n: pricingPlan.qty })}
                    </p>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {t(pricingPlan.descKey)}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold text-foreground tabular-nums">${pricingPlan.totalPrice}</span>
                        {pricingPlan.qty > 1 && (
                          <span className="text-xs text-muted-foreground tabular-nums">
                            (${pricingPlan.pricePerUnit} {t('pricing.each')})
                          </span>
                        )}
                        {pricingPlan.savingsPct > 0 && (
                          <span className="ml-auto text-[11px] font-semibold text-accent-dark bg-accent-light rounded-full px-1.5 py-0.5 tabular-nums shrink-0">
                            -{pricingPlan.savingsPct}%
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium tabular-nums h-4">
                        {pricingPlan.savings > 0 && t('pricing.youSave', { amount: `$${pricingPlan.savings}` })}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3" aria-hidden>
                        {Array.from({ length: pricingPlan.qty }).map((_, i) => (
                          <span
                            key={i}
                            className={cn('w-1.5 h-1.5 rounded-full', isSelected ? 'bg-primary' : 'bg-border')}
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <Card className="p-5 flex flex-col h-full w-full lg:w-[360px] lg:shrink-0 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                {t('pricing.orderSummary')}
              </p>

              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {selectedBundle.qty === 1 ? t('pricing.singleTakedown') : t('pricing.bundleN', { n: selectedBundle.qty })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedBundle.qty} {t('pricing.credits')}
                  </p>
                </div>
                <span className="text-xl font-bold text-foreground tabular-nums">${selectedBundle.totalPrice}</span>
              </div>

              <p className="text-xs text-muted-foreground mb-4">{t('pricing.creditsNote')}</p>

              <p className="text-xs font-medium text-foreground mb-2">
                {language === 'ru' ? 'Способ оплаты' : 'Payment method'}
              </p>
              <PaymentMethodSelector
                value={paymentMethod}
                onChange={setPaymentMethod}
                lang={language === 'ru' ? 'ru' : 'en'}
                className="!grid-cols-1 gap-2 mb-5"
              />

              <div className="mt-auto">
                <Button size="lg" asChild className="w-full gap-2">
                  <Link href={`/${language}/profile`}>
                    <Lock className="w-4 h-4" />
                    {t('pricing.payNow')} · ${selectedBundle.totalPrice}
                  </Link>
                </Button>

                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  {t('pricing.securePayment')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="px-4 pb-20 bg-secondary/40">
        <div className="container mx-auto max-w-4xl pt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
            {t('pricing.howItWorksTitle')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map(({ icon: Icon, titleKey, descKey }, i) => (
              <div key={titleKey} className="text-center sm:text-left">
                <div className="flex items-center gap-3 mb-3 justify-center sm:justify-start">
                  <span className="text-xs font-bold text-primary tabular-nums">0{i + 1}</span>
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <p className="font-semibold text-foreground mb-1">{t(titleKey)}</p>
                <p className="text-sm text-muted-foreground">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 py-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            {t('pricing.whatsIncluded')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {FEATURES.map((key) => (
              <div key={key} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
                <p className="text-foreground text-sm">{t(key)}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="gap-2">
              <Link href={`/${language}/profile`}>
                <ShieldCheck className="w-5 h-5" />
                {t('pricing.startCta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}