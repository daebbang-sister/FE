import { CheckBox } from "@repo/ui";
import WishlistCard from "./WishlistCard";

type WishListItem = {
  wishListId: number;
  productId: number;
  productName: string;
  mainImageUrl: string;
  originalPrice: number;
  sellingPrice: number;
  discountRate: number | null;
};

type Props = {
  products: WishListItem[];
};

export default function WishlistGrid({ products }: Props) {
  return (
    <>
      <article className="border-text-primary body2 mb-4 flex items-center justify-between border-b py-4">
        <div className="flex items-center gap-3">
          <CheckBox
            id="allWishList"
            // checked={}
            // onChange={(e) => handleAllWhishList()}
          />
          <label>전체 선택</label>
        </div>

        <ul className="text-text-disabled flex items-center gap-3">
          <li className="hover:text-text-primary cursor-pointer">선택 삭제</li>
          <li className="hover:text-text-primary cursor-pointer">전체 삭제</li>
        </ul>
      </article>

      <article className="grid grid-cols-3 gap-5">
        {products.map((product) => {
          return (
            <WishlistCard
              key={product.wishListId}
              wishListId={product.wishListId}
              productId={product.productId}
              productName={product.productName}
              mainImageUrl={product.mainImageUrl}
              originalPrice={`${product.originalPrice.toLocaleString()}원`}
              salePrice={
                product.discountRate !== null
                  ? `${product.sellingPrice.toLocaleString()}원`
                  : undefined
              }
              discount={
                product.discountRate !== null
                  ? `${product.discountRate}%`
                  : undefined
              }
            />
          );
        })}
      </article>
    </>
  );
}
