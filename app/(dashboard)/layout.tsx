import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { getCurrentProfile } from "@/lib/auth/get-current-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 lg:flex-row">
      <DashboardSidebar credits={profile.credits} />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
