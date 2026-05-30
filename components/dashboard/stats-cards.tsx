import { FileText, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  documentCount: number;
  credits: number;
  generationsThisMonth: number;
}

export function StatsCards({
  documentCount,
  credits,
  generationsThisMonth,
}: StatsCardsProps) {
  const stats = [
    {
      label: "Documents",
      value: documentCount,
      icon: FileText,
    },
    {
      label: "Credits left",
      value: credits,
      icon: Sparkles,
    },
    {
      label: "Generations this month",
      value: generationsThisMonth,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">{label}</CardTitle>
            <Icon className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
