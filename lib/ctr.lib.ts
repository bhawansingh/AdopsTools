import { fmtInt, fmtPct } from "./formatters";

export type CtrMode = "ctr" | "clicks" | "imps";

export interface CtrInputs {
  a: string;
  b: string;
}

export type MetricVariant = "default" | "positive" | "negative" | "empty";

export interface CtrResult {
  primaryLabel: string;
  primaryValue: string;
  primaryUnit: string;
  isEmpty: boolean;
  metrics: {
    per1k: string;
    benchmark: string;
    vs: string;
    vsVariant: MetricVariant;
  };
}

const CTR_BENCHMARK = 0.1; // 0.10%

const MODE_CONFIG: Record<
  CtrMode,
  { labelA: string; labelB: string; placeholderA: string; placeholderB: string; resultLabel: string }
> = {
  ctr: {
    labelA: "Clicks",
    labelB: "Impressions",
    placeholderA: "1600",
    placeholderB: "1000000",
    resultLabel: "CTR",
  },
  clicks: {
    labelA: "CTR (%)",
    labelB: "Impressions",
    placeholderA: "0.16",
    placeholderB: "1000000",
    resultLabel: "Clicks",
  },
  imps: {
    labelA: "Clicks",
    labelB: "CTR (%)",
    placeholderA: "1600",
    placeholderB: "0.16",
    resultLabel: "Impressions",
  },
};

export { MODE_CONFIG as CTR_MODE_CONFIG };

export function calcCtr(mode: CtrMode, inputs: CtrInputs): CtrResult {
  const a = parseFloat(inputs.a);
  const b = parseFloat(inputs.b);

  const aOk = isFinite(a) && a > 0;
  const bOk = isFinite(b) && b > 0;

  const primaryLabel = MODE_CONFIG[mode].resultLabel;

  if (!aOk || !bOk) {
    return {
      primaryLabel,
      primaryValue: "—",
      primaryUnit: "",
      isEmpty: true,
      metrics: {
        per1k: "—",
        benchmark: fmtPct(CTR_BENCHMARK),
        vs: "—",
        vsVariant: "empty",
      },
    };
  }

  let primaryValue: string;
  let primaryUnit: string;
  let ctrPct: number;

  if (mode === "ctr") {
    // CTR = (Clicks / Imps) * 100
    ctrPct = (a / b) * 100;
    primaryValue = fmtPct(ctrPct);
    primaryUnit = "CTR";
  } else if (mode === "clicks") {
    // Clicks = (CTR / 100) * Imps
    const result = (a / 100) * b;
    primaryValue = fmtInt(result);
    primaryUnit = "clicks";
    ctrPct = a;
  } else {
    // Imps = Clicks / (CTR / 100)
    const result = a / (b / 100);
    primaryValue = fmtInt(result);
    primaryUnit = "impressions";
    ctrPct = b;
  }

  const per1k = (ctrPct * 10).toFixed(1);
  const vs = ctrPct - CTR_BENCHMARK;
  const vsStr = (vs >= 0 ? "+" : "") + vs.toFixed(2) + "%";
  const vsVariant: MetricVariant = vs >= 0 ? "positive" : "negative";

  return {
    primaryLabel,
    primaryValue,
    primaryUnit,
    isEmpty: false,
    metrics: {
      per1k,
      benchmark: fmtPct(CTR_BENCHMARK),
      vs: vsStr,
      vsVariant,
    },
  };
}
