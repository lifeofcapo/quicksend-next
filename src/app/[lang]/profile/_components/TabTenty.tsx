'use client';
import { useState } from 'react';

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

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allFilled = Object.values(form).every((v) => v.trim() !== '');
    if (allFilled) setSubmitted(true);
  };

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-xl font-semibold">DMCA / Tenty Complaint Form</h3>
      <p className="text-gray-600 dark:text-gray-400">
        Please note: all information must be provided in English.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="trackLink"
          placeholder="Link to the original track"
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
          placeholder="Name of the rights holder"
          value={form.rightsHolder}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
        <input
          name="fullName"
          placeholder="Full name"
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
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit Complaint
        </button>
      </form>

      {submitted && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg">
          Your complaint has been received and is under review.
        </div>
      )}
    </div>
  );
}
