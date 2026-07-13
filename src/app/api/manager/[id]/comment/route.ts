// src/app/api/manager/[id]/comment/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.email || session.user.email !== process.env.MANAGER_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const { message, user_id } = await req.json();

  await supabaseAdmin.from('tenty_request_messages').insert({
    request_id: id,
    author_id: session.user.id,
    message,
  });

  await supabaseAdmin.from('notifications').insert({
    user_id,
    title: 'Takedown Request Update',
    message,
  });

  return NextResponse.json({ ok: true });
}