import { notFound } from "next/navigation";
import { getArticlesByCategory } from "@/lib/articles";
import { CATEGORIES, categoryLabel } from "@/lib/constants";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `${categoryLabel(slug)} — AutoTrack` };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  if (!CATEGORIES.some((c) => c.slug === slug)) notFound();
  const articles = getArticlesByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-10" style={{ background: "var(--red)" }} aria-hidden="true" />
        <h1 className="font-display text-4xl font-bold">{categoryLabel(slug)}</h1>
      </div>

      {articles.length === 0 ? (
        <p className="text-muted">No stories in this section yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}
    </div>
  );
}
