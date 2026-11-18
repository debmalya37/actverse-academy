"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-paper p-8 shadow-xl">
        <h1 className="mb-6 font-display text-3xl font-bold text-cherry">Admin Portal</h1>
        
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
        
        <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold text-paper-foreground">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-border bg-white px-3 py-2" 
            required 
          />
        </div>
        
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-paper-foreground">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-border bg-white px-3 py-2" 
            required 
          />
        </div>
        
        <Button type="submit" className="w-full bg-cherry text-white hover:bg-cherry-deep">
          Sign In
        </Button>
      </form>
    </div>
  );
}