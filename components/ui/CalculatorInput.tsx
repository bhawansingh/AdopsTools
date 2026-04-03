"use client";

import { cn } from "@/lib/utils";

interface CalculatorInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  optional?: boolean;
  error?: string;
  className?: string;
}

export function CalculatorInput({
  label,
  id,
  value,
  onChange,
  placeholder,
  optional = false,
  error,
  className,
}: CalculatorInputProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-2">
        <label
          htmlFor={id}
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
        >
          {label}
        </label>
        {optional && (
          <span className="rounded-full border border-border bg-card px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.06em] text-subtle">
            optional
          </span>
        )}
      </div>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-[var(--radius-sm,6px)] border bg-card px-3.5 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-subtle",
          error
            ? "border-destructive focus:border-destructive"
            : "border-border focus:border-accent"
        )}
      />
      {error && (
        <p className="font-mono text-[10px] text-destructive">{error}</p>
      )}
    </div>
  );
}
