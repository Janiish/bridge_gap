"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  HelpCircle,
  Video,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/buddy/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/buddy/requests", label: "Help Requests", icon: HelpCircle },
  { href: "/buddy/calls", label: "Video Calls", icon: Video },
  { href: "/buddy/profile", label: "My Profile", icon: User },
];

export function BuddySidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-800/80 dark:backdrop-blur-md border-r border-slate-200 dark:border-slate-700 flex flex-col z-50 shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl">🌉</span>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Bridge Gap</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Volunteer Hub</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md dark:shadow-blue-600/20"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium text-sm">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Status Indicator */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-700/50">
          <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Online</span>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full justify-start text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}

export function BuddyTopBar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-800/40 dark:backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-slate-900 dark:text-white"
        >
          {title || "Dashboard"}
        </motion.h2>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <div className="h-2 w-2 bg-red-500 rounded-full absolute top-1 right-1" />
            <svg
              className="h-5 w-5 text-slate-700 dark:text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </motion.button>
          <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center font-semibold text-white shadow-md">
            B
          </div>
        </div>
      </div>
    </header>
  );
}
