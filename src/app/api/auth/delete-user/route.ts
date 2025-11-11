import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const { error } = await supabaseAdmin.from('users').delete().eq('email', email);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('User delete error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
