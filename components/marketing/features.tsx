import {
  BarChart3,
  FileText,
  Layers,
  MessageSquare,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LANDING_FEATURES } from "@/lib/marketing/landing-data";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  Layers,
  FileText,
  BarChart3,
  MessageSquare,
  Shield,
};

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-b border-border/60 bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to scale content
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From first draft to published piece — templates, AI generation, reviews,
            and usage tracking in one modern workspace.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon] ?? Zap;
            return (
              <Card
                key={feature.title}
                className="border-border/80 bg-card/60 transition-shadow hover:shadow-lg hover:shadow-violet-500/5"
              >
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950/80">
                    <Icon className="size-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
