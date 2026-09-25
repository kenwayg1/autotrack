import fs   from "fs";
import path from "path";
import { slugify } from "./slug";

const DATA_DIR  = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "articles.json");

function ensure() {
  if (!fs.existsSync(DATA_DIR))  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readAll() {
  ensure();
  try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) || []; }
  catch { return []; }
}

function writeAll(arr) {
  ensure();
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), "utf-8");
}

function byDate(a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt);
}

export const getAllArticles         = () => readAll().sort(byDate);
export const getArticleBySlug      = (slug) => readAll().find((a) => a.slug === slug) ?? null;
export const getArticleById        = (id)   => readAll().find((a) => a.id   === id)   ?? null;
export const getArticlesByCategory = (cat)  => getAllArticles().filter((a) => a.category === cat);

function uniqueSlug(base, pool) {
  let s = base || "story", n = 2;
  while (pool.some((a) => a.slug === s)) s = `${base}-${n++}`;
  return s;
}

export function createArticle({ title, excerpt, content, category, author, image, featured }) {
  const all  = readAll();
  const slug = uniqueSlug(slugify(title), all);
  const now  = new Date().toISOString();
  const art  = {
    id:          `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    entryNumber: all.length + 1,
    slug, title: title.trim(),
    excerpt: excerpt?.trim() ?? "",
    content: content?.trim() ?? "",
    category, author: author?.trim() || "Bennett Oghifo",
    image: image ?? null,
    featured: Boolean(featured),
    createdAt: now, updatedAt: now,
  };
  all.push(art);
  writeAll(all);
  return art;
}

export function updateArticle(id, updates) {
  const all = readAll();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  const cur  = all[idx];
  const slug = updates.title && updates.title.trim() !== cur.title
    ? uniqueSlug(slugify(updates.title), all.filter((a) => a.id !== id))
    : cur.slug;
  all[idx] = { ...cur, ...updates, slug, updatedAt: new Date().toISOString() };
  writeAll(all);
  return all[idx];
}

export function deleteArticle(id) {
  const all  = readAll();
  const next = all.filter((a) => a.id !== id);
  writeAll(next);
  return next.length < all.length;
}
