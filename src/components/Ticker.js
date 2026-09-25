import Link from "next/link";

export default function Ticker({ articles }) {
  if (!articles?.length) return null;
  const items = [...articles, ...articles]; // duplicate for seamless loop

  return (
    <div className="bg-ink text-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex">
        {/* label */}
        <div className="hidden sm:flex shrink-0 items-center gap-2 px-4 py-2 bg-red font-mono text-[11px] uppercase tracking-widest">
          <span className="pulse-dot w-2 h-2 rounded-full bg-white inline-block" aria-hidden="true" />
          Live
        </div>
        {/* scrolling headlines */}
        <div className="overflow-hidden flex-1 py-2">
          <div className="flex whitespace-nowrap ticker-track w-max">
            {items.map((a, i) => (
              <Link
                key={`${a.id}-${i}`}
                href={`/article/${a.slug}`}
                className="px-6 text-sm hover:text-yellow-300 focus-ring"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
