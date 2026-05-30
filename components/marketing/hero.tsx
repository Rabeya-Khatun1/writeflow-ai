import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TRUST_POINTS = [
  "No credit card required",
  "50 free AI credits",
  "Cancel anytime",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          aria-hidden
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 border-violet-200 bg-violet-50 px-3 py-1 text-violet-700 dark:border-violet-800 dark:bg-violet-950/60 dark:text-violet-300"
          >
            <Sparkles className="size-3.5" />
            AI writing workspace for modern teams
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl sm:leading-[1.1]">
            Ship content{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              10× faster
            </span>{" "}
            with WriteFlow AI
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Draft blogs, emails, social posts, and product copy in seconds. Templates,
            tone control, and a production-ready editor — built for marketers and
            founders who move fast.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 gap-2 bg-violet-600 px-6 text-white hover:bg-violet-700"
              )}
            >
              Start writing free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-6")}
            >
              View demo workspace
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-violet-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl border border-border bg-card/80 p-2 shadow-2xl shadow-violet-500/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-red-400/80" />
                <span className="size-3 rounded-full bg-amber-400/80" />
                <span className="size-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="flex-1 text-center text-xs text-muted-foreground">
                WriteFlow — Blog post draft
              </span>
            </div>
            <div className="grid gap-4 p-4 sm:grid-cols-5">
              <div className="space-y-3 rounded-xl bg-muted/50 p-4 sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  AI prompt
                </p>
                <p className="text-sm text-foreground/90">
                  Write a blog post about remote work productivity tips for startup
                  founders…
                </p>
                <div className="inline-flex items-center gap-1 rounded-md bg-violet-600 px-2.5 py-1 text-xs font-medium text-white">
                  <Sparkles className="size-3" />
                  Generate
                </div>
              </div>
              <div className="space-y-2 rounded-xl border border-border bg-background p-4 sm:col-span-3">
                <p className="text-lg font-semibold">5 Remote Work Habits That Actually Scale</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Remote work isn&apos;t about logging hours from your couch — it&apos;s
                  about designing systems that keep your team aligned without the
                  overhead of constant meetings…
                </p>
                <div className="flex items-center gap-1 pt-2 text-xs text-muted-foreground">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  Quality score 92 · 847 words
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
