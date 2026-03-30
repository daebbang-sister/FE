"use client";
import { Quantity } from "@repo/ui";
import { useState } from "react";

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <Quantity value={quantity} onChange={setQuantity} min={1} max={99} />
    </div>
  );
}
