import Link from "next/link";
import { getAllArticles, getArticlesByCategory } from "@/lib/articles";
import { CATEGORIES } from "@/lib/constants";
import ArticleCard, { EntryMeta } from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export default function Home() {
  const all = getAllArticles();

  if (all.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl mb-3">No stories yet</h1>
        <p className="text-muted mb-6">Publish your first article from the admin dashboard.</p>
        <Link href="/admin" className="btn btn-green">Go to admin</Link>
      </div>
    );
  }

  const hero      = all[0];
  const secondary = all.slice(1, 4);
  const grid      = all.slice(4, 10);
  const sidebar   = all.slice(0, 8);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* ── HERO + secondary ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 border-b border-rule">
        <div className="lg:col-span-2">
          <ArticleCard article={hero} variant="hero" />
        </div>
        <div>
          <div
            className="font-mono text-[11px] uppercase tracking-widest text-white px-3 py-1 mb-2 inline-block"
            style={{ background: "var(--ink)" }}
          >
            Top Stories
          </div>
          {secondary.map((a) => (
            <ArticleCard key={a.id} article={a} variant="compact" />
          ))}
        </div>
      </section>

      {/* ── LATEST GRID + sidebar ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10 border-b border-rule">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold border-b-2 pb-1 mb-6 inline-block"
              style={{ borderColor: "var(--red)" }}>
            Latest
          </h2>
          {grid.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {grid.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
          ) : (
            <p className="text-muted text-sm">Publish more stories to fill this section.</p>
          )}
        </div>

        <aside>
          <h2
            className="font-mono text-[11px] uppercase tracking-widest text-white px-3 py-1 mb-2 inline-block"
            style={{ background: "var(--green)" }}
          >
            Recent Entries
          </h2>
          <ul>
            {sidebar.map((a) => (
              <li key={a.id} className="border-b border-rule last:border-b-0">
                <Link
                  href={`/article/${a.slug}`}
                  className="group focus-ring flex justify-between items-baseline gap-2 py-2"
                >
                  <span className="font-display text-sm group-hover:text-red line-clamp-1">{a.title}</span>
                  <EntryMeta article={a} />
                </Link>
              </li>
            ))}
          </ul>

          {/* section links */}
          <h2
            className="font-mono text-[11px] uppercase tracking-widest text-white px-3 py-1 mt-6 mb-2 inline-block"
            style={{ background: "var(--ink)" }}
          >
            Sections
          </h2>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.slug} className="border-b border-rule last:border-b-0">
                <Link
                  href={`/category/${c.slug}`}
                  className="focus-ring flex items-center justify-between py-2 hover:text-red"
                >
                  <span className="font-display">{c.label}</span>
                  <span className="text-muted">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* ── CATEGORY ROWS ── */}
      {CATEGORIES.slice(0, 3).map((cat) => {
        const items = getArticlesByCategory(cat.slug).slice(0, 4);
        if (!items.length) return null;
        return (
          <section key={cat.slug} className="py-10 border-b border-rule">
            <div className="flex items-baseline justify-between mb-5">
              <h2
                className="font-display text-2xl font-bold border-b-2 pb-1 inline-block"
                style={{ borderColor: "var(--green)" }}
              >
                {cat.label}
              </h2>
              <Link
                href={`/category/${cat.slug}`}
                className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-red focus-ring"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
          </section>
        );
      })}

    </div>
  );
}
