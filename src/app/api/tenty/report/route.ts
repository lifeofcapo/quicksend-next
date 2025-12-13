// app/api/tenty/report/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    
    if (!body.evidenceUrl || !/^https?:\/\//.test(body.evidenceUrl)) {
      return NextResponse.json({ error: "Invalid evidence URL" }, { status: 400 });
    }
    
    const { data, error } = await supabaseAdmin
      .from("tenty_reports")
      .insert([
        {
          user_id: session.user.id,
          first_name: body.firstName,
          last_name: body.lastName,
          company_name: body.companyName,
          email: body.email,
          phone: body.phoneNumber,
          mailing_address: body.mailingAddress,
          reporting_platform: body.reportingPlatform,
          report_type: body.reportType,
          content_type: body.contentType,
          reporting_reason: body.reportingReason,
          evidence_url: body.evidenceUrl,
          ownership_type: body.ownershipType,
          ownership_explanation: body.ownershipExplanation,
          status: "pending",
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Здесь можно добавить отправку email уведомления
    // await sendReportNotificationEmail(body.email, data.id);

    return NextResponse.json({ 
      success: true, 
      message: "Report submitted successfully",
      reportId: data.id 
    });
  } catch (err: any) {
    console.error("Error submitting report:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}