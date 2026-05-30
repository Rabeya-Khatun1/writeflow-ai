import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaBanner() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700 px-8 py-16 text-center shadow-xl shadow-violet-500/25 sm:px-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:3rem_3rem]"
          aria-hidden
        />
        <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to write smarter?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-violet-100">
          Join teams shipping better content with WriteFlow AI. Start free — 50 credits,
          no card required.
        </p>
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ size: "lg" }),
            "relative mt-8 h-11 gap-2 bg-white px-6 text-violet-700 hover:bg-violet-50"
          )}
        >
          Get started for free
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
