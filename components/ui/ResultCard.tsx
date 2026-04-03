"use client";

import { cn } from "@/lib/utils";

interface ResultCardProps {
  label: string;
  value: string;
  unit?: string;
  isEmpty: boolean;
  isFlashing: boolean;
}

export function ResultCard({
  label,
  value,
  unit,
  isEmpty,
  isFlashing,
}: ResultCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-5 transition-colors",
        isFlashing && "animate-flash-result"
      )}
    >
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-mono font-medium leading-none tracking-tight",
            isEmpty
              ? "text-[28px] text-subtle"
              : "text-[40px] text-accent"
          )}
        >
          {value}
        </span>
        {!isEmpty && unit && (
          <span className="font-mono text-sm text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
