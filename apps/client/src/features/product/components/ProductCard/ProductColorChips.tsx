import { ColorChip } from "@/shared/ui/color-chip/ColorChip";

type PropductColorChipProps = {
  colors: string[];
};
export function ProductColorChips({ colors }: PropductColorChipProps) {
  const visibleColors = colors.slice(0, 7);
  return (
    <div className="flex gap-px">
      {visibleColors.map((color, index) => (
        <ColorChip key={index} color={color} />
      ))}
    </div>
  );
}
