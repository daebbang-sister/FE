import { Button, Input } from "@repo/ui";
import { useCheckoutPoints } from "@/features/checkout/hooks/useCheckoutPoints";
import { z } from "zod";
import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type FormData = z.infer<typeof checkoutSchema>;

type CheckoutPointsProps = {
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
};

export default function CheckoutPoints({
  setValue,
  watch,
}: CheckoutPointsProps) {
  const { availablePoints, usedPoints, handleUseAllPoints, handlePointsInput } =
    useCheckoutPoints({ setValue, watch });

  return (
    <div>
      <h6 className="title3 mb-6">적립금</h6>

      <div className="mb-2.5 flex gap-2.5">
        <Input
          id="points-to-use"
          type="number"
          value={usedPoints === 0 ? "" : String(usedPoints)}
          onChange={handlePointsInput}
        />
        <Button
          type="button"
          variant="black"
          className="w-22.5 shrink-0"
          onClick={handleUseAllPoints}
        >
          전체 사용
        </Button>
      </div>

      <p className="caption1 text-text-disabled">
        보유 적립금 : {availablePoints.toLocaleString()}원
      </p>
    </div>
  );
}
