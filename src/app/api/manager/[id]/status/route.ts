import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request, { params }: any) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.user.email !== process.env.MANAGER_EMAIL) {
    return NextResponse.json({ error: "Not manager" }, { status: 403 });
  }

  const { status } = await req.json();

  const { error } = await supabaseAdmin
    .from("tenty_requests")
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq("id", params.id);

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ ok: true });
}
