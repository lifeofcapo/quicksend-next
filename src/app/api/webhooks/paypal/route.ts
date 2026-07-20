import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getPaypalAccessToken, PAYPAL_BASE_URL } from '@/lib/paypal';
import { shouldGrantCredits } from '@/lib/paymentStatus';

export async function POST(req: Request) {
  const rawBody = await req.text();
  const event = JSON.parse(rawBody);

  const accessToken = await getPaypalAccessToken();

  const verifyRes = await fetch(`${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      transmission_id: req.headers.get('paypal-transmission-id'),
      transmission_time: req.headers.get('paypal-transmission-time'),
      cert_url: req.headers.get('paypal-cert-url'),
      auth_algo: req.headers.get('paypal-auth-algo'),
      transmission_sig: req.headers.get('paypal-transmission-sig'),
      webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      webhook_event: event,
    }),
  });

  const verification = await verifyRes.json();

  if (verification.verification_status !== 'SUCCESS') {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    const orderId = event.resource?.supplementary_data?.related_ids?.order_id;
    if (orderId) {
      const { data: existing } = await supabaseAdmin
        .from('payments')
        .select('id, status, user_id, credits_purchased')
        .eq('provider_payment_id', orderId)
        .single();

      if (existing && shouldGrantCredits(existing.status, 'succeeded')) {
        await supabaseAdmin
          .from('payments')
          .update({ status: 'succeeded', raw_payload: event })
          .eq('id', existing.id);

        await supabaseAdmin.rpc('increment_credits', {
          p_user_id: existing.user_id,
          p_amount: existing.credits_purchased,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}