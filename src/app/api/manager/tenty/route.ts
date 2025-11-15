import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // проверяем что это менеджер
  if (session.user.email !== process.env.MANAGER_EMAIL) {
    return NextResponse.json({ error: "Not manager" }, { status: 403 });
  }

  const { data, error } = await supabaseAdmin
    .from("tenty_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ requests: data });
}
