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
    <div className="flex min-h-screen bg-white dark:bg-zinc-950">
      <DashboardSidebar credits={profile.credits} />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
