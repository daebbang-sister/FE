import { cn } from "@repo/ui";

type ColorChipProps = {
  color: string;
};

export function ColorChip({ color }: ColorChipProps) {
  return (
    <span
      className={cn(
        "border-border-default box-border inline-flex h-2 w-2 rounded-full border"
      )}
      style={{ backgroundColor: color }}
    ></span>
  );
}
