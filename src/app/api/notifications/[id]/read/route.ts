// app/api/notifications/[id]/read/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params is a Promise!
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const { data: notification, error: fetchError } = await supabaseAdmin
      .from("notifications")
      .select("*")
      .eq("id", id)
      .eq("user_id", session.user.id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    const { error: updateError } = await supabaseAdmin
      .from("notifications")
      .update({ read: true, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error marking notification as read:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}