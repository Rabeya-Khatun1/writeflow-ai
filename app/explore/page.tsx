import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import { TemplateDTO } from "@/types";

export const metadata = {
  title: "Explore Templates | WriteFlow AI",
};

async function getTemplates(): Promise<TemplateDTO[]> {
  return prisma.template.findMany({
    where: {
      isPublic: true,
      isActive: true,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      userId: true,
      scope: true,
      name: true,
      slug: true,
      description: true,
      type: true,
      prompt: true,
      tone: true,
      isPublic: true,
      isActive: true,
      usageCount: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export default async function ExplorePage() {
  const templates = await getTemplates();

  return (
    <main className="space-y-8 py-8 sm:py-10">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Explore templates
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
            Browse ready-made writing templates for blogs, emails, ads, and more. Pick one to start generating content faster.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                  <p className="font-medium text-zinc-800 dark:text-zinc-100">Category</p>
                  <p>{template.type}</p>
                </div>
              </CardContent>
              <CardFooter className="justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  {template.scope === "SYSTEM" ? "System" : "Custom"}
                </span>
                <Link
                  href={`/dashboard/generate?prompt=${encodeURIComponent(
                    template.prompt
                  )}&topic=${encodeURIComponent(template.name)}`}
                >
                  <Button size="sm">Use Template</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
