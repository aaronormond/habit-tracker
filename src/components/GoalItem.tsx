"use client";

import { Check, Trash2 } from "lucide-react";

export type Goal = {
  id: number;
  name: string;
  doneToday: boolean;
  editing?: boolean;
};

type GoalItemProps = {
  goal: Goal;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onFinishEditing: (id: number, value: string) => void;
  inputRef?: (el: HTMLInputElement | null) => void;
};

export function GoalItem({ goal, onToggle, onDelete, onFinishEditing, inputRef }: GoalItemProps) {
  return (
    <li className="group flex items-center justify-between p-4 bg-neutral-800 rounded-xl transition-all duration-200 hover:bg-neutral-600">
      {goal.editing ? (
        <input
          ref={inputRef}
          defaultValue={goal.name}
          placeholder="New goal..."
          onBlur={(e) => onFinishEditing(goal.id, e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && onFinishEditing(goal.id, e.currentTarget.value)
          }
          className="flex-1 bg-transparent border-b border-neutral-600 focus:border-emerald-500 text-sm px-1 py-0.5 outline-none"
        />
      ) : (
        <span
          className={`flex-1 text-sm transition-colors ${
            goal.doneToday ? "text-emerald-400" : "text-neutral-300"
          }`}
        >
          {goal.name}
        </span>
      )}

      <div className="flex items-center gap-2 ml-3">
        <button
          onClick={() => onToggle(goal.id)}
          className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
            goal.doneToday ? "bg-emerald-600 text-white" : "bg-neutral-700 text-neutral-400 hover:bg-neutral-500"
          }`}
        >
          {goal.doneToday && <Check className="w-4 h-4" />}
        </button>

        <button
          onClick={() => onDelete(goal.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
}
