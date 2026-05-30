# WriteFlow AI

AI-powered writing SaaS for blogs, emails, social posts, and product copy. Built with **Next.js**, **Tailwind CSS**, **Prisma**, **Supabase**, and **OpenAI**.

## Architecture

See **[STRUCTURE.md](./STRUCTURE.md)** for the full folder layout.

```
app/          → Routes (App Router)
components/   → UI (ui/, layout/, feature folders)
hooks/        → Client React hooks
lib/          → Utils, validations, DB & API clients
server/       → Actions, repositories, services
types/        → Shared TypeScript types & DTOs
prisma/       → Database schema
```

## Features

- Marketing landing page with features and pricing
- Supabase email/password authentication
- Dashboard with usage stats and document list
- AI document editor with content types and tone control
- Credit-based usage tracking per plan
- REST API routes with Zod validation

## Prerequisites

- Node.js 20+
- [Supabase](https://supabase.com) project (Auth + Postgres)
- [OpenAI](https://platform.openai.com) API key

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env.local` and fill in values:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Description |
   |----------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
   | `DATABASE_URL` | Pooled Postgres URL (port 6543, `?pgbouncer=true`) |
   | `DIRECT_URL` | Direct Postgres URL for migrations (port 5432) |
   | `OPENAI_API_KEY` | OpenAI API key |

3. **Database**

   ```bash
   npx prisma db push
   ```

   In Supabase, enable **Email** auth under Authentication → Providers.

4. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma client and production build |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run migrations (dev) |
| `npm run db:studio` | Open Prisma Studio |

## Supabase notes

- Use the **connection pooler** URL for `DATABASE_URL` and the **direct** URL for `DIRECT_URL`.
- Add `http://localhost:3000/api/auth/callback` to Supabase redirect URLs if using OAuth later.
- User rows are created on first sign-in via `userRepository.upsertFromAuth`.
- Run `npm run db:seed` after push to load system templates.

## License

MIT
