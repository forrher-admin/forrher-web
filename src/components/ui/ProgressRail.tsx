type ProgressRailProps = {
  value: number;
  className?: string;
};

export function ProgressRail({ value, className = "" }: ProgressRailProps) {
  const width = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full bg-cream-deep ${className}`}
      aria-hidden="true"
    >
      <div
        className="h-full rounded-full bg-gold transition-all duration-300"
        style={{ width: `${Math.max(width, 6)}%` }}
      />
    </div>
  );
}
