import Link from "next/link";
import { CATEGORIES, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { getAllArticles } from "@/lib/articles";
import Ticker from "./Ticker";

export default function Header() {
  const latest = getAllArticles().slice(0, 8);
  const today  = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <header>
      <Ticker articles={latest} />

      {/* ── Masthead ── */}
      <div style={{ background: "var(--ink)" }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-end justify-between flex-wrap gap-2">
          <Link href="/" className="focus-ring">
            {/* Red/green accent line above the name */}
            <div className="flex h-1 w-40 mb-2">
              <div className="flex-1" style={{ background: "var(--red)" }} />
              <div className="flex-1" style={{ background: "var(--green)" }} />
            </div>
            <div className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-white">
              {SITE_NAME}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest mt-1" style={{ color: "var(--rule)" }}>
              {SITE_TAGLINE}
            </div>
          </Link>
          <div className="font-mono text-[11px] uppercase tracking-widest text-gray-400 self-start mt-1">
            {today}
          </div>
        </div>
      </div>

      {/* ── Navigation bar ── */}
      <nav style={{ background: "var(--green)" }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center overflow-x-auto">
          <Link
            href="/"
            className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-white hover:bg-black/20 focus-ring whitespace-nowrap"
          >
            Home
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-white hover:bg-black/20 focus-ring whitespace-nowrap"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
