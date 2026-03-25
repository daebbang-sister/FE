"use client";

import { useState } from "react";

export function Quantity() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex gap-3 p-2.5">
      <button
        onClick={handleDecrease}
        disabled={quantity === 1}
        className="disabled:text-text-disabled"
      >
        -
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
}
