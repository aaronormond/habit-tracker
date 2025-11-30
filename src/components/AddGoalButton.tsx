"use client";
import { Plus } from "lucide-react";
import { addGoal } from "@/store/goalsStore";
import { Goal } from "./GoalItem";

interface AddGoalButtonProps {
  name?: string; // optional name for the new goal
}

export default function AddGoalButton({ name }: AddGoalButtonProps) {
    const handleClick = () => {
        const newId = Date.now();
        const newGoal: Goal = {
        id: newId,
        name: name ?? "", // use the passed name, or empty string
        doneToday: false,
        editing: !name,  // if name is given, don’t start in editing mode
        };
        addGoal(newGoal);
    };

    return (
        <button
        onClick={handleClick}
        className="bg-emerald-600 hover:bg-emerald-700 transition-colors p-2 rounded-lg"
        aria-label="Add goal"
        >
            <Plus className="w-5 h-5" />
        </button>
    );
}
