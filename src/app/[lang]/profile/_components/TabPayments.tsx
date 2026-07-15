'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { PRICING_PLANS } from '@/lib/pricing';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Payment {
  id: string;
  provider: string;
  status: string;
  amount: number;
  currency: string;
  credits_purchased: number;
  created_at: string;
}

export default function TabPayments({ creditsRemaining }: { creditsRemaining: number }) {
  const { t } = useTranslation();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [buying, setBuying] = useState<string | null>(null);
  const [provider, setProvider] = useState<'yookassa' | 'stripe' | 'paypal'>('stripe');

  useEffect(() => {
    fetch('/api/payments')
      .then((res) => res.json())
      .then((data) => setPayments(data.payments || []));
  }, []);

    const handleBuy = async (planId: string) => {
    setBuying(planId);
    try {
        const res = await fetch(`/api/payments/${provider}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
        });
        const data = await res.json();
        if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
        } else {
        alert(t('profile.paymentError'));
        }
    } finally {
        setBuying(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500 mb-1">{t('profile.creditsRemaining')}</p>
        <p className="text-3xl font-bold">{creditsRemaining}</p>
      </div>

      <div className="flex gap-2 mb-4">
        {(['stripe', 'paypal', 'yookassa'] as const).map((p) => (
            <button
            key={p}
            onClick={() => setProvider(p)}
            className={`px-3 py-1.5 text-sm rounded-lg capitalize transition ${
                provider === p
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
            >
            {p}
            </button>
        ))}
        </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">{t('profile.buyCredits')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PRICING_PLANS.map((plan) => (
            <Card key={plan.id} className="p-4 flex flex-col justify-between">
              <div>
                <p className="font-semibold">{plan.label}</p>
                <p className="text-2xl font-bold mt-1">${plan.totalPrice}</p>
              </div>
              <Button className="mt-4 w-full" disabled={buying === plan.id} onClick={() => handleBuy(plan.id)}>
                {buying === plan.id ? t('profile.processing') : t('profile.buy')}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">{t('profile.paymentHistory')}</h3>
        <div className="space-y-3">
          {payments.length === 0 && <p className="text-gray-500">{t('profile.noPaymentsYet')}</p>}
          {payments.map((p) => (
            <div key={p.id} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-medium">{p.credits_purchased} takedown(s) — {p.provider}</p>
                <p className="text-xs text-gray-500">{new Date(p.created_at).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${p.amount}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'succeeded' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}