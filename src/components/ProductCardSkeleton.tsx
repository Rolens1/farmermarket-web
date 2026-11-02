"use client";

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-border animate-pulse flex flex-col h-full">
      <div className="aspect-[4/3] bg-muted/20" />
      <div className="p-3 sm:p-5 space-y-3 flex flex-col flex-1">
        <div className="flex justify-between items-center gap-2">
          <div className="h-5 bg-muted/25 rounded-md w-3/5" />
          <div className="h-5 bg-muted/25 rounded-md w-1/4" />
        </div>
        <div className="h-3.5 bg-muted/15 rounded-md w-2/5" />
        <div className="h-3.5 bg-muted/15 rounded-md w-1/2" />
        <div className="h-9 bg-muted/20 rounded-full w-full mt-auto" />
      </div>
    </div>
  );
}

