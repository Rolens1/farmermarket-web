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
      className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col items-center justify-center gap-3 sm:gap-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-border cursor-pointer group min-w-[96px] min-h-[120px]"
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:text-primary-foreground" />
      </div>
      <span className="text-foreground text-xs sm:text-base font-medium">
        {label}
      </span>
    </div>
  );
}
