"use client";

import { LayoutGrid, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";
import { WordmarkLogo } from "@/components/ui/WordmarkLogo";
import type { ToolMeta } from "@/lib/tools-registry";

// Map tool IDs to Lucide icons
const TOOL_ICONS: Record<string, React.ReactNode> = {
  cpm: <LayoutGrid size={16} />,
  ctr: <MousePointerClick size={16} />,
};

interface ToolSidebarProps {
  tools: ToolMeta[];
  activeTool: string;
  onSelect: (id: string) => void;
  isCollapsed: boolean;
}

export function ToolSidebar({
  tools,
  activeTool,
  onSelect,
  isCollapsed,
}: ToolSidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border h-full transition-[width] duration-200 overflow-hidden",
        // Desktop: collapsible width
        "max-md:flex-row max-md:w-full max-md:h-auto max-md:border-r-0 max-md:border-b max-md:border-sidebar-border",
        isCollapsed ? "md:w-14" : "md:w-60"
      )}
    >
      {/* ── HEADER ─────────────────────────────────── */}
      <div
        className={cn(
          "hidden md:flex h-[57px] flex-shrink-0 items-center border-b border-sidebar-border px-4",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {isCollapsed ? (
          <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-primary text-[11px] font-extrabold text-primary-foreground font-display">
            A
          </div>
        ) : (
          <>
            <WordmarkLogo />
            <span className="rounded-full border border-sidebar-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              v1
            </span>
          </>
        )}
      </div>

      {/* ── NAV CONTENT ────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-2 max-md:flex-row max-md:overflow-x-auto max-md:overflow-y-hidden max-md:py-0">
        {/* Section label — hidden when collapsed or on mobile */}
        {!isCollapsed && (
          <p className="hidden md:block px-4 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-sidebar-foreground/50">
            Calculators
          </p>
        )}

        {/* Nav items */}
        <nav className="flex flex-col gap-0.5 px-2 max-md:flex-row max-md:gap-1 max-md:px-2 max-md:py-2">
          {tools.map((tool) => {
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => onSelect(tool.id)}
                title={isCollapsed ? tool.label : undefined}
                className={cn(
                  "group flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm transition-colors duration-150 outline-none",
                  "max-md:w-auto max-md:flex-shrink-0 max-md:whitespace-nowrap",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <span className="flex-shrink-0 text-current">
                  {TOOL_ICONS[tool.id]}
                </span>
                {!isCollapsed && (
                  <span className="flex-1 truncate font-body text-[13px]">
                    {tool.label}
                  </span>
                )}
                {!isCollapsed && (
                  <kbd
                    className={cn(
                      "ml-auto hidden rounded border px-1 font-mono text-[9px] transition-opacity group-hover:flex",
                      isActive
                        ? "border-sidebar-accent-foreground/20 text-sidebar-accent-foreground/60"
                        : "border-sidebar-border text-sidebar-foreground/40"
                    )}
                  >
                    {tool.shortcut}
                  </kbd>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── FOOTER ─────────────────────────────────── */}
      {!isCollapsed && (
        <div className="hidden md:block border-t border-sidebar-border px-4 py-3.5">
          <p className="font-mono text-[10px] leading-relaxed text-sidebar-foreground/40">
            Free tools for
            <br />
            ad operations teams.
          </p>
        </div>
      )}
    </aside>
  );
}
