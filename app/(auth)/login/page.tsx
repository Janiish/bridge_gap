"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, UserPlus } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const supabase = createClient();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const { data: { user: authUser }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else if (authUser?.user_metadata?.role === "senior") {
      window.location.href = "/senior/dashboard";
    } else if (authUser?.user_metadata?.role === "buddy") {
      window.location.href = "/buddy/dashboard";
    } else {
      // Fallback
      window.location.href = "/";
    }

    setIsLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Check your email for the magic link!" });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-5xl">🌉</span>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bridge Gap
          </h1>
        </div>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-md">
          Connecting Seniors with Caring Volunteers for Digital Safety & Support
        </p>
      </div>

      {/* Features Icons */}
      <div className="flex gap-8 mb-12">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Safe</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Connected</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
            <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Caring</span>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="text-center border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={isMagicLink ? handleMagicLink : handlePasswordLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 text-base"
                data-speak="true"
              />
            </div>

            {!isMagicLink && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={!isMagicLink}
                  className="h-11 text-base"
                  data-speak="true"
                />
              </div>
            )}

            {message && (
              <div
                className={`p-4 rounded-lg text-center text-sm font-medium ${
                  message.type === "success"
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                    : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full text-base"
              disabled={isLoading}
            >
              {isLoading
                ? "Please wait..."
                : isMagicLink
                ? "Send Magic Link"
                : "Sign In"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 text-base"
              onClick={() => {
                setIsMagicLink(!isMagicLink);
                setMessage(null);
              }}
            >
              {isMagicLink ? "Use Password Instead" : "Use Magic Link (No Password)"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">Don&apos;t have an account?</p>
            <Link href="/signup">
              <Button 
                type="button"
                variant="outline" 
                className="w-full h-11 text-base border-2"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Create New Account
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="mt-8 text-slate-500 dark:text-slate-400 text-sm">
        Need help? Call our support line: 1800-BRIDGE
      </p>
    </div>
  );
}
