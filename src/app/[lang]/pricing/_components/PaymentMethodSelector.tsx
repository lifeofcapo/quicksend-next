// src/app/[lang]/pricing/_components/PaymentMethodSelector.tsx
'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PaymentMethodId = 'paypal' | 'yookassa' | 'stripe';

interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  hintRu: string;
  hintEn: string;
  logoSrc: string;
  mark: string;
  markBg: string;
  markColor: string;
}

const METHODS: PaymentMethod[] = [
  {
    id: 'paypal',
    label: 'PayPal',
    hintRu: 'Карта или баланс PayPal',
    hintEn: 'Card or PayPal balance',
    logoSrc: '/payment-logos/paypal.svg',
    mark: 'P',
    markBg: '#e9f2fb',
    markColor: '#0070ba',
  },
  {
    id: 'yookassa',
    label: 'ЮKassa',
    hintRu: 'СБП, карты РФ',
    hintEn: 'Russian cards, SBP',
    logoSrc: '/payment-logos/yookassa.svg',
    mark: 'Ю',
    markBg: '#f2eafe',
    markColor: '#8b3ffd',
  },
  {
    id: 'stripe',
    label: 'Stripe',
    hintRu: 'Международные карты',
    hintEn: 'International cards',
    logoSrc: '/payment-logos/stripe.svg',
    mark: 'S',
    markBg: '#ecebfe',
    markColor: '#635bff',
  },
];

interface PaymentMethodSelectorProps {
  value: PaymentMethodId;
  onChange: (id: PaymentMethodId) => void;
  lang?: 'ru' | 'en';
  className?: string;
}

function PaymentLogo({ method }: { method: PaymentMethod }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-9 h-9 rounded-md flex items-center justify-center text-sm font-bold shrink-0"
        style={{ backgroundColor: method.markBg, color: method.markColor }}
      >
        {method.mark}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={method.logoSrc}
      alt={method.label}
      onError={() => setFailed(true)}
      className="w-9 h-9 rounded-md object-contain bg-white p-1.5 border border-border shrink-0"
    />
  );
}

export function PaymentMethodSelector({ value, onChange, lang = 'en', className }: PaymentMethodSelectorProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-3 gap-3', className)}>
      {METHODS.map((method) => {
        const isSelected = value === method.id;
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            aria-pressed={isSelected}
            className={cn(
              'relative flex items-center gap-3 rounded-lg border bg-card p-3.5 text-left transition-colors',
              isSelected ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/40'
            )}
          >
            <PaymentLogo method={method} />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground">{method.label}</div>
              <div className="text-xs text-muted-foreground truncate">
                {lang === 'ru' ? method.hintRu : method.hintEn}
              </div>
            </div>
            {isSelected && (
              <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-primary-foreground" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}