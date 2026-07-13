// src/app/api/notifications/read-all/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabaseAdmin
      .from('notifications')
      .update({ read: true, updated_at: new Date().toISOString() })
      .eq('user_id', session.user.id)
      .eq('read', false);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'All notifications marked as read' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}