export interface ToolMeta {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
  shortcut: string;
}

export const TOOLS: ToolMeta[] = [
  {
    id: "cpm",
    label: "CPM / eCPM Calculator",
    shortLabel: "CPM / eCPM",
    icon: "⊞",
    description: "Calculate cost per thousand impressions, or solve for any missing variable.",
    shortcut: "1",
  },
  {
    id: "ctr",
    label: "CTR Calculator",
    shortLabel: "CTR",
    icon: "▷",
    description: "Calculate click-through rate, or solve for clicks or impressions.",
    shortcut: "2",
  },
];
