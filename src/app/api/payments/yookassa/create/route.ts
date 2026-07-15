import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getPlan } from '@/lib/pricing';
import { randomUUID } from 'crypto';

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID!;
const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY!;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { planId } = await req.json();
  const plan = getPlan(planId);
  if (!plan) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  const ykRes = await fetch('https://api.yookassa.ru/v3/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotence-Key': randomUUID(),
      Authorization: 'Basic ' + Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_SECRET_KEY}`).toString('base64'),
    },
    body: JSON.stringify({
      amount: { value: plan.totalPrice.toFixed(2), currency: 'USD' }, // поменяйте на RUB, если валюта не разрешена
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.NEXTAUTH_URL}/profile?payment=pending`,
      },
      capture: true,
      description: `${plan.label} — QuickSend Tenty`,
      metadata: { user_id: session.user.id, plan_id: plan.id },
    }),
  });

  const payment = await ykRes.json();

  if (!ykRes.ok) {
    return NextResponse.json({ error: payment }, { status: 500 });
  }

  await supabaseAdmin.from('payments').insert({
    user_id: session.user.id,
    provider: 'yookassa',
    provider_payment_id: payment.id,
    status: 'pending',
    amount: plan.totalPrice,
    currency: 'USD',
    credits_purchased: plan.credits,
    raw_payload: payment,
  });

  return NextResponse.json({ confirmationUrl: payment.confirmation.confirmation_url });
}