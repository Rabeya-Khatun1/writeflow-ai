import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PLAN_LIMITS, PRICING_TIERS } from "@/lib/constants";
import { getCurrentProfile } from "@/lib/auth/get-current-user";

export const metadata = {
  title: "Settings | WriteFlow AI",
};

export default async function SettingsPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const limits = PLAN_LIMITS[profile.plan];

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Settings</h1>
        <p className="mt-1 text-zinc-500">Account and billing overview.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Email</span>
            <span className="font-medium">{profile.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Name</span>
            <span className="font-medium">{profile.name ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Plan</span>
            <Badge>{profile.plan}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Current plan limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">AI credits remaining</span>
            <span className="font-medium">{profile.credits} / {limits.credits}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Document limit</span>
            <span className="font-medium">Up to {limits.documents}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upgrade</CardTitle>
          <CardDescription>Stripe checkout coming soon — contact for Team plans.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {PRICING_TIERS.map((tier) => (
              <li key={tier.name}>
                <strong>{tier.name}</strong> — {tier.price}
                {tier.period}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
