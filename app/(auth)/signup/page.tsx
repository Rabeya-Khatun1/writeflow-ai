import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/layout/logo";
import { signUp } from "@/server/actions/auth";

export const metadata = {
  title: "Sign up | WriteFlow AI",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="mb-8">
        <Logo />
      </div>
      <AuthForm mode="signup" action={signUp} />
    </div>
  );
}
