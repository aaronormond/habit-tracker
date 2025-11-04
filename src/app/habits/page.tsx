"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AddHabitForm from "@/components/AddHabitForm";
import HabitCard from "@/components/HabitCard";

type Habit = {
  id: string;
  name: string;
  streak: number;
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);

  async function loadHabits() {
    const { data, error } = await supabase.from("habits").select("id, name, streak");
    if (!error && data) setHabits(data);
  }

  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Habits</h2>
      <AddHabitForm onAdd={loadHabits} />
      <div className="space-y-4 mt-8">
        {habits.map(habit => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
}
