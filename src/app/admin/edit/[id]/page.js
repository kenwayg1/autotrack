import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE } from "@/lib/auth";
import { getArticleById } from "@/lib/articles";
import ArticleForm from "@/components/ArticleForm";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }) {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) redirect("/admin/login");

  const { id } = await params;
  const article = getArticleById(id);
  if (!article) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="btn btn-ghost text-xs">← Back</Link>
        <h1 className="font-display text-2xl font-bold">Edit Story</h1>
      </div>
      <div className="bg-white border border-rule p-6 sm:p-8">
        <ArticleForm existing={article} />
      </div>
    </div>
  );
}
