import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import ModeButtons from "./_components/ModeButtons";

interface TentyReport {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  company_name: string | null;
  email: string;
  phone: string | null;
  reporting_platform: string;
  content_type: string;
  reporting_reason: string;
  evidence_url: string;
  ownership_type: string;
  ownership_explanation: string;
}

interface ManagerTentyRequestProps {
  params: Promise<{ id: string }>;
}

export default async function ManagerTentyRequest({ params }: ManagerTentyRequestProps) {
  const session = await auth();

  if (!session?.user?.email || session.user.email !== process.env.MANAGER_EMAIL) {
    notFound();
  }

  const { id } = await params;

  const { data: req, error } = await supabaseAdmin
    .from("tenty_reports")
    .select("*")
    .eq("id", id)
    .single<TentyReport>();

  if (error || !req) redirect("/profile");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tenty Report #{req.id}</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-5">
          <p><b>Name:</b> {req.first_name} {req.last_name}</p>
          <p><b>Company:</b> {req.company_name ?? '—'}</p>
          <p><b>Email:</b> {req.email}</p>
          <p><b>Phone:</b> {req.phone ?? '—'}</p>
          <p><b>Platform:</b> {req.reporting_platform}</p>
          <p><b>Content type:</b> {req.content_type}</p>
          <p><b>Reason:</b> {req.reporting_reason}</p>
          <p><b>Evidence:</b> <a href={req.evidence_url} target="_blank" className="text-blue-500 underline">{req.evidence_url}</a></p>
          <p><b>Ownership:</b> {req.ownership_type} — {req.ownership_explanation}</p>
          <ModeButtons id={req.id} userId={req.user_id} />
        </div>
      </div>
    </div>
  );
}