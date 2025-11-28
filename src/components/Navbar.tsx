import TrackingButton from "./TrackingButton";

export default function Navbar() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-10 py-6">
        <a href="/" className="text-2xl font-bold text-white tracking-tight">
          HabitHero
        </a>
        <TrackingButton />
      </div>
    </header>
  );
}
