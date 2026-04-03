"use client";

import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TOOLS } from "@/lib/tools-registry";
import { Topbar } from "./Topbar";
import { ToolSidebar } from "./ToolSidebar";
import { CpmCalculator } from "@/components/tools/cpm/CpmCalculator";
import { CtrCalculator } from "@/components/tools/ctr/CtrCalculator";

function renderTool(toolId: string) {
  switch (toolId) {
    case "ctr":
      return <CtrCalculator />;
    case "cpm":
    default:
      return <CpmCalculator />;
  }
}

export function AppShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toolParam = searchParams.get("tool");
  const activeTool =
    TOOLS.find((t) => t.id === toolParam)?.id ?? TOOLS[0].id;

  const selectTool = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tool", id);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Ignore when focus is in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      const tool = TOOLS.find((t) => t.shortcut === e.key);
      if (tool) selectTool(tool.id);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectTool]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Topbar />
      <div className="flex flex-1 overflow-hidden max-md:flex-col">
        {/* Sidebar — 33% on desktop, horizontal strip on mobile */}
        <div className="w-[33%] min-w-[220px] max-w-[320px] flex-shrink-0 overflow-y-auto max-md:w-full max-md:max-w-full max-md:overflow-x-auto max-md:overflow-y-hidden">
          <ToolSidebar
            tools={TOOLS}
            activeTool={activeTool}
            onSelect={selectTool}
          />
        </div>
        {/* Main panel */}
        <main className="flex-1 overflow-y-auto bg-background">
          {renderTool(activeTool)}
        </main>
      </div>
    </div>
  );
}
