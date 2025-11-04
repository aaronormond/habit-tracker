"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddHabitForm({ onAdd }: { onAdd: () => void }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await supabase.from("habits").insert([{ name, streak: 0 }]);
    setName("");
    setLoading(false);
    onAdd();
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New habit..."
        className="flex-1 bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-white"
      />
      <button
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
