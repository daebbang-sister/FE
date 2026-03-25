import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
type QuantityProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
};

export function Quantity({ value, onChange, min, max }: QuantityProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };
  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={handleDecrease}
        disabled={value === min}
        className="text-text-primary disabled:text-text-disabled p-2.5"
      >
        <MinusIcon className="h-3 w-3" />
      </button>
      <span className="caption1 leading-none">
        {value.toString().padStart(2, "0")}
      </span>
      <button
        disabled={value === max}
        onClick={handleIncrease}
        className="text-text-primary disabled:text-text-disabled p-2.5"
      >
        <PlusIcon className="h-3 w-3" />
      </button>
    </div>
  );
}
