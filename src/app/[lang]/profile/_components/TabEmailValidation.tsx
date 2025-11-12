'use client';
import { useState } from 'react';

interface TabEmailValidationProps {
  email?: string;
}

export default function TabEmailValidation({ email }: TabEmailValidationProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [report, setReport] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setFile(e.target.files[0]);
  };

  const handleValidation = async () => {
    if (!file) return;
    setStatus('processing');

    try {
      const text = await file.text();

      const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      const uniqueEmails = Array.from(new Set(matches));

      const reportContent =
        uniqueEmails.length > 0
          ? `✅ Valid emails found (${uniqueEmails.length}):\n\n${uniqueEmails.join('\n')}`
          : '❌ No valid email addresses detected in the file.';

      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'email_validation_report.txt';
      a.click();
      URL.revokeObjectURL(url);

      setReport(reportContent);
      setStatus('done');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-xl font-semibold">Email Validation via File Upload</h3>
      <p className="text-gray-600 dark:text-gray-400">
        Upload a text or CSV file — we’ll extract and validate email addresses.
      </p>

      <input
        type="file"
        accept=".txt,.csv"
        onChange={handleFileUpload}
        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
      />

      <button
        onClick={handleValidation}
        disabled={!file || status === 'processing'}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {status === 'processing' ? 'Processing...' : 'Validate File'}
      </button>

      {status === 'done' && report && (
        <pre className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg whitespace-pre-wrap text-sm">
          {report}
        </pre>
      )}
      {status === 'error' && <p className="text-red-600">Error while processing file.</p>}
    </div>
  );
}
