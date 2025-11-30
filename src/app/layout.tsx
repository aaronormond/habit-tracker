"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { Manrope } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // triggers re-render when route changes

  return (
    <html lang="en">
      <body
        className={`${manrope.className} min-h-screen flex flex-col bg-neutral-950 text-white`}
      >
        <Navbar />

        <AnimatePresence mode="wait">
          <motion.main
            key={pathname} // key forces remount on every page change
            className="flex-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.main>
        </AnimatePresence>

        <footer className="border-t border-neutral-800 text-center text-sm text-neutral-500 py-4">
        </footer>
      </body>
    </html>
  );
}
