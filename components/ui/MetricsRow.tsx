import { MetricCard } from "./MetricCard";
import type { MetricVariant } from "@/lib/ctr.lib";

interface MetricItem {
  label: string;
  value: string;
  variant?: MetricVariant;
}

interface MetricsRowProps {
  metrics: MetricItem[];
}

export function MetricsRow({ metrics }: MetricsRowProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-3 max-[500px]:grid-cols-1">
      {metrics.map((m) => (
        <MetricCard
          key={m.label}
          label={m.label}
          value={m.value}
          variant={m.variant}
        />
      ))}
    </div>
  );
}
