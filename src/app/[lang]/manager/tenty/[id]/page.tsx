import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ManagerTentyRequest({ params }: any) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.user.email !== process.env.MANAGER_EMAIL)
    redirect("/");

  const { data: req, error } = await supabaseAdmin
    .from("tenty_requests")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !req) redirect("/profile");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Tenty Request #{req.id}
        </h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-5">
          <p><b>Track Link:</b> {req.track_link}</p>
          <p><b>Artist Nickname:</b> {req.artist_nickname}</p>
          <p><b>Track name:</b> {req.track_name}</p>
          <p><b>Rights holder:</b> {req.rights_holder}</p>
          <p><b>Name:</b> {req.full_name}</p>
          <p><b>Email:</b> {req.email}</p>
          <p><b>Address:</b> {req.address}</p>

          <div className="pt-5">
            <ModeButtons id={req.id} userId={req.user_id} />
          </div>
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
