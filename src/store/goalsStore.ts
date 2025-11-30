// goalsStore.ts
import { useState, useEffect } from "react";
import { Goal } from "@/components/GoalItem";

let goals: Goal[] = [];
let listeners: (() => void)[] = [];

export function addGoal(goal: Goal) {
  goals.push(goal);
  listeners.forEach((fn) => fn());
}

export function removeGoal(id: number) {
  goals = goals.filter(g => g.id !== id);
  listeners.forEach((fn) => fn());
}

export function toggleGoal(id: number) {
  const goal = goals.find(g => g.id === id);
  if (goal) goal.doneToday = !goal.doneToday;
  listeners.forEach(fn => fn());
}

export function updateGoalName(id: number, name: string) {
  const goal = goals.find(g => g.id === id);
  if (goal) goal.name = name;
  listeners.forEach(fn => fn());
}

// hook to use the goals in a component
export function useGoals() {
  const [state, setState] = useState(goals);

  useEffect(() => {
    const listener = () => setState([...goals]);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return state;
}
