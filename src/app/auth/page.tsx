"use client";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/` } });
      setStatus(error ? `Error: ${error.message}` : mode === "signup" ? "Check your email to finish creating your account." : "Check your email for a sign-in link.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Missing configuration";
      setStatus(`Error: ${message}`);
    }
  }

  return (
    <div className="container-px mx-auto py-16 max-w-md">
      <div className="text-center">
        <h1 className="text-[32px] font-semibold tracking-tight">{mode === "signin" ? "Sign in" : "Create account"}</h1>
        <p className="mt-2 text-[--color-muted-foreground]">We’ll email you a secure one-time link.</p>
      </div>
      <form onSubmit={onSubmit} className="mt-8 card rounded-[--radius] p-6 grid gap-3">
        <label className="text-sm" htmlFor="email">Email</label>
        <input id="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="h-11 px-3 rounded-[--radius] border border-[--color-border] bg-[--color-card]" placeholder="you@example.com" />
        <button type="submit" className="h-11 rounded-full bg-[--color-primary] text-[--color-primary-foreground] font-medium mt-2">Send magic link</button>
        <div className="flex items-center justify-between text-sm mt-2">
          <button type="button" onClick={()=>setMode(mode === "signin" ? "signup" : "signin")} className="underline underline-offset-4">
            {mode === "signin" ? "Create an account" : "Have an account? Sign in"}
          </button>
          <span className="text-[--color-muted-foreground]">By continuing you agree to our Terms</span>
        </div>
        {status && <div className="text-sm text-[--color-muted-foreground] mt-1">{status}</div>}
      </form>
    </div>
  );
}


