"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Habit = {
  id: string;
  name: string;
  streak: number;
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHabits() {
      const { data, error } = await supabase
        .from("habits")
        .select("id, name, streak")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setHabits(data as Habit[]);
      }
      setLoading(false);
    }
    loadHabits();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white p-8">
        <p>Loading your habits...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Your habits</h1>
      <div className="space-y-4">
        {habits.length === 0 && (
          <p className="text-neutral-400">No habits yet. Add one from Supabase or build a form.</p>
        )}
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="bg-neutral-800 rounded-2xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-semibold">{habit.name}</p>
              <p className="text-sm text-neutral-400">Streak: {habit.streak} days</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl text-sm">
              Mark done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

