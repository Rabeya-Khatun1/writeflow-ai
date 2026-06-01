import { DocumentType, PrismaClient, TemplateScope } from "@prisma/client";
import { DEMO_USERS } from "../lib/auth/demo-users";

const prisma = new PrismaClient();

const SYSTEM_TEMPLATES: {
  slug: string;
  name: string;
  description: string;
  type: DocumentType;
  tone: string;
  prompt: string;
}[] = [
  {
    slug: "blog-post",
    name: "Blog Post",
    description: "Long-form article with SEO-friendly structure",
    type: "BLOG",
    tone: "professional",
    prompt:
      "Write a well-structured blog post with a compelling headline, introduction, subheadings, and conclusion. Use markdown.",
  },
  {
    slug: "email-newsletter",
    name: "Email Newsletter",
    description: "Engaging newsletter for your audience",
    type: "EMAIL",
    tone: "friendly",
    prompt:
      "Write a newsletter email with subject line, preview text, body sections, and a clear CTA.",
  },
  {
    slug: "linkedin-post",
    name: "LinkedIn Post",
    description: "Professional social post for LinkedIn",
    type: "SOCIAL",
    tone: "professional",
    prompt:
      "Write a concise LinkedIn post with a strong hook, value-driven body, and engagement question.",
  },
  {
    slug: "product-description",
    name: "Product Description",
    description: "E-commerce copy that converts",
    type: "PRODUCT",
    tone: "persuasive",
    prompt:
      "Write a product description highlighting benefits, features, and a compelling call to action.",
  },
  {
    slug: "ad-copy",
    name: "Ad Copy",
    description: "Short persuasive ad copy for paid channels",
    type: "AD_COPY",
    tone: "persuasive",
    prompt:
      "Write compelling ad copy with a strong headline, primary text, and a clear call to action. Keep it concise and attention-grabbing.",
  },
];

async function main() {
  for (const template of SYSTEM_TEMPLATES) {
    const existing = await prisma.template.findFirst({
      where: {
        scope: TemplateScope.SYSTEM,
        slug: template.slug,
        userId: null,
      },
    });

    if (existing) {
      await prisma.template.update({
        where: { id: existing.id },
        data: {
          name: template.name,
          description: template.description,
          prompt: template.prompt,
          isPublic: true,
          isActive: true,
        },
      });
    } else {
      await prisma.template.create({
        data: {
          scope: TemplateScope.SYSTEM,
          userId: null,
          slug: template.slug,
          name: template.name,
          description: template.description,
          type: template.type,
          tone: template.tone,
          prompt: template.prompt,
          isPublic: true,
          isActive: true,
        },
      });
    }
  }

  console.log(`Seeded ${SYSTEM_TEMPLATES.length} system templates`);

  for (const demo of DEMO_USERS) {
    await prisma.user.upsert({
      where: { id: demo.id },
      create: {
        id: demo.id,
        email: demo.email,
        name: demo.name,
        plan: demo.plan,
        credits: demo.credits,
      },
      update: {
        email: demo.email,
        name: demo.name,
        plan: demo.plan,
      },
    });
  }

  console.log(`Seeded ${DEMO_USERS.length} demo users`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
