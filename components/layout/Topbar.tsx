"use client";

import { PanelLeft, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import type { ToolMeta } from "@/lib/tools-registry";

interface TopbarProps {
  activeTool: ToolMeta | undefined;
  onToggleCollapse: () => void;
}

export function Topbar({ activeTool, onToggleCollapse }: TopbarProps) {
  return (
    <header className="flex h-[57px] flex-shrink-0 items-center justify-between border-b border-border bg-background px-4">
      {/* Left: collapse toggle + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleCollapse}
          aria-label="Toggle sidebar"
          className={cn(
            "hidden md:flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          )}
        >
          <PanelLeft size={14} />
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 font-body text-sm">
          <span className="text-muted-foreground">adop.tools</span>
          {activeTool && (
            <>
              <ChevronRight size={13} className="text-muted-foreground/50" />
              <span className="font-medium text-foreground">
                {activeTool.label}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* Right: theme toggle + badges */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="hidden sm:flex items-center gap-2">
          <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-muted-foreground">
            Ad Operations
          </span>
          <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-muted-foreground">
            Free
          </span>
        </div>
      </div>
    </header>
  );
}
