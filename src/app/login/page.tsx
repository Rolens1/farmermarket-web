"use client";

import { useState } from "react";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "../api/auth/login";
import { useAuth } from "../../context/AuthContext";
import { securedGet } from "../api/fetch.api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { setUser } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = formData.email;
    const password = formData.password;
    console.log("Email:", email, "Password:", password);
    await signIn(email, password);
    // Fetch user info after login
    try {
      const response = await securedGet("/auth/me");
      if (response && response.user) {
        setUser(response.user);
      }
    } catch (e) {
      // ignore
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-16 bg-gradient-to-b from-secondary/20 to-background">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
            <Leaf className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-foreground mb-2">Farmers&rsquo; Market</h1>
          <p className="text-muted-foreground">
            {isSignup ? "Create your account" : "Welcome back"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
          <form className="space-y-6" onSubmit={loginHandler}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="rounded-2xl"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-2xl"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-2xl"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full rounded-full bg-primary hover:bg-primary/90 py-6"
            >
              {/* <Link href="/dashboard">{isSignup ? "Sign Up" : "Log In"}</Link> */}
              <span>{isSignup ? "Sign Up" : "Log In"}</span>
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {isSignup
                  ? "Already have an account? Log in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-muted-foreground mb-4">
              Continue as
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                type="button"
                className="w-full rounded-full py-6"
              >
                <Link href="/browse">Buyer</Link>
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-full rounded-full py-6"
              >
                <Link href="/dashboard">Seller</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Link href="/">← Back to home</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
