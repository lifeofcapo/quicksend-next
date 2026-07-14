'use client';

interface ModeButtonsProps {
  id: string;
  userId: string;
}

export default function ModeButtons({ id, userId }: ModeButtonsProps) {
  async function updateStatus(status: string) {
    await fetch(`/api/manager/tenty/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    });
    location.reload();
  }

  async function sendComment() {
    const message = prompt('Enter message to user:');
    if (!message) return;

    await fetch(`/api/manager/tenty/${id}/comment`, {
      method: 'POST',
      body: JSON.stringify({ message, user_id: userId }),
    });

    alert('Sent');
  }

  return (
    <div className="flex gap-3 flex-wrap">
      <button onClick={() => updateStatus('in_progress')} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Take in work
      </button>
      <button onClick={() => updateStatus('completed')} className="px-4 py-2 bg-green-600 text-white rounded-lg">
        Completed
      </button>
      <button onClick={() => updateStatus('rejected')} className="px-4 py-2 bg-red-600 text-white rounded-lg">
        Reject
      </button>
      <button onClick={sendComment} className="px-4 py-2 bg-gray-700 text-white rounded-lg">
        Request more info
      </button>
    </div>
  );
}