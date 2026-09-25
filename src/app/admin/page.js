import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE } from "@/lib/auth";
import { getAllArticles } from "@/lib/articles";
import { categoryLabel } from "@/lib/constants";
import { formatDateShort } from "@/lib/slug";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) {
    redirect("/admin/login");
  }

  const articles = getAllArticles();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="flex h-1 w-24 mb-3">
            <div className="flex-1" style={{ background: "var(--red)" }} />
            <div className="flex-1" style={{ background: "var(--green)" }} />
          </div>
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted text-sm mt-1">{articles.length} article{articles.length !== 1 ? "s" : ""} published</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/new" className="btn btn-green">+ New Story</Link>
          <Link href="/" className="btn btn-ghost">← View Site</Link>
          <form action="/api/logout" method="POST">
            <button type="submit" className="btn btn-ghost">Log out</button>
          </form>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-16 border border-rule rounded">
          <p className="text-muted mb-4">No articles yet.</p>
          <Link href="/admin/new" className="btn btn-green">Write your first story</Link>
        </div>
      ) : (
        <div className="border border-rule divide-y divide-rule bg-white">
          {/* table head */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-ink text-white font-mono text-[11px] uppercase tracking-widest">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {articles.map((a) => (
            <div key={a.id} className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-gray-50">
              <div className="col-span-1 font-mono text-[11px] text-muted">
                {String(a.entryNumber).padStart(3, "0")}
              </div>
              <div className="col-span-5">
                <Link
                  href={`/article/${a.slug}`}
                  className="font-display text-sm hover:text-red focus-ring line-clamp-1"
                  target="_blank"
                >
                  {a.title}
                </Link>
                {a.featured && (
                  <span
                    className="ml-2 font-mono text-[10px] uppercase px-1"
                    style={{ background: "var(--green)", color: "white" }}
                  >
                    Featured
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest text-white px-2 py-0.5"
                  style={{ background: "var(--ink)" }}
                >
                  {categoryLabel(a.category)}
                </span>
              </div>
              <div className="col-span-2 font-mono text-[11px] text-muted">
                {formatDateShort(a.createdAt)}
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Link href={`/admin/edit/${a.id}`} className="btn btn-black" style={{ padding: "0.3rem 0.75rem" }}>
                  Edit
                </Link>
                <DeleteButton id={a.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
