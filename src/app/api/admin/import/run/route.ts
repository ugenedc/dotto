import { NextResponse } from "next/server";
import OpenAI from "openai";
import { adminSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function generateBrandImage(domain: string): Promise<Blob> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Create a clean, minimal vector-style brand logo on a plain background for the domain ${domain}. Premium, calm, trustworthy, rounded corners, soft shadows.`;
  const img = await client.images.generate({ model: "gpt-image-1", prompt, size: "1024x1024" });
  const arr = img?.data ?? [];
  const b64 = arr.length > 0 ? arr[0]?.b64_json : undefined;
  if (!b64) throw new Error("OpenAI did not return image data");
  const buffer = Buffer.from(b64, "base64");
  return new Blob([buffer], { type: "image/png" });
}

function derive(domain: string) {
  const parts = domain.split(".");
  const name = parts[0] ?? domain;
  const tld = parts[1] ? `.${parts[1]}` : "";
  const syllables = name.split(/[aeiouy]+/i).length - 1;
  return { tld, length: name.length, syllables };
}

export async function POST(): Promise<Response> {
  try {
    // ensure admin
    const { data: isAdmin } = await adminSupabase.rpc("is_admin");
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // fetch a small batch of queued items
    const { data: items, error } = await adminSupabase
      .from("ingestion_items")
      .select("id, raw_domain, desired_price_usd, job_id")
      .eq("status", "queued")
      .limit(5);
    if (error) throw error;
    if (!items || items.length === 0) return NextResponse.json({ ok: true, processed: 0 });

    for (const it of items) {
      await adminSupabase.from("ingestion_items").update({ status: "processing", attempts: 1 }).eq("id", it.id);
      try {
        const imgBlob = await generateBrandImage(it.raw_domain);
        const { tld, length, syllables } = derive(it.raw_domain);

        const filePath = `logos/${it.raw_domain.replace(/[^a-z0-9.\-]/gi, "_")}.png`;
        const arrayBuffer = await imgBlob.arrayBuffer();
        const { error: upErr } = await adminSupabase.storage
          .from("brand-assets")
          .upload(filePath, Buffer.from(arrayBuffer), { contentType: "image/png", upsert: true });
        if (upErr) throw upErr;
        const { data: pub } = adminSupabase.storage.from("brand-assets").getPublicUrl(filePath);

        // tie listing to admin user (created_by of job)
        const { data: job } = await adminSupabase.from("ingestion_jobs").select("created_by").eq("id", it.job_id).single();
        const price = it.desired_price_usd ?? 5000;
        const slug = it.raw_domain.toLowerCase();
        const { data: listing, error: insErr } = await adminSupabase
          .from("listings")
          .insert({
            seller_id: job!.created_by,
            domain: it.raw_domain,
            tld,
            slug,
            price_usd: price,
            payment_plan_available: true,
            syllables,
            length,
          })
          .select()
          .single();
        if (insErr) throw insErr;

        await adminSupabase
          .from("ingestion_items")
          .update({ status: "done", listing_id: listing!.id })
          .eq("id", it.id);
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        await adminSupabase
          .from("ingestion_items")
          .update({ status: "error", error: message.slice(0, 500) })
          .eq("id", it.id);
      }
    }

    return NextResponse.json({ ok: true, processed: items.length });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


