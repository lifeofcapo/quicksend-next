import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getPlan } from '@/lib/pricing';
import { getPaypalAccessToken, PAYPAL_BASE_URL } from '@/lib/paypal';

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

  const accessToken = await getPaypalAccessToken();

  const orderRes = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          custom_id: session.user.id,
          description: plan.label,
          amount: { currency_code: 'USD', value: plan.totalPrice.toFixed(2) },
        },
      ],
      application_context: {
        return_url: `${process.env.NEXTAUTH_URL}/api/payments/paypal/capture`,
        cancel_url: `${process.env.NEXTAUTH_URL}/profile?payment=cancelled`,
      },
    }),
  });

  const order = await orderRes.json();

  if (!orderRes.ok) {
    return NextResponse.json({ error: order }, { status: 500 });
  }

  await supabaseAdmin.from('payments').insert({
    user_id: session.user.id,
    provider: 'paypal',
    provider_payment_id: order.id,
    status: 'pending',
    amount: plan.totalPrice,
    currency: 'USD',
    credits_purchased: plan.credits,
    raw_payload: order,
  });

  const approveLink = order.links?.find((l: { rel: string }) => l.rel === 'approve')?.href;

  return NextResponse.json({ confirmationUrl: approveLink });
}