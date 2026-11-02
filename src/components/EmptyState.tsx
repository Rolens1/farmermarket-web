"use client";

import { ShoppingBag, LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}

export function EmptyState({
  title,
  description,
  actionText,
  actionHref,
  onAction,
  icon: Icon = ShoppingBag,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-6 bg-white rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto my-6 shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-xs">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
      {actionText && (
        actionHref ? (
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-semibold px-6 shadow-xs">
            <Link href={actionHref}>{actionText}</Link>
          </Button>
        ) : (
          <Button
            onClick={onAction}
            className="rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-semibold px-6 shadow-xs"
          >
            {actionText}
          </Button>
        )
      )}
    </div>
  );
}

