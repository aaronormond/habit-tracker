import HabitChart from "../../components/HabitChart";
import CurrentGoals from "../../components/CurrentGoals";
import HabitGenAI from "@/components/HabitGenAI";

export default function TrackingPage() {
  return (
    <section className="flex flex-col max-w-6xl mx-auto px-10 gap-32">
        <section className="mt-10">
          <HabitGenAI />
        </section>
        <section className="max-w-6xl flex flex-col overflow-hidden md:flex-row items-stretch bg-neutral-950 text-white md:gap-8 gap-10 md:p-6 p-12">
            {/* Left side: Current Goals */}
            <CurrentGoals />
            
            {/* Right side: Habit History */}
            <HabitChart />
        </section>
    </section>
  );
}
