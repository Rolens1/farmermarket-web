import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function CategoryCard({
  icon: Icon,
  label,
  onClick,
}: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-3xl p-8 flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-border cursor-pointer group"
    >
      <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
      </div>
      <span className="text-foreground">{label}</span>
    </div>
  );
}
