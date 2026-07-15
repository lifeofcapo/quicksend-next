import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getPaypalAccessToken, PAYPAL_BASE_URL } from '@/lib/paypal';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('token'); // PayPal returns orders id to query "token"

  if (!orderId) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/profile?payment=error`);
  }

  const accessToken = await getPaypalAccessToken();

  const captureRes = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const capture = await captureRes.json();

  if (captureRes.ok && capture.status === 'COMPLETED') {
    const { data: existing } = await supabaseAdmin
      .from('payments')
      .select('id, status, user_id, credits_purchased')
      .eq('provider_payment_id', orderId)
      .single();

    if (existing && existing.status !== 'succeeded') {
      await supabaseAdmin
        .from('payments')
        .update({ status: 'succeeded', raw_payload: capture })
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

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/profile?payment=success`);
  }

  await supabaseAdmin
    .from('payments')
    .update({ status: 'failed', raw_payload: capture })
    .eq('provider_payment_id', orderId);

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/profile?payment=error`);
}