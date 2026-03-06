import { cn } from "@repo/ui";

type ColorChipProps = {
  color: string;
};

export function ColorChip({ color }: ColorChipProps) {
  return (
    <span
      className={cn(
        "inline-flex box-border w-2 h-2 rounded-full border border-border-default "
      )}
      style={{ backgroundColor: color }}
    ></span>
  );
}
