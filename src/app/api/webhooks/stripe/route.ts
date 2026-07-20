import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Stripe from 'stripe';
import { shouldGrantCredits } from '@/lib/paymentStatus';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;

    const { data: existing } = await supabaseAdmin
      .from('payments')
      .select('id, status, user_id, credits_purchased')
      .eq('provider_payment_id', checkoutSession.id)
      .single();

    if (existing && shouldGrantCredits(existing.status, 'succeeded')) {
      await supabaseAdmin
        .from('payments')
        .update({ status: 'succeeded', raw_payload: checkoutSession })
        .eq('id', existing.id);

      await supabaseAdmin.rpc('increment_credits', {
        p_user_id: existing.user_id,
        p_amount: existing.credits_purchased,
      });

      await supabaseAdmin.from('notifications').insert({
        user_id: existing.user_id,
        title: 'Payment successful',
        message: `Your purchase of ${existing.credits_purchased} takedown credit(s) was confirmed.`,
        type: 'success',
      });
    }
  }

  if (event.type === 'checkout.session.expired') {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    await supabaseAdmin
      .from('payments')
      .update({ status: 'failed', raw_payload: checkoutSession })
      .eq('provider_payment_id', checkoutSession.id);
  }

  return NextResponse.json({ received: true });
}