function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-600 text-sm">{label}</span>
      <span className="text-slate-900 font-semibold">{value}</span>
    </div>
  );
}
export { InsightRow };
