"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export default function ArticleForm({ existing }) {
  const router  = useRouter();
  const isEdit  = Boolean(existing);

  const [form, setForm]       = useState({
    title:    existing?.title    ?? "",
    excerpt:  existing?.excerpt  ?? "",
    content:  existing?.content  ?? "",
    category: existing?.category ?? CATEGORIES[0].slug,
    author:   existing?.author   ?? "",
    featured: existing?.featured ?? false,
  });
  const [imageFile, setImageFile]  = useState(null);
  const [imagePreview, setPreview] = useState(existing?.image ?? null);
  const [saving, setSaving]        = useState(false);
  const [error, setError]          = useState("");

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.content.trim()) { setError("Story content is required."); return; }

    setSaving(true);

    let image = existing?.image ?? null;
    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      const up = await fetch("/api/upload", { method: "POST", body: fd });
      if (up.ok) { image = (await up.json()).url; }
      else { setError("Image upload failed."); setSaving(false); return; }
    }

    const payload = { ...form, image };
    const url     = isEdit ? `/api/articles/${existing.id}` : "/api/articles";
    const method  = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="f-title">
          Headline <span style={{ color: "var(--red)" }}>*</span>
        </label>
        <input
          id="f-title"
          className="field"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Article headline"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="f-excerpt">Summary</label>
        <textarea
          id="f-excerpt"
          className="field"
          rows={2}
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          placeholder="One or two sentences for the homepage card"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="f-content">
          Story <span style={{ color: "var(--red)" }}>*</span>
        </label>
        <textarea
          id="f-content"
          className="field"
          rows={14}
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          placeholder="Full article text. Separate paragraphs with a blank line."
        />
      </div>

      {/* Category + Author row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="f-cat">Category</label>
          <select
            id="f-cat"
            className="field"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="f-author">Author</label>
          <input
            id="f-author"
            className="field"
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            placeholder="AutoTrack Desk"
          />
        </div>
      </div>

      {/* Photo upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="block w-full text-sm text-muted file:mr-3 file:py-2 file:px-4 file:border-0 file:text-xs file:font-mono file:uppercase file:tracking-widest file:cursor-pointer"
          style={{ "--file-bg": "var(--ink)", "--file-color": "white" }}
        />
        {imagePreview && (
          <div className="mt-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Preview" className="h-40 w-auto object-cover border border-rule" />
            <button
              type="button"
              className="mt-1 text-xs text-muted hover:text-red focus-ring"
              onClick={() => { setImageFile(null); setPreview(null); set("image", null); }}
            >
              Remove photo
            </button>
          </div>
        )}
      </div>

      {/* Featured toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          className="w-4 h-4 accent-green-700"
        />
        <span className="text-sm">Mark as featured (pinned to hero slot)</span>
      </label>

      {/* Error */}
      {error && (
        <p className="text-sm font-medium" style={{ color: "var(--red)" }}>{error}</p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn btn-green" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Publish story"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
