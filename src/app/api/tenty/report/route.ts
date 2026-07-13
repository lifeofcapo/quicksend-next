// src/app/api/tenty/report/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const ALLOWED_CONTENT_TYPES = ['beat', 'cover', 'video', 'other'];
const ALLOWED_PLATFORMS = ['spotify', 'apple_music', 'youtube', 'soundcloud', 'tidal', 'deezer', 'amazon_music', 'other'];

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (!body.evidenceUrl || !/^https?:\/\//.test(body.evidenceUrl)) {
      return NextResponse.json({ error: 'Invalid evidence URL' }, { status: 400 });
    }
    if (!ALLOWED_CONTENT_TYPES.includes(body.contentType)) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }
    if (!ALLOWED_PLATFORMS.includes(body.reportingPlatform)) {
      return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('tenty_reports')
      .insert([
        {
          user_id: session.user.id,
          first_name: body.firstName,
          last_name: body.lastName,
          company_name: body.companyName ?? null,
          email: body.email,
          phone: body.phoneNumber ?? null,
          mailing_address: body.mailingAddress ?? null,
          reporting_platform: body.reportingPlatform,
          report_type: body.reportType,
          // beat | cover | video | other
          content_type: body.contentType,
          reporting_reason: body.reportingReason,
          evidence_url: body.evidenceUrl,
          // Optional second evidence URL for additional proof
          evidence_url_2: body.evidenceUrl2 ?? null,
          ownership_type: body.ownershipType,
          ownership_explanation: body.ownershipExplanation,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Takedown report submitted successfully',
      reportId: data.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error submitting takedown report:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}