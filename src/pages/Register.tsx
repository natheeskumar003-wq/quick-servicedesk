import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Register = () => {
  const [loading] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <article className="w-full max-w-sm p-6 rounded-lg border border-border bg-card shadow-[var(--elevation-1)]">
        <h1 className="text-2xl font-semibold mb-1">Create your account</h1>
        <p className="text-sm text-muted-foreground mb-6">Book or provide services with QuickServe</p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="Register form">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" type="text" placeholder="Alex Johnson" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>Create account</Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="underline-offset-4 hover:underline">Sign in</Link>
        </p>
      </article>
    </main>
  );
};

export default Register;
