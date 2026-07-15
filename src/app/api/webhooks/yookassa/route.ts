import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID!;
const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY!;

export async function POST(req: Request) {
  const body = await req.json();
  const paymentId = body?.object?.id;

  if (!paymentId) {
    return NextResponse.json({ error: 'No payment id' }, { status: 400 });
  }

  const verifyRes = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_SECRET_KEY}`).toString('base64'),
    },
  });

  if (!verifyRes.ok) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }

  const payment = await verifyRes.json();

  if (payment.status === 'succeeded') {
    const { data: existing } = await supabaseAdmin
      .from('payments')
      .select('id, status, user_id, credits_purchased')
      .eq('provider_payment_id', paymentId)
      .single();

    if (existing && existing.status !== 'succeeded') {
      await supabaseAdmin
        .from('payments')
        .update({ status: 'succeeded', raw_payload: payment })
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
  } else if (['canceled'].includes(payment.status)) {
    await supabaseAdmin
      .from('payments')
      .update({ status: 'failed', raw_payload: payment })
      .eq('provider_payment_id', paymentId);
  }

  return NextResponse.json({ ok: true });
}