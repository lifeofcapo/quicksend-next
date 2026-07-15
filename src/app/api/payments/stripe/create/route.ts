import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getPlan } from '@/lib/pricing';
import { stripe } from '@/lib/stripe';

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

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: plan.label },
          unit_amount: Math.round(plan.totalPrice * 100),
        },
        quantity: 1,
      },
    ],
    metadata: { user_id: session.user.id, plan_id: plan.id },
    success_url: `${process.env.NEXTAUTH_URL}/profile?payment=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/profile?payment=cancelled`,
  });

  await supabaseAdmin.from('payments').insert({
    user_id: session.user.id,
    provider: 'stripe',
    provider_payment_id: checkoutSession.id,
    status: 'pending',
    amount: plan.totalPrice,
    currency: 'USD',
    credits_purchased: plan.credits,
    raw_payload: checkoutSession,
  });

  return NextResponse.json({ confirmationUrl: checkoutSession.url });
}