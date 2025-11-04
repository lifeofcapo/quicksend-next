"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">

      <h2 className="text-2xl font-semibold">Sign in</h2>

      <button
        onClick={() => signIn("google")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Continue with Google
      </button>
    </div>
  );
}
