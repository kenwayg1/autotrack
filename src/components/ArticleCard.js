import Link from "next/link";
import { categoryLabel } from "@/lib/constants";
import { formatDateShort } from "@/lib/slug";

function Photo({ article, className }) {
  if (article.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={article.image} alt="" className={`object-cover w-full h-full ${className ?? ""}`} />;
  }
  return (
    <div className={`hatch w-full h-full flex items-center justify-center ${className ?? ""}`}>
      <span className="font-mono text-white/40 text-[10px] uppercase tracking-widest">No Photo</span>
    </div>
  );
}

export function EntryMeta({ article }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
      #{String(article.entryNumber).padStart(3, "0")} · {formatDateShort(article.createdAt)}
    </span>
  );
}

export default function ArticleCard({ article, variant = "default" }) {
  if (variant === "hero") {
    return (
      <Link href={`/article/${article.slug}`} className="group focus-ring block">
        <div className="aspect-[16/9] overflow-hidden mb-4">
          <Photo article={article} />
        </div>
        <span
          className="inline-block text-white text-[11px] font-mono uppercase tracking-widest px-2 py-1 mb-2"
          style={{ background: "var(--red)" }}
        >
          {categoryLabel(article.category)}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl leading-tight group-hover:text-red">
          {article.title}
        </h1>
        <p className="text-muted mt-2 text-base leading-relaxed">{article.excerpt}</p>
        <div className="mt-3"><EntryMeta article={article} /></div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="group focus-ring flex gap-3 items-start py-3 border-b border-rule last:border-b-0"
      >
        <div className="w-20 h-14 shrink-0 overflow-hidden">
          <Photo article={article} />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-sm leading-snug group-hover:text-red line-clamp-2">
            {article.title}
          </h3>
          <div className="mt-1"><EntryMeta article={article} /></div>
        </div>
      </Link>
    );
  }

  // default card
  return (
    <Link href={`/article/${article.slug}`} className="group focus-ring block">
      <div className="aspect-[4/3] overflow-hidden mb-3">
        <Photo article={article} />
      </div>
      <span className="font-mono text-[11px] uppercase tracking-widest text-green">
        {categoryLabel(article.category)}
      </span>
      <h2 className="font-display text-xl leading-snug mt-1 group-hover:text-red">
        {article.title}
      </h2>
      <p className="text-muted text-sm mt-1 line-clamp-2">{article.excerpt}</p>
      <div className="mt-2"><EntryMeta article={article} /></div>
    </Link>
  );
}
