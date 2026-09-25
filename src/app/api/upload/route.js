import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { SESSION_COOKIE } from "@/lib/auth";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY    = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

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

  // Build signed upload request
  const timestamp = Math.round(Date.now() / 1000);
  const signature = crypto
    .createHash("sha1")
    .update(`timestamp=${timestamp}${API_SECRET}`)
    .digest("hex");

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("api_key", API_KEY);
  uploadData.append("timestamp", timestamp);
  uploadData.append("signature", signature);
  uploadData.append("folder", "autotrack");

  const res  = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: uploadData }
  );
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.error?.message ?? "Upload failed" }, { status: 500 });
  }

  return NextResponse.json({ url: data.secure_url });
}