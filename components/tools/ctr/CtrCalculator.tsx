"use client";

import { useState, useMemo, useCallback } from "react";
import { calcCtr, CTR_MODE_CONFIG, type CtrMode, type CtrInputs } from "@/lib/ctr.lib";
import { useFlash } from "@/hooks/useFlash";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { CalculatorInput } from "@/components/ui/CalculatorInput";
import { ResultCard } from "@/components/ui/ResultCard";
import { MetricsRow } from "@/components/ui/MetricsRow";

const MODE_OPTIONS = [
  { value: "ctr", label: "CTR" },
  { value: "clicks", label: "Clicks" },
  { value: "imps", label: "Imps" },
];

export function CtrCalculator() {
  const [mode, setMode] = useState<CtrMode>("ctr");
  const [inputs, setInputs] = useState<CtrInputs>({ a: "", b: "" });
  const [errors, setErrors] = useState<{ a?: string; b?: string }>({});
  const { isFlashing, triggerFlash } = useFlash();

  const cfg = CTR_MODE_CONFIG[mode];

  const result = useMemo(() => calcCtr(mode, inputs), [mode, inputs]);

  const handleModeChange = useCallback((val: string) => {
    setMode(val as CtrMode);
    setInputs({ a: "", b: "" });
    setErrors({});
  }, []);

  const handleInput = useCallback(
    (field: keyof CtrInputs) => (value: string) => {
      setInputs((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleCalculate = () => {
    const newErrors: { a?: string; b?: string } = {};
    const a = parseFloat(inputs.a);
    const b = parseFloat(inputs.b);
    if (!isFinite(a) || a <= 0) newErrors.a = "Must be a positive number";
    if (!isFinite(b) || b <= 0) newErrors.b = "Must be a positive number";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    triggerFlash();
  };

  return (
    <div className="p-10 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-1.5 font-display text-xl font-bold text-foreground">
          CTR Calculator
        </h2>
        <p className="font-body text-xs text-muted-foreground leading-relaxed">
          Calculate click-through rate, or solve for clicks or impressions.
        </p>
      </div>
      <div className="mb-6 h-px bg-border" />

      {/* Mode switcher */}
      <ModeToggle
        options={MODE_OPTIONS}
        value={mode}
        onChange={handleModeChange}
        className="mb-6"
      />

      {/* Inputs */}
      <div className="mb-5 grid grid-cols-2 gap-3.5 max-[640px]:grid-cols-1">
        <CalculatorInput
          id="ctr-a"
          label={cfg.labelA}
          value={inputs.a}
          onChange={handleInput("a")}
          placeholder={cfg.placeholderA}
          error={errors.a}
        />
        <CalculatorInput
          id="ctr-b"
          label={cfg.labelB}
          value={inputs.b}
          onChange={handleInput("b")}
          placeholder={cfg.placeholderB}
          error={errors.b}
        />
      </div>

      {/* Calculate button */}
      <button
        onClick={handleCalculate}
        className="mb-6 w-full rounded-[var(--radius-sm,6px)] bg-accent py-[11px] font-display text-sm font-bold text-black transition-opacity hover:opacity-[0.88] active:scale-[0.98]"
      >
        Calculate
      </button>

      {/* Result */}
      <div className="mb-3.5">
        <ResultCard
          label={result.primaryLabel}
          value={result.primaryValue}
          unit={result.primaryUnit}
          isEmpty={result.isEmpty}
          isFlashing={isFlashing}
        />
      </div>

      {/* Secondary metrics */}
      <MetricsRow
        metrics={[
          { label: "Clicks per 1k Imps", value: result.metrics.per1k },
          { label: "Industry Avg CTR", value: result.metrics.benchmark },
          {
            label: "vs Benchmark",
            value: result.metrics.vs,
            variant: result.metrics.vsVariant,
          },
        ]}
      />
    </div>
  );
}
