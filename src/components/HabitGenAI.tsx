"use client"

import { useState } from "react";
import { Loader2 } from "lucide-react";
import AddGoalButton from "./AddGoalButton";

export default function TrackingPage() {
  const [goal, setGoal] = useState("");
  const [suggestedHabits, setSuggestedHabits] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateHabits = async () => {
    if (!goal.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/gen-habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });

      const data = await res.json();
      setSuggestedHabits(data.habits || []);
    } catch (err) {
      console.error("Error generating habits:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-8 bg-neutral-900 text-white rounded-2xl border border-neutral-800 w-2/3 min-w-80 max-w-3xl mx-auto mt-12">
      {/* Header */}
      <h2 className="text-2xl font-semibold tracking-tight mb-6 text-center">
        What’s your goal?
      </h2>

      {/* Input */}
      <div className="flex flex-col gap-6">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="I want to..."
          autoFocus
          className="
            w-full px-6 py-3
            bg-neutral-800 border border-neutral-700
            rounded-xl text-white placeholder-neutral-400
            focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent
            transition
          "
        />

        <button
          onClick={handleGenerateHabits}
          disabled={loading}
          className="mx-auto w-2/3 h-12 min-w-max px-6 py-3 rounded-xl text-white font-semibold transition bg-emerald-600 hover:bg-emerald-500"
        >
        {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto text-white" /> : "Generate Habits"}
        </button>
      </div>

      {/* Suggested Habits */}
      {suggestedHabits.length > 0 && (
        <div className="mt-10 bg-neutral-800 p-6 rounded-xl border border-neutral-700">
          <h3 className="text-lg font-semibold tracking-tight mb-4">
            Suggested Habits
          </h3>

          <ul className="space-y-3">
            {suggestedHabits.map((habit, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-neutral-700 p-3 rounded-lg"
              >
                <span className="text-neutral-200">
                  {loading ? (
                    <Loader2 className="animate-spin w-5 h-5 mx-auto text-white" />
                  ) : (
                    habit
                  )}
                </span>

                <AddGoalButton name={habit}/>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
