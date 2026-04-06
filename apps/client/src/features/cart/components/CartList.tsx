import { CartItem as CartItemType } from "@/features/cart/model";
import CartItem from "@/features/cart/ui/cart-item/CartItem";
type CartListType = {
  items: CartItemType[];
  onCheckItem: (id: string, checked: boolean) => void;
  onUpdateCart: (id: number, quantity: number) => void;
  onDeleteItem: (id: number) => void;
};
export default function CartList({
  items,
  onCheckItem,
  onUpdateCart,
  onDeleteItem,
}: CartListType) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        return (
          <CartItem
            key={item.cartId}
            id={String(item.cartId)}
            name={item.productName}
            option={item.size}
            sellingPrice={item.discountPrice}
            quantity={item.quantity}
            originalPrice={item.originalPrice}
            discountRate={item.discountRate}
            setQuantity={(q) => onUpdateCart(item.cartId, q)}
            checked={item.checked}
            onCheckedChange={onCheckItem}
            onDeleteItem={() => onDeleteItem(item.cartId)}
          />
        );
      })}
    </div>
  );
}
