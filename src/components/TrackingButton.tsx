"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/authUtils";
import StartTrackingModal from "@/components/StartTrackingModal";

export default function TrackingButton() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = async () => {
    const user = await getCurrentUser();
    if (user) {
      router.push("/tracking");
    } else {
      // open the modal if no user
      setModalOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-xl font-medium transition"
      >
        Start Tracking
      </button>

      {modalOpen && <StartTrackingModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
