'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PRICING_PLANS } from '@/lib/pricing';

export function PricingSection() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 py-20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-lighter opacity-40 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-lighter px-3 py-1 text-xs font-semibold text-primary-dark uppercase tracking-wide mb-4">
            <Zap className="w-3.5 h-3.5" />
            {t('pricing.homeEyebrow')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t('pricing.homeTitle')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('pricing.homeSubtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 items-end">
          {PRICING_PLANS.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={cn(
                  'transition-all duration-700 opacity-0',
                  isVisible && 'opacity-100 animate-fade-in-up'
                )}
                style={{ animationDelay: isVisible ? `${i * 150}ms` : undefined }}
              >
                <Card
                  className={cn(
                    'relative p-6 text-center transition-all duration-300 hover:shadow-xl',
                    plan.popular && 'border-primary ring-1 ring-primary sm:scale-105 shadow-lg'
                  )}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground shadow-sm">
                      {t('popular')}
                    </span>
                  )}

                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  <p className="font-semibold text-foreground mb-1">
                    {plan.qty === 1 ? t('pricing.singleTakedown') : t('pricing.bundleN', { n: plan.qty })}
                  </p>

                  <div className="flex items-baseline justify-center gap-1.5 mb-1">
                    <span className="text-3xl font-bold text-foreground tabular-nums">${plan.totalPrice}</span>
                    {plan.savingsPct > 0 && (
                      <span className="text-[11px] font-semibold text-accent-dark bg-accent-light rounded-full px-1.5 py-0.5 tabular-nums">
                        -{plan.savingsPct}%
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mb-5">
                    {plan.qty > 1 ? `$${plan.pricePerUnit} ${t('pricing.each')}` : t('pricing.oneTimePayment')}
                  </p>

                  <Button asChild variant={plan.popular ? 'default' : 'outline'} className="w-full gap-1.5 btn-shimmer">
                    <Link href={`/${language}/pricing`}>
                      {t('pricing.startCta')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>

        <div
          className={cn(
            'flex items-center justify-center gap-2 mt-10 text-sm text-muted-foreground opacity-0 transition-all duration-700',
            isVisible && 'opacity-100 animate-fade-in-up'
          )}
          style={{ animationDelay: isVisible ? '450ms' : undefined }}
        >
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>{t('pricing.noSubscriptionNote')}</span>
        </div>
      </div>
    </section>
  );
}