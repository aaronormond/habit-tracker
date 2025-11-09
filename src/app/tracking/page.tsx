import HabitChart from "./HabitChart";
import CurrentGoals from "./CurrentGoals";

export default function TrackingPage() {
  return (
    <section className="max-w-6xl mx-auto px-10">
        <section className="max-w-6xl flex flex-col md:flex-row items-stretch bg-neutral-950 text-white overflow-hidden md:gap-8 gap-10 md:p-6 p-12">
            {/* Left side: Current Goals */}
            <CurrentGoals />
            
            {/* Right side: Habit History */}
            <HabitChart />
        </section>
    </section>
  );
}
