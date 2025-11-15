import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // --- 1. получаем менеджера по email ---
    const managerEmail = process.env.MANAGER_EMAIL!;
    const { data: manager, error: mError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", managerEmail)
      .maybeSingle();

    if (mError) throw mError;
    if (!manager) return NextResponse.json(
      { error: "Manager account not found" },
      { status: 500 }
    );

    // --- 2. создаём заявку ---
    const { error: insertError } = await supabaseAdmin
      .from("tenty_requests")
      .insert({
        user_id: session.user.id,
        manager_id: manager.id,
        track_link: data.trackLink,
        artist_nickname: data.artistNickname,
        track_name: data.trackName,
        rights_holder: data.rightsHolder,
        full_name: data.fullName,
        email: data.email,
        address: data.address,
        status: "pending"
      });

    if (insertError) throw insertError;

    // --- 3. создаём уведомление менеджеру ---
    await supabaseAdmin.from("notifications").insert({
      user_id: manager.id,
      title: "🆕 New Tenty Request",
      message: `You received a new takedown request from ${session.user.email}`
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Tenty Request Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
