import { WordmarkLogo } from "@/components/ui/WordmarkLogo";

export function Topbar() {
  return (
    <header className="flex h-[52px] flex-shrink-0 items-center justify-between border-b border-border bg-surface px-6">
      <WordmarkLogo />
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-muted-foreground">
          Ad Operations
        </span>
        <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-muted-foreground">
          Free
        </span>
      </div>
    </header>
  );
}
