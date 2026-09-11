"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Incorrect password.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-sm border border-line bg-canvas-elevated/50 p-6 sm:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Admin</p>
      <h1 className="mt-3 font-display text-3xl text-ink">Sign in</h1>
      <p className="mt-2 text-sm text-ink-muted">
        View and manage brand and creator inquiries submitted from the site.
      </p>

      <label className="mt-8 block text-xs font-medium uppercase tracking-[0.14em] text-ink-subtle">
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 w-full border border-line bg-canvas px-3.5 py-3 text-sm text-ink outline-none focus:border-accent"
        autoComplete="current-password"
        required
      />

      {error ? (
        <p className="mt-3 text-sm text-[#f07167]" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="mt-6 w-full" disabled={loading}>
        {loading ? "Signing in…" : "Enter admin"}
      </Button>
    </form>
  );
}
