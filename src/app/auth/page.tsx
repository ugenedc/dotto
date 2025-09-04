"use client";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/` } });
      setStatus(error ? `Error: ${error.message}` : "Check your email for a sign-in link.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Missing configuration";
      setStatus(`Error: ${message}`);
    }
  }

  return (
    <div className="container-px mx-auto py-8 max-w-md">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form onSubmit={onSubmit} className="mt-6 card rounded-[--radius] p-5 grid gap-3">
        <label className="text-sm" htmlFor="email">Email</label>
        <input id="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="h-11 px-3 rounded-[--radius] border border-[--color-border] bg-[--color-card]" placeholder="you@example.com" />
        <button type="submit" className="h-11 rounded-full bg-[--color-primary] text-[--color-primary-foreground] font-medium mt-2">Send magic link</button>
        {status && <div className="text-sm text-[--color-muted-foreground]">{status}</div>}
      </form>
    </div>
  );
}


