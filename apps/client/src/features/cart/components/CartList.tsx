import { CartItem as CartItemType } from "@/features/cart/model";
import CartItem from "@/features/cart/ui/cart-item/CartItem";
import { useState } from "react";

type CartListType = {
  items: CartItemType[];
  onCheckItem: (id: string, checked: boolean) => void;
  onUpdateCart: (
    id: number,
    quantity: number,
    productDetailsId: number
  ) => void;
  onDeleteItem: (id: number) => void;
  onUpdateOption: (
    cartId: number,
    productDetailsId: number,
    color: string,
    size: string
  ) => void;
};

export default function CartList({
  items,
  onCheckItem,
  onUpdateCart,
  onDeleteItem,
  onUpdateOption,
}: CartListType) {
  const [openCartId, setOpenCartId] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-4">
      {items.length > 0 &&
        items.map((item) => (
          <CartItem
            key={item.cartId}
            productId={item.productId}
            imageUrl={item.mainImageUrl}
            id={String(item.cartId)}
            name={item.productName}
            size={item.size}
            color={item.color}
            sellingPrice={item.discountPrice}
            quantity={item.quantity}
            originalPrice={item.originalPrice}
            discountRate={item.discountRate}
            setQuantity={(q) => onUpdateCart(item.cartId, q, item.productId)}
            checked={item.checked}
            onCheckedChange={onCheckItem}
            onDeleteItem={() => onDeleteItem(item.cartId)}
            onUpdateOption={() => setOpenCartId(item.cartId)}
            isOpen={openCartId === item.cartId}
            onClose={() => setOpenCartId(null)}
            onConfirmOption={(productDetailId, color, size) =>
              onUpdateOption(item.cartId, productDetailId, color, size)
            }
          />
        ))}
    </div>
  );
}
