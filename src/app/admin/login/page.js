"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";

export default function LoginPage() {
  const [pw, setPw]       = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password. Try again.");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* logo strip */}
        <div className="flex h-1 mb-6">
          <div className="flex-1" style={{ background: "var(--red)" }} />
          <div className="flex-1" style={{ background: "var(--green)" }} />
        </div>
        <h1 className="font-display text-3xl mb-1">{SITE_NAME}</h1>
        <p className="text-muted text-sm mb-6">Admin login</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="pw">Password</label>
            <input
              id="pw"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="field"
              placeholder="••••••••"
              autoFocus
              required
            />
          </div>
          {error && (
            <p className="text-sm font-medium" style={{ color: "var(--red)" }}>{error}</p>
          )}
          <button type="submit" className="btn btn-green w-full justify-center" disabled={loading}>
            {loading ? "Checking…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
