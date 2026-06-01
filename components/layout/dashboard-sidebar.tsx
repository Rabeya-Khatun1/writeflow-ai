"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Plus, Settings, Sparkles } from "lucide-react";
import { Wand2 } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Logo } from "@/components/layout/logo";
import ThemeToggle from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/generate", label: "Generate", icon: Wand2 },
  { href: "/documents/new", label: "New document", icon: Plus },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({ credits }: { credits: number }) {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 lg:w-64 lg:border-b-0 lg:border-r lg:min-h-screen">
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800 lg:sticky lg:top-0 lg:z-10">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 dark:bg-violet-950/50">
          <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          <div className="text-sm">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">{credits} credits</p>
            <p className="text-xs text-zinc-500">remaining this month</p>
          </div>
        </div>
        <div className="mb-2">
          <ThemeToggle />
        </div>
        <SignOutButton />
      </div>
    </aside>
  );
}
