import { TrendingDown, TrendingUp } from "lucide-react";

function StatsCard({
  icon: Icon,
  title,
  value,
  change,
  trend,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            trend === "up" ? "text-green-600" : "text-slate-500"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {change}
        </div>
      </div>
      <h3 className="text-slate-900 text-2xl font-semibold mb-1">{value}</h3>
      <p className="text-slate-500 text-sm">{title}</p>
      <p className="text-slate-400 text-xs mt-1">{subtitle}</p>
    </div>
  );
}
export { StatsCard };
