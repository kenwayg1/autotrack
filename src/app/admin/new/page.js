import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE } from "@/lib/auth";
import ArticleForm from "@/components/ArticleForm";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) redirect("/admin/login");

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="btn btn-ghost text-xs">← Back</Link>
        <h1 className="font-display text-2xl font-bold">New Story</h1>
      </div>
      <div className="bg-white border border-rule p-6 sm:p-8">
        <ArticleForm />
      </div>
    </div>
  );
}
