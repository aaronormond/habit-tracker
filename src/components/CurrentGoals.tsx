"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Check, Trash2, ChevronDown, ChevronUp } from "lucide-react";

type Goal = {
  id: number;
  name: string;
  doneToday: boolean;
  editing?: boolean;
};

export default function CurrentGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, name: "Morning Workout", doneToday: false },
    { id: 2, name: "Meditation", doneToday: true },
    { id: 3, name: "Sleep 8h", doneToday: false },
  ]);
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const listRef = useRef<HTMLUListElement>(null);
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [timeLeft, setTimeLeft] = useState("");

  // get current weekday (e.g. "Tuesday")
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
  
  // smooth scroll to bottom on new goal
  useEffect(() => {
    if (!listRef.current) return;
    const timeout = setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
    return () => clearTimeout(timeout);
  }, [goals.length]);

  // fade message timeout
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 1500);
    return () => clearTimeout(t);
  }, [message]);

    // for countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // next midnight

      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleGoal = (id: number) =>
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, doneToday: !g.doneToday } : g
      )
    );

  const addInlineGoal = () => {
    if (goals.length >= 10) {
      setMessage("You’re doing too much. Chill.");
      return;
    }

    const newId = Date.now();
    setGoals((prev) => [
      ...prev,
      { id: newId, name: "", doneToday: false, editing: true },
    ]);
    setTimeout(() => inputRefs.current[newId]?.focus(), 50);
  };

  const finishEditing = (id: number, value: string) => {
    if (!value.trim()) {
      setGoals((prev) => prev.filter((g) => g.id !== id));
    } else {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === id ? { ...g, name: value.trim(), editing: false } : g
        )
      );
    }
  };

  return (
    <>
      <section
        className={`flex-1 p-8 bg-neutral-900 text-white rounded-2xl border border-neutral-800 flex flex-col transition-all duration-500 ease-in-out ${
          expanded ? "h-[40rem]" : "h-[28rem]"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold tracking-tight">
                {day}
            </h2>
            <p className="text-sm text-neutral-500 font-normal">
                {timeLeft} left
            </p>
          </div>
          <div className="flex items-center gap-2">
            {goals.length > 4 && (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="flex items-center text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                {expanded ? (
                  <>
                    See Less
                    <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    See More
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            )}
            <button
              onClick={addInlineGoal}
              className="bg-emerald-600 hover:bg-emerald-700 transition-colors p-2 rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <ul
          ref={listRef}
          className={`flex-1 min-h-0 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-700/60 hover:scrollbar-thumb-emerald-600/60 ${
            expanded ? "" : "max-h-72"
          }`}
        >
          {goals.map((goal) => (
            <li
              key={goal.id}
              className="group flex items-center justify-between p-4 bg-neutral-800 rounded-xl transition-all duration-200 hover:bg-neutral-700"
            >
              {goal.editing ? (
                <input
                  ref={(el) => {
                    inputRefs.current[goal.id] = el;
                  }}
                  defaultValue={goal.name}
                  placeholder="New goal..."
                  onBlur={(e) => finishEditing(goal.id, e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    finishEditing(goal.id, e.currentTarget.value)
                  }
                  className="flex-1 bg-transparent border-b border-neutral-600 focus:border-emerald-500 text-sm px-1 py-0.5 outline-none"
                />
              ) : (
                <span
                  className={`flex-1 text-sm transition-colors ${
                    goal.doneToday
                      ? "text-emerald-400 line-through"
                      : "text-neutral-300"
                  }`}
                >
                  {goal.name}
                </span>
              )}

              <div className="flex items-center gap-2 ml-3">
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                    goal.doneToday
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-700 text-neutral-400 hover:bg-neutral-600"
                  }`}
                >
                  {goal.doneToday && <Check className="w-4 h-4" />}
                </button>

                <button
                  onClick={() =>
                    setGoals((prev) => prev.filter((g) => g.id !== goal.id))
                  }
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}

          {goals.length === 0 && (
            <p className="text-neutral-500 text-sm italic text-center mt-auto mb-auto">
              No goals yet — click <Plus className="inline w-4 h-4" /> to add one.
            </p>
          )}
        </ul>
        {/* friendly toast */}
        {message && (
            <div className="relative text-center bg-neutral-800 text-neutral-100 border border-neutral-700 px-4 py-2 rounded-lg text-sm shadow-lg animate-[fadeIn_0.5s_ease-in-out]">
            {message}
            </div>
        )}
      </section>      
    </>
  );
}
