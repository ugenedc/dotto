"use client";
import { useState } from "react";

export default function AdminImportPage() {
  const [csvText, setCsvText] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Enqueuing...");
    const res = await fetch("/api/admin/import/enqueue", { method: "POST", body: csvText });
    const data = await res.json();
    setStatus(res.ok ? `Job started: ${data.jobId}` : `Error: ${data.error}`);
  }

  return (
    <div className="container-px mx-auto py-8 max-w-3xl">
      <h1 className="text-2xl font-semibold">Admin Import (CSV)</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <textarea
          className="min-h-[240px] p-3 rounded-[--radius] border border-[--color-border] bg-[--color-card] font-mono text-sm"
          placeholder="domain,price\nbrandly.io,4800\nflowbank.com,12000"
          value={csvText}
          onChange={(e)=>setCsvText(e.target.value)}
        />
        <button className="h-11 rounded-full bg-[--color-primary] text-[--color-primary-foreground] font-medium">Enqueue</button>
        {status && <div className="text-sm text-[--color-muted-foreground]">{status}</div>}
      </form>
    </div>
  );
}


