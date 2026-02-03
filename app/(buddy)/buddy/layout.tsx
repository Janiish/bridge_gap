"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { BuddySidebar, BuddyTopBar } from "@/components/buddy/sidebar";
import { PageTransition } from "@/components/providers/page-transition";
import { createClient } from "@/utils/supabase/client";
import { ChatBubble } from "@/components/ai/chat-bubble";

const navItems = [
  { href: "/buddy/dashboard", label: "Dashboard" },
  { href: "/buddy/requests", label: "Help Requests" },
  { href: "/buddy/calls", label: "Video Calls" },
  { href: "/buddy/profile", label: "My Profile" },
];

export default function BuddyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPage = navItems.find((item) => item.href === pathname);

  useEffect(() => {
    const ensureProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", user.id)
        .single();

      if (!profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Buddy",
          role: user.user_metadata?.role || "buddy",
          created_at: new Date().toISOString(),
        });
      }
    };

    ensureProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white flex">
      {/* Sidebar */}
      <BuddySidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Bar */}
        <BuddyTopBar title={currentPage?.label} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>

      <ChatBubble />
    </div>
  );
}
