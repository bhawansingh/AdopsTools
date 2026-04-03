import { cn } from "@/lib/utils";

interface WordmarkLogoProps {
  className?: string;
}

export function WordmarkLogo({ className }: WordmarkLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-accent text-[11px] font-extrabold text-black font-display">
        A
      </div>
      <span className="font-display text-[15px] font-extrabold tracking-tight text-foreground">
        adop.tools
      </span>
    </div>
  );
}
