import { cn } from "@/lib/utils";
import type { MetricVariant } from "@/lib/ctr.lib";

interface MetricCardProps {
  label: string;
  value: string;
  variant?: MetricVariant;
}

const variantClass: Record<MetricVariant, string> = {
  default: "text-foreground",
  positive: "text-teal",
  negative: "text-negative",
  empty: "text-subtle",
};

export function MetricCard({
  label,
  value,
  variant = "default",
}: MetricCardProps) {
  const resolvedVariant: MetricVariant =
    value === "—" ? "empty" : variant;

  return (
    <div className="rounded-md border border-border bg-card px-3.5 py-3">
      <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "font-mono text-[15px] font-medium",
          variantClass[resolvedVariant]
        )}
      >
        {value}
      </p>
    </div>
  );
}
