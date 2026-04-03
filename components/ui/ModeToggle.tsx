"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

interface ModeOption {
  value: string;
  label: string;
}

interface ModeToggleProps {
  options: ModeOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ModeToggle({
  options,
  value,
  onChange,
  className,
}: ModeToggleProps) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value}
      onValueChange={(val) => {
        if (val) onChange(val);
      }}
      className={cn("flex gap-1.5", className)}
    >
      {options.map((opt) => (
        <ToggleGroupPrimitive.Item
          key={opt.value}
          value={opt.value}
          className={cn(
            "rounded-[var(--radius-sm,6px)] border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.02em] transition-all outline-none",
            "data-[state=off]:border-border data-[state=off]:bg-card data-[state=off]:text-muted-foreground",
            "data-[state=off]:hover:border-border-hover data-[state=off]:hover:bg-card-hover data-[state=off]:hover:text-foreground",
            "data-[state=on]:border-accent/25 data-[state=on]:bg-accent-dim data-[state=on]:text-accent",
            "focus-visible:ring-1 focus-visible:ring-ring"
          )}
        >
          {opt.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  );
}
