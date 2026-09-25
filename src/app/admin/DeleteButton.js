"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }) {
  const router   = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    setBusy(true);
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    router.refresh();
    setBusy(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="btn btn-red"
      style={{ padding: "0.3rem 0.75rem" }}
    >
      {busy ? "…" : "Delete"}
    </button>
  );
}
