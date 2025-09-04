"use client";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

export default function AdminImportPage() {
  const [csvText, setCsvText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        setStatus("Please sign in to continue.");
        return;
      }
      const { data: ok } = await supabase.rpc("is_admin");
      setIsAdmin(!!ok);
      if (!ok) setStatus("Admin access required.");
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Enqueuing...");
    const supabase = getSupabase();
    const { data: sess } = await supabase.auth.getSession();
    const token = sess.session?.access_token ?? "";
    const res = await fetch("/api/admin/import/enqueue", { method: "POST", body: csvText, headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (res.ok) {
      setJobId(data.jobId);
      setStatus(`Job started: ${data.jobId}`);
    } else {
      setStatus(`Error: ${data.error}`);
    }
  }

  async function runBatch() {
    setStatus("Processing a batch...");
    const supabase = getSupabase();
    const { data: sess } = await supabase.auth.getSession();
    const token = sess.session?.access_token ?? "";
    const res = await fetch("/api/admin/import/run", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setStatus(res.ok ? `Processed ${data.processed} items` : `Error: ${data.error}`);
  }

  return (
    <div className="container-px mx-auto py-8 max-w-3xl">
      <h1 className="text-2xl font-semibold">Admin Import (CSV)</h1>
      {isAdmin === false && (
        <div className="mt-4 text-[--color-muted-foreground]">{status}</div>
      )}
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <textarea
          className="min-h-[240px] p-3 rounded-[--radius] border border-[--color-border] bg-[--color-card] font-mono text-sm"
          placeholder="domain,price\nbrandly.io,4800\nflowbank.com,12000"
          value={csvText}
          onChange={(e)=>setCsvText(e.target.value)}
        />
        <div className="flex gap-2">
          <button disabled={!isAdmin} className="h-11 px-5 rounded-full bg-[--color-primary] text-[--color-primary-foreground] font-medium disabled:opacity-60">Enqueue</button>
          <button type="button" onClick={runBatch} disabled={!isAdmin} className="h-11 px-5 rounded-full border border-[--color-border] bg-[--color-card] font-medium disabled:opacity-60">Run batch</button>
        </div>
        {jobId && <div className="text-sm">Job: <span className="font-mono">{jobId}</span></div>}
        {status && <div className="text-sm text-[--color-muted-foreground]">{status}</div>}
      </form>
    </div>
  );
}


