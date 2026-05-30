import { Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/marketing/landing-data";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by content teams
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how marketers and founders use WriteFlow to ship more, stress less.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <Card
              key={item.name}
              className="border-border/80 bg-card/80"
            >
              <CardContent className="pt-6">
                <Quote className="size-8 text-violet-200 dark:text-violet-900" />
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-violet-100 text-sm font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
