'use client';
import { useState } from 'react';

export default function TabEmailValidation({ email }: { email: string }) {
  const [status, setStatus] = useState<string | null>(null);

  const handleValidate = async () => {
    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validate-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.valid ? 'valid' : 'invalid');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-4">
      <p>Your email: <span className="font-semibold">{email}</span></p>
      <button
        onClick={handleValidate}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Validate Email
      </button>
      {status && (
        <p className={`mt-2 text-sm ${
          status === 'valid' ? 'text-green-600' :
          status === 'invalid' ? 'text-red-600' :
          'text-gray-500'
        }`}>
          {status === 'loading' && 'Checking...'}
          {status === 'valid' && 'Email is valid!'}
          {status === 'invalid' && 'Email failed validation.'}
          {status === 'error' && 'Server error.'}
        </p>
      )}
    </div>
  );
}
