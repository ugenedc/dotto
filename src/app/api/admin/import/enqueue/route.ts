import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/supabase/admin";

function parseCsv(text: string): Array<{ domain: string; price?: number }> {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [domain, priceStr] = line.split(/,|\s+/);
      const price = priceStr ? Number(priceStr) : undefined;
      return { domain, price: Number.isFinite(price) ? price : undefined };
    });
}

export async function POST(req: Request): Promise<Response> {
  try {
    const userRes = await adminSupabase.auth.getUser();
    const user = userRes.data.user;
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    // check admin
    const { data: isAdminData } = await adminSupabase.rpc("is_admin");
    if (!isAdminData) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const text = await req.text();
    const rows = parseCsv(text);
    if (rows.length === 0) return NextResponse.json({ error: "No rows" }, { status: 400 });

    const { data: job, error: jobErr } = await adminSupabase
      .from("ingestion_jobs")
      .insert({ created_by: user.id, total: rows.length, status: "queued" })
      .select()
      .single();
    if (jobErr) throw jobErr;

    const items = rows.map((r) => ({
      job_id: job.id,
      raw_domain: r.domain,
      desired_price_usd: r.price,
      idempotency_key: r.domain.toLowerCase().trim(),
      status: "queued",
    }));

    const { error: itemsErr } = await adminSupabase.from("ingestion_items").insert(items);
    if (itemsErr) throw itemsErr;

    return NextResponse.json({ ok: true, jobId: job.id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


