import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { SESSION_COOKIE } from "@/lib/auth";

export async function POST(req) {
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)?.value) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const formData = await req.formData();
  const file     = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const bytes  = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext    = file.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "");
  const name   = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const dir    = path.join(process.cwd(), "public", "uploads");

  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buffer);

  return NextResponse.json({ url: `/uploads/${name}` });
}
