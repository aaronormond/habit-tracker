"use client";

import TrackingButton from "@/components/TrackingButton";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function motivate() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streak: 5 }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage("AI temporarily unavailable. Try again later.");
    }
    setLoading(false);
  }

  return (
    <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch bg-neutral-950 text-white overflow-hidden rounded-2xl">
      {/* LEFT SIDE — Image with overlay */}
      <div className="relative md:w-[45%] h-64 md:h-auto">
        <img
          src="/nice_apartment_night.jpeg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <TrackingButton />
        </div>
      </div>

      {/* RIGHT SIDE — Text block */}
      <div className="md:w-[55%] flex flex-col justify-normal text-left p-20 gap-6 md:gap-12">
        <h2 className="text-5xl md:text-6xl font-medium leading-relaxed tracking-tight pt-10">
          REACH YOUR GOALS
        </h2>
        <p className="text-neutral-400 text-sm tracking-wide leading-6">
          Filler text is text that shares some characteristics of a real written text, 
          but is random or otherwise generated. It may be used to display a sample of fonts, 
          generate text for testing, or to spoof an e-mail spam filter.
        </p>
      </div>
    </section>
  );
}
