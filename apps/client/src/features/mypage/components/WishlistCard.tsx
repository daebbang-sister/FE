import Link from "next/link";
import { DiscountRate } from "@/shared/ui/discount-rate/DiscountRate";
import { Button, CheckBox } from "@repo/ui";
import Image from "next/image";

type ProductCardProps = {
  wishListId: number;
  productId: number;
  mainImageUrl: string;
  productName: string;
  originalPrice: string;
  salePrice?: string;
  discount?: string;
};

export default function WishlistCard({
  wishListId,
  productId,
  mainImageUrl,
  productName,
  originalPrice,
  salePrice,
  discount,
}: ProductCardProps) {
  return (
    <div className="relative flex flex-col gap-7">
      <div className="absolute top-1.5 left-1.5 z-100">
        <CheckBox id="" />
      </div>

      <Link
        href={`/products/wish-list/${productId}`}
        className="group block cursor-pointer"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={mainImageUrl}
            fill
            alt={productName}
            sizes="10vw"
            className="object-cover object-center"
          />
        </div>
        <h3 className="mt-6 mb-4 truncate">{productName}</h3>

        {salePrice ? (
          <div>
            <p className="caption1 text-text-disabled mb-1.5 line-through">
              {originalPrice}
            </p>
            <div className="flex items-center gap-1.25">
              <p className="caption1">{salePrice}</p>
              <DiscountRate>{discount}</DiscountRate>
            </div>
          </div>
        ) : (
          <div>
            <p className="caption1">{originalPrice}</p>
          </div>
        )}
      </Link>

      <Button className="mt-auto">장바구니 담기</Button>
    </div>
  );
}
