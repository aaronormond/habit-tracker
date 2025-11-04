import "./globals.css";
import Navbar from "@/components/Navbar";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply the font className here */}
      <body
        className={`${manrope.className} min-h-screen flex flex-col bg-neutral-950 text-white`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-800 text-center text-sm text-neutral-500 py-4">
          Built with ❤️ using Next.js + Supabase
        </footer>
      </body>
    </html>
  );
}
