import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request, { params }: any) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.user.email !== process.env.MANAGER_EMAIL) {
    return NextResponse.json({ error: "Not manager" }, { status: 403 });
  }

  const { message, user_id } = await req.json();

  // 1. сохраняем как внутреннее сообщение
  await supabaseAdmin.from("tenty_request_messages").insert({
    request_id: params.id,
    author_id: session.user.id,
    message
  });

  // 2. уведомляем пользователя
  await supabaseAdmin.from("notifications").insert({
    user_id,
    title: "Tenty Request Update",
    message
  });

  return NextResponse.json({ ok: true });
}
