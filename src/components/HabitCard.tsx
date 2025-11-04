"use client";
import { supabase } from "@/lib/supabase";

export default function HabitCard({ habit }: { habit: { id: string; name: string; streak: number } }) {
  async function markDone() {
    const updated = habit.streak + 1;
    await supabase.from("habits").update({ streak: updated }).eq("id", habit.id);
    window.location.reload();
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{habit.name}</h3>
        <p className="text-neutral-400 text-sm">Streak: {habit.streak}</p>
      </div>
      <button
        onClick={markDone}
        className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl text-sm"
      >
        Mark Done
      </button>
    </div>
  );
}
