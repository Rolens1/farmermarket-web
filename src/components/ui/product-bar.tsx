function ProductBar({
  title,
  value,
  max,
  color,
}: {
  title: string;
  value: number;
  max: number;
  color: string;
}) {
  const percentage = (value / max) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-slate-700 text-sm">{title}</span>
        <span className="text-slate-900 font-medium text-sm">
          ${value.toFixed(2)}
        </span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
export { ProductBar };
