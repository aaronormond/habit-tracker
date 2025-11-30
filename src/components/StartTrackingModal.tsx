"use client";

import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase";

interface StartTrackingModalProps {
  onClose: () => void;
}

export default function StartTrackingModal({ onClose }: StartTrackingModalProps) {
  const router = useRouter();

//   const handleSignIn = async () => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "github",
//       });
//       if (error) throw error;
//     } catch (err) {
//       console.error(err);
//     }
//   };

  const handleGuest = () => {
    localStorage.setItem("guest", "true");
    onClose();
    router.push("/tracking");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <section className="p-8 bg-neutral-900 text-white rounded-2xl border border-neutral-800 w-96 shadow-lg relative">
        <h2 className="text-2xl font-semibold tracking-tight mb-4 text-center">
          Welcome!
        </h2>
        <p className="mb-6 text-center text-neutral-300">
          Sign in coming soon! Continue as Guest.
        </p>

        <div className="flex flex-col gap-4">
          {/* <button
            // onClick={handleSignIn}
            onClick={handleGuest}
            className="
              w-full
              px-6 py-3
              bg-emerald-600 hover:bg-emerald-500
              rounded-xl font-semibold
              transition text-white
            "
          >
            No Sign In Yet! Coming Soon.
          </button> */}

          <button
            onClick={handleGuest}
            className="
              w-full
              px-6 py-3
              border border-neutral-700 rounded-xl
              hover:bg-neutral-800
              transition text-white font-medium
            "
          >
            Continue as Guest
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-400 hover:text-white transition"
        >
          ✕
        </button>
      </section>
    </div>
  );
}
