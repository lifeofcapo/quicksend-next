'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { FileText } from 'lucide-react';

interface Report {
  id: string;
  reporting_platform: string;
  content_type: string;
  status: string;
  evidence_url: string;
  created_at: string;
}

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export default function TabMyRequests() {
  const { t } = useTranslation();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tenty/my-reports')
      .then((res) => res.json())
      .then((data) => setReports(data.reports || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">{t('profile.loading')}</div>;
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
        <FileText className="w-8 h-8 text-gray-400" />
        <p className="text-gray-500 dark:text-gray-400">{t('profile.noRequestsYet')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((r) => (
        <div key={r.id} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg shadow">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0">
              <p className="font-medium truncate">{r.reporting_platform} · {r.content_type}</p>
              <a href={r.evidence_url} target="_blank" className="text-sm text-blue-500 hover:underline truncate block">
                {r.evidence_url}
              </a>
              <p className="text-xs text-gray-500 mt-1">{new Date(r.created_at).toLocaleString()}</p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full shrink-0 ${statusColor[r.status] ?? statusColor.pending}`}>
              {r.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}