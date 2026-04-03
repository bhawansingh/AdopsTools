"use client";

import { cn } from "@/lib/utils";
import type { ToolMeta } from "@/lib/tools-registry";

interface ToolSidebarProps {
  tools: ToolMeta[];
  activeTool: string;
  onSelect: (id: string) => void;
}

export function ToolSidebar({ tools, activeTool, onSelect }: ToolSidebarProps) {
  return (
    <aside className="flex flex-col border-r border-border bg-surface">
      {/* Header — hidden on mobile */}
      <div className="hidden border-b border-border px-[18px] py-[18px] pb-3 md:flex md:items-center md:justify-between">
        <span className="font-display text-[13px] font-extrabold tracking-tight text-foreground">
          adop.tools
        </span>
        <span className="rounded-full border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          v1
        </span>
      </div>

      {/* Section label — hidden on mobile */}
      <p className="hidden px-[18px] pb-1.5 pt-3.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground md:block">
        Calculators
      </p>

      {/* Tool nav */}
      <nav className="flex flex-col md:flex-row md:flex-wrap">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => onSelect(tool.id)}
              className={cn(
                "group flex w-full items-center gap-2.5 border-l-2 px-[18px] py-3 text-left font-body text-[13px] transition-all duration-150",
                "md:w-auto md:border-l-0 md:border-b-2 md:px-3.5 md:py-2 md:whitespace-nowrap",
                isActive
                  ? "border-accent bg-accent-dim text-accent"
                  : "border-transparent text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
              )}
            >
              <span className="w-[18px] text-center text-sm flex-shrink-0">
                {tool.icon}
              </span>
              <span className="flex-1 md:hidden">{tool.label}</span>
              <span className="hidden md:inline">{tool.shortLabel}</span>
              <span className="ml-auto text-xs opacity-0 transition-opacity group-hover:opacity-100 md:hidden">
                →
              </span>
              <kbd className="ml-auto hidden rounded border border-border bg-card px-1 font-mono text-[9px] text-subtle md:group-hover:inline-block">
                {tool.shortcut}
              </kbd>
            </button>
          );
        })}
      </nav>

      {/* Footer — hidden on mobile */}
      <div className="mt-auto hidden border-t border-border px-[18px] py-3.5 md:block">
        <p className="font-mono text-[10px] leading-relaxed text-subtle">
          Free tools for
          <br />
          ad operations teams.
        </p>
      </div>
    </aside>
  );
}
