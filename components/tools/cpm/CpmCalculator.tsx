"use client";

import { useState, useMemo, useCallback } from "react";
import { calcCpm, CPM_MODE_CONFIG, type CpmMode, type CpmInputs } from "@/lib/cpm.lib";
import { useFlash } from "@/hooks/useFlash";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { CalculatorInput } from "@/components/ui/CalculatorInput";
import { ResultCard } from "@/components/ui/ResultCard";
import { MetricsRow } from "@/components/ui/MetricsRow";

const MODE_OPTIONS = [
  { value: "cpm", label: "CPM" },
  { value: "cost", label: "Cost" },
  { value: "imps", label: "Imps" },
];

export function CpmCalculator() {
  const [mode, setMode] = useState<CpmMode>("cpm");
  const [inputs, setInputs] = useState<CpmInputs>({ a: "", b: "", clicks: "" });
  const [errors, setErrors] = useState<{ a?: string; b?: string }>({});
  const { isFlashing, triggerFlash } = useFlash();

  const cfg = CPM_MODE_CONFIG[mode];

  const result = useMemo(() => calcCpm(mode, inputs), [mode, inputs]);

  const handleModeChange = useCallback((val: string) => {
    setMode(val as CpmMode);
    setInputs({ a: "", b: "", clicks: "" });
    setErrors({});
  }, []);

  const handleInput = useCallback(
    (field: keyof CpmInputs) => (value: string) => {
      setInputs((prev) => ({ ...prev, [field]: value }));
      if (field !== "clicks") {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
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
          CPM / eCPM Calculator
        </h2>
        <p className="font-body text-xs text-muted-foreground leading-relaxed">
          Calculate cost per thousand impressions, or solve for any missing variable.
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

      {/* Primary inputs */}
      <div className="mb-3.5 grid grid-cols-2 gap-3.5 max-[640px]:grid-cols-1">
        <CalculatorInput
          id="cpm-a"
          label={cfg.labelA}
          value={inputs.a}
          onChange={handleInput("a")}
          placeholder={cfg.placeholderA}
          error={errors.a}
        />
        <CalculatorInput
          id="cpm-b"
          label={cfg.labelB}
          value={inputs.b}
          onChange={handleInput("b")}
          placeholder={cfg.placeholderB}
          error={errors.b}
        />
      </div>

      {/* Optional clicks */}
      <div className="mb-5">
        <CalculatorInput
          id="cpm-clicks"
          label="Clicks"
          value={inputs.clicks}
          onChange={handleInput("clicks")}
          placeholder="e.g. 1600"
          optional
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
          { label: "CTR", value: result.metrics.ctr },
          { label: "CPC", value: result.metrics.cpc },
          { label: "eCPM × 1k", value: result.metrics.ecpm },
        ]}
      />
    </div>
  );
}
