interface MetricProps {
  label: string;
  value: string | number | null;
  sub?: string;
}

export function Metric({ label, value, sub }: MetricProps) {
  return (
    <div>
      <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {value ?? '\u2014'}
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {label}
        {sub && <span className="ml-1 text-zinc-400 dark:text-zinc-500">{sub}</span>}
      </p>
    </div>
  );
}
