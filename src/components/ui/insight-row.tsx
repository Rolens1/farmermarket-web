function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center gap-2 flex-wrap">
      <span className="text-slate-600 text-xs sm:text-sm break-words max-w-[60%]">
        {label}
      </span>
      <span className="text-slate-900 font-semibold text-xs sm:text-base break-words max-w-[40%] text-right">
        {value}
      </span>
    </div>
  );
}
export { InsightRow };
