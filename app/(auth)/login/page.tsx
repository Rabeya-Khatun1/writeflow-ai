import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/layout/logo";

type PageProps = {
  searchParams: Promise<{ redirect?: string }>;
};

export const metadata = {
  title: "Log in | WriteFlow AI",
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { redirect: redirectTo } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="mb-8">
        <Logo />
      </div>
      <LoginForm redirectTo={redirectTo} />
    </div>
  );
}
