import { fmtDollar, fmtInt, fmtPct } from "./formatters";

export type CpmMode = "cpm" | "cost" | "imps";

export interface CpmInputs {
  a: string;
  b: string;
  clicks: string;
}

export interface CpmResult {
  primaryLabel: string;
  primaryValue: string;
  primaryUnit: string;
  isEmpty: boolean;
  metrics: {
    ctr: string;
    cpc: string;
    ecpm: string;
  };
}

const MODE_CONFIG: Record<
  CpmMode,
  { labelA: string; labelB: string; placeholderA: string; placeholderB: string; resultLabel: string }
> = {
  cpm: {
    labelA: "Total Cost ($)",
    labelB: "Impressions",
    placeholderA: "2500.00",
    placeholderB: "1000000",
    resultLabel: "CPM",
  },
  cost: {
    labelA: "CPM ($)",
    labelB: "Impressions",
    placeholderA: "2.50",
    placeholderB: "1000000",
    resultLabel: "Total Cost",
  },
  imps: {
    labelA: "Total Cost ($)",
    labelB: "CPM ($)",
    placeholderA: "2500.00",
    placeholderB: "2.50",
    resultLabel: "Impressions",
  },
};

export { MODE_CONFIG as CPM_MODE_CONFIG };

export function calcCpm(mode: CpmMode, inputs: CpmInputs): CpmResult {
  const a = parseFloat(inputs.a);
  const b = parseFloat(inputs.b);
  const clicks = parseFloat(inputs.clicks);

  const aOk = isFinite(a) && a > 0;
  const bOk = isFinite(b) && b > 0;
  const clicksOk = isFinite(clicks) && clicks > 0;

  const primaryLabel = MODE_CONFIG[mode].resultLabel;

  if (!aOk || !bOk) {
    return {
      primaryLabel,
      primaryValue: "—",
      primaryUnit: "",
      isEmpty: true,
      metrics: { ctr: "—", cpc: "—", ecpm: "—" },
    };
  }

  let primaryValue: string;
  let primaryUnit: string;
  let impsForCalc: number;
  let costForCalc: number;
  let cpmVal: number;

  if (mode === "cpm") {
    // CPM = (Cost / Imps) * 1000
    const result = (a / b) * 1000;
    primaryValue = fmtDollar(result);
    primaryUnit = "CPM";
    cpmVal = result;
    impsForCalc = b;
    costForCalc = a;
  } else if (mode === "cost") {
    // Cost = (CPM / 1000) * Imps
    const result = (a / 1000) * b;
    primaryValue = fmtDollar(result);
    primaryUnit = "total";
    cpmVal = a;
    impsForCalc = b;
    costForCalc = result;
  } else {
    // Imps = (Cost / CPM) * 1000
    const result = (a / b) * 1000;
    primaryValue = fmtInt(result);
    primaryUnit = "impressions";
    cpmVal = b;
    impsForCalc = result;
    costForCalc = a;
  }

  const ctr =
    clicksOk && impsForCalc > 0
      ? fmtPct((clicks / impsForCalc) * 100)
      : "—";

  const cpc =
    clicksOk && costForCalc > 0
      ? fmtDollar(costForCalc / clicks)
      : "—";

  const ecpm = isFinite(cpmVal) ? fmtDollar(cpmVal * 1000) : "—";

  return {
    primaryLabel,
    primaryValue,
    primaryUnit,
    isEmpty: false,
    metrics: { ctr, cpc, ecpm },
  };
}
