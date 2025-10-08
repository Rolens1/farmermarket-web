import { Clock } from "lucide-react";

function ActivityItem({
  icon: Icon,
  title,
  description,
  time,
  iconColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  time: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-lg ${iconColor} flex items-center justify-center flex-shrink-0`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-900 font-medium text-sm">{title}</p>
        <p className="text-slate-600 text-sm mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-1 text-slate-400 text-xs flex-shrink-0">
        <Clock className="w-3 h-3" />
        {time}
      </div>
    </div>
  );
}
export { ActivityItem };
