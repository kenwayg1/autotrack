import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { categoryLabel } from "@/lib/constants";
import { formatDate } from "@/lib/slug";
import { EntryMeta } from "@/components/ArticleCard";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) return {};
  return { title: `${a.title} — AutoTrack`, description: a.excerpt };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const paragraphs = article.content
    .split(/\n+/).map((p) => p.trim()).filter(Boolean);

  const related = getArticlesByCategory(article.category)
    .filter((a) => a.id !== article.id).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Article body ── */}
        <article className="lg:col-span-2">
          <Link
            href={`/category/${article.category}`}
            className="inline-block text-white text-[11px] font-mono uppercase tracking-widest px-2 py-1 mb-3 focus-ring"
            style={{ background: "var(--red)" }}
          >
            {categoryLabel(article.category)}
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-6 pb-4 border-b border-rule">
            <span>By <strong className="text-ink">{article.author}</strong></span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(article.createdAt)}</span>
            <span aria-hidden="true">·</span>
            <EntryMeta article={article} />
          </div>

          {article.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.image} alt="" className="w-full aspect-[16/9] object-cover mb-6" />
          ) : (
            <div className="hatch w-full aspect-[16/9] flex items-center justify-center mb-6">
              <span className="font-mono text-white/40 text-[11px] uppercase tracking-widest">No Photo</span>
            </div>
          )}

          <div className="text-[17px] leading-relaxed space-y-5">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside>
          <div
            className="font-mono text-[11px] uppercase tracking-widest text-white px-3 py-1 mb-2 inline-block"
            style={{ background: "var(--green)" }}
          >
            More in {categoryLabel(article.category)}
          </div>
          {related.length === 0 ? (
            <p className="text-muted text-sm py-3">No other stories in this section yet.</p>
          ) : (
            related.map((a) => <ArticleCard key={a.id} article={a} variant="compact" />)
          )}
        </aside>
      </div>
    </div>
  );
}
