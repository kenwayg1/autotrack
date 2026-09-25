import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { createArticle } from "@/lib/articles";

export async function POST(req) {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  try {
    const body    = await req.json();
    const article = createArticle(body);
    return NextResponse.json(article, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
