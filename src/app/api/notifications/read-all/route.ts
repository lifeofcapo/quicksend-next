import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { error: updateError } = await supabaseAdmin
      .from("notifications")
      .update({ read: true, updated_at: new Date().toISOString() })
      .eq("user_id", session.user.id)
      .eq("read", false);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, message: "All notifications marked as read" });
  } catch (err: any) {
    console.error("Error marking all notifications as read:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}