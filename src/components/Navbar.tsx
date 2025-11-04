import TrackingButton from "./TrackingButton";

export default function Navbar() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Habit Hero
        </h1>
        <nav className="flex gap-8">
          <TrackingButton />
        </nav>
      </div>
    </header>
  );
}
