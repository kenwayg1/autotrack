import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)" }} className="text-white mt-16">
      {/* accent stripe */}
      <div className="flex h-1">
        <div className="flex-1" style={{ background: "var(--red)" }} />
        <div className="flex-1" style={{ background: "var(--green)" }} />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <div className="font-display text-2xl">{SITE_NAME}</div>
          <p className="text-gray-400 text-sm mt-1">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
        <nav className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/admin" className="hover:text-white focus-ring">Admin Dashboard</Link>
        </nav>
      </div>
    </footer>
  );
}
