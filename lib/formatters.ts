export function fmtDollar(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "—";
  return (
    "$" +
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function fmtInt(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "—";
  return Math.round(n).toLocaleString("en-US");
}

export function fmtPct(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "—";
  return n.toFixed(2) + "%";
}

export function fmtNum(n: number, decimals = 2): string {
  if (!isFinite(n) || isNaN(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
