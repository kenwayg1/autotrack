import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { updateArticle, deleteArticle } from "@/lib/articles";

async function authed() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function PUT(req, { params }) {
  if (!(await authed())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const { id }    = await params;
  const body      = await req.json();
  const updated   = updateArticle(id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  if (!(await authed())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const { id } = await params;
  const ok     = deleteArticle(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ deleted: true });
}
