"use client";
import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { GoalItem } from "./GoalItem";
import { useGoals, removeGoal, toggleGoal, updateGoalName } from "@/store/goalsStore";
import AddGoalButton from "./AddGoalButton";

export default function CurrentGoals() {
  const goals = useGoals();
  const listRef = useRef<HTMLUListElement>(null);
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [timeLeft, setTimeLeft] = useState("");
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const handleToggle = (id: number) => toggleGoal(id);
  
  const finishEditing = (id: number, value: string) => {
    if (!value.trim()) removeGoal(id);
    else updateGoalName(id, value.trim());
  };

  useEffect(() => { 
    const updateCountdown = () => { 
      const diff = new Date().setHours(24,0,0,0) - new Date().getTime(); 
      const format = (n: number) => String(n).padStart(2,"0"); 
      setTimeLeft([Math.floor(diff/3600000), Math.floor(diff/60000)%60, Math.floor(diff/1000)%60] 
        .map(format) 
        .join(":") ); 
    }; 
    updateCountdown(); 
    const timer = setInterval(updateCountdown, 1000); 
    return () => clearInterval(timer); 
  }, []);

  return (
    <section className="flex-1 p-8 bg-neutral-900 text-white rounded-2xl border border-neutral-800 flex flex-col transition-all duration-500 ease-in-out">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold tracking-tight">{day}</h2>
          <p className="text-sm text-neutral-500 font-normal"> {timeLeft} left </p>
        </div>
        <AddGoalButton /> {/* now handles adding itself */}
      </div>

      <ul ref={listRef} className="flex-1 min-h-0 max-h-72 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-700/60 hover:scrollbar-thumb-emerald-600/60">
        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            onToggle={handleToggle}
            onDelete={() => removeGoal(goal.id)}
            onFinishEditing={finishEditing}
            inputRef={(el) => (inputRefs.current[goal.id] = el)}
          />
        ))}

        {goals.length === 0 && (
          <p className="text-neutral-500 text-sm italic text-center mt-auto mb-auto">
            No goals yet — click <Plus className="inline w-4 h-4" /> to add one.
          </p>
        )}
      </ul>
    </section>
  );
}
