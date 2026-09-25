import { NextResponse } from "next/server";
import { SESSION_COOKIE, getAdminPassword } from "@/lib/auth";

export async function POST(req) {
  const { password } = await req.json();
  if (password !== getAdminPassword()) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return res;
}
