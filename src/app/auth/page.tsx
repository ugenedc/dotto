"use client";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    try {
      const supabase = getSupabase();
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
            data: { first_name: firstName, last_name: lastName },
          },
        });
        setStatus(error ? `Error: ${error.message}` : "Please verify your email to finish creating your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setStatus(error ? `Error: ${error.message}` : "Signed in.");
      }
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
        {mode === "signup" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm" htmlFor="first">First name</label>
              <input id="first" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="h-11 px-3 rounded-[--radius] border border-[--color-border] bg-[--color-card] w-full" placeholder="Alex" />
            </div>
            <div>
              <label className="text-sm" htmlFor="last">Last name</label>
              <input id="last" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="h-11 px-3 rounded-[--radius] border border-[--color-border] bg-[--color-card] w-full" placeholder="Smith" />
            </div>
          </div>
        )}
        <label className="text-sm" htmlFor="email">Email</label>
        <input id="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="h-11 px-3 rounded-[--radius] border border-[--color-border] bg-[--color-card]" placeholder="you@example.com" />
        <label className="text-sm" htmlFor="password">Password</label>
        <input id="password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="h-11 px-3 rounded-[--radius] border border-[--color-border] bg-[--color-card]" placeholder="••••••••" />
        <button type="submit" className="h-11 rounded-full bg-[--color-primary] text-[--color-primary-foreground] font-medium mt-2">{mode === "signup" ? "Create account" : "Sign in"}</button>
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


