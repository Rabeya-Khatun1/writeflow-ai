import Link from "next/link";
import { PenLine } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-semibold", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
        <PenLine className="h-4 w-4" />
      </span>
      <span className="text-zinc-900 dark:text-zinc-50">{APP_NAME}</span>
    </Link>
  );
}
