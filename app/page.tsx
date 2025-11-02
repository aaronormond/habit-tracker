"use client";

import { useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleMotivate() {
    setLoading(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ streak: 5 }),
    });
    const data = await res.json();
    setMessage(data.message);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">Habit Hero</h1>
      <p className="text-neutral-400 mb-6">Tiny AI that pretends to care about your routines.</p>
      <button
        onClick={handleMotivate}
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 px-6 py-3 rounded-xl"
      >
        {loading ? "Thinking..." : "Motivate me"}
      </button>
      {message && (
        <div className="mt-6 max-w-lg text-center bg-neutral-900 rounded-xl p-4 border border-neutral-800">
          {message}
        </div>
      )}
    </main>
  );
}
