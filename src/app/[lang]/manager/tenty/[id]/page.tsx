import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

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
    .single();

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
        </div>
      </div>
    </div>
  );
}

function ModeButtons({ id, userId }: any) {
  async function updateStatus(status: string) {
    await fetch(`/api/manager/tenty/${id}/status`, {
      method: "POST",
      body: JSON.stringify({ status }),
    });
    location.reload();
  }

  async function sendComment() {
    const message = prompt("Enter message to user:");
    if (!message) return;

    await fetch(`/api/manager/tenty/${id}/comment`, {
      method: "POST",
      body: JSON.stringify({ message, user_id: userId }),
    });

    alert("Sent");
  }

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={() => updateStatus("in_progress")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Take in work
      </button>

      <button
        onClick={() => updateStatus("completed")}
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Completed
      </button>

      <button
        onClick={() => updateStatus("rejected")}
        className="px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Reject
      </button>

      <button
        onClick={sendComment}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg"
      >
        Request more info
      </button>
    </div>
  );
}
