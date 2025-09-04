import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/supabase/admin";

export async function POST(req: Request): Promise<Response> {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 401 });

  const { data, error } = await adminSupabase.auth.getUser(token);
  if (error || !data?.user) return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  const u = data.user;
  const first = String(u.user_metadata?.first_name || "").trim();
  const last = String(u.user_metadata?.last_name || "").trim();
  const display = [first, last].filter(Boolean).join(" ") || u.email || "";

  const { error: upErr } = await adminSupabase.from("profiles").upsert({
    id: u.id,
    display_name: display,
  }, { onConflict: "id" });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}


