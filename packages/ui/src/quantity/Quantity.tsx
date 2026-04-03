"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
type QuantityProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
};

export function Quantity({ value, onChange, min, max }: QuantityProps) {
  const intValue = Math.round(value);
  const intMin = Math.round(min);
  const intMax = Math.round(max);

  useEffect(() => {
    if (intValue < intMin) onChange(intMin);
    else if (intValue > intMax) onChange(intMax);
  }, [intValue, intMin, intMax, onChange]);

  const handleDecrease = () => {
    if (intValue > intMin) {
      onChange(intValue - 1);
    }
  };
  const handleIncrease = () => {
    if (intValue < intMax) {
      onChange(intValue + 1);
    }
  };

  return (
    <div className="bg-neutral-0 flex items-center gap-0.5">
      <button
        onClick={handleDecrease}
        disabled={intValue === intMin}
        className="text-text-primary disabled:text-text-disabled p-2.5"
      >
        <MinusIcon className="h-3 w-3" />
      </button>
      <span className="caption1 leading-none">
        {intValue.toString().padStart(2, "0")}
      </span>
      <button
        disabled={intValue === intMax}
        onClick={handleIncrease}
        className="text-text-primary disabled:text-text-disabled p-2.5"
      >
        <PlusIcon className="h-3 w-3" />
      </button>
    </div>
  );
}
