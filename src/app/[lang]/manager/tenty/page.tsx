'use client';

import { useEffect, useState } from "react";

export default function ManagerTentyPage() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/manager/tenty")
      .then(res => res.json())
      .then(data => setRequests(data.requests || []));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tenty Requests</h1>

      <div className="grid gap-4">
        {requests.map(req => (
          <a
            key={req.id}
            href={`/manager/tenty/${req.id}`}
            className="p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{req.track_name}</h3>
                <p className="text-gray-500">{req.artist_nickname}</p>
              </div>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                {req.status}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
