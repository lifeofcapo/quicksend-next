'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Twitter, Instagram } from 'lucide-react';

interface TabTentyProps {
  userData?: any;
}

export default function TabTenty({ userData }: TabTentyProps) {
  const [form, setForm] = useState({
    trackLink: '',
    artistNickname: '',
    trackName: '',
    rightsHolder: '',
    fullName: '',
    email: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | 'success' | 'error'>(null);

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    if (!validateURL(form.trackLink)) {
      setResult('error');
      return;
    }
    if (!validateEmail(form.email)) {
      setResult('error');
      return;
    }

    const allFilled = Object.values(form).every((v) => v.trim() !== '');
    if (!allFilled) {
      setResult('error');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/tenty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setResult('success');
      setForm({
        trackLink: '',
        artistNickname: '',
        trackName: '',
        rightsHolder: '',
        fullName: '',
        email: '',
        address: '',
      });
    } else {
      setResult('error');
    }
  };

  return (
    <div className="p-6 space-y-10">

      {/* ---------- SECTION 1 — INTRO ---------- */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Track Blocking / Tenty Service</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          We help producers, musicians and rights holders protect their work from
          unauthorized use. Our team processes DMCA / Tenty complaints and manages
          takedowns on all major platforms, ensuring your music stays under your control.
        </p>
      </section>

      {/* ---------- SECTION 2 — MANAGER CARD ---------- */}
      <section className="flex items-center gap-6 p-6 border rounded-2xl shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
        <div>
          <Image
            src="/manager.jpg" // замените на свой путь
            width={120}
            height={120}
            alt="Manager"
            className="rounded-xl object-cover"
          />

          <div className="flex gap-3 mt-3 text-gray-600 dark:text-gray-300">
            <a href="https://twitter.com" target="_blank">
              <Twitter className="w-5 h-5 hover:text-blue-500 transition" />
            </a>
            <a href="https://instagram.com" target="_blank">
              <Instagram className="w-5 h-5 hover:text-pink-500 transition" />
            </a>
          </div>
        </div>

      <div>
        <h4 className="text-xl font-semibold">Jordan Tennant</h4>
        <p className="text-gray-600 dark:text-gray-400">
          Jordan Tennant is a 10-year experienced professional specializing in
          DMCA takedowns, copyright protection and content rights management.
        </p>
      </div>
      </section>

      {/* ---------- SECTION 3 — FORM ---------- */}
      <section>
        <h4 className="text-xl font-semibold mb-4">Submit a Tenty / DMCA Request</h4>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="trackLink"
            placeholder="Original track URL"
            value={form.trackLink}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            name="artistNickname"
            placeholder="Artist nickname"
            value={form.artistNickname}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            name="trackName"
            placeholder="Track title"
            value={form.trackName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            name="rightsHolder"
            placeholder="Rights holder name"
            value={form.rightsHolder}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            name="fullName"
            placeholder="Your full name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            name="email"
            placeholder="Email address"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            name="address"
            placeholder="Postal address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <button
            disabled={loading}
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>

        {result === 'success' && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg">
            Your complaint has been received!
          </div>
        )}
        {result === 'error' && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
            Please fill all fields correctly.
          </div>
        )}
      </section>
    </div>
  );
}
