// import { getWishList } from "@/features/mypage/api";
import MypageTitle from "@/features/mypage/components/MypageTitle";
import WishlistGrid from "@/features/mypage/components/WishlistGrid";

export default async function MyPageWishList() {
  // const products = await getWishList();

  const mockWishList = {
    content: [
      {
        wishListId: 1,
        productId: 1,
        productName: "베이직 오버핏 반팔 티셔츠",
        mainImageUrl: "/images/fallback.jpg",
        originalPrice: 29000,
        sellingPrice: 19900,
        discountRate: 30,
      },
      {
        wishListId: 2,
        productId: 2,
        productName: "데일리 와이드 슬랙스",
        mainImageUrl: "/images/fallback.jpg",
        originalPrice: 49000,
        sellingPrice: 49000,
        discountRate: null,
      },
      {
        wishListId: 3,
        productId: 3,
        productName: "스트라이프 셔츠",
        mainImageUrl: "/images/fallback.jpg",
        originalPrice: 39000,
        sellingPrice: 29900,
        discountRate: 20,
      },
    ],
    pageNumber: 0,
    pageSize: 10,
    totalElements: 3,
    totalPages: 1,
    last: true,
  };

  return (
    <section>
      <MypageTitle title={"위시리스트"} />
      <WishlistGrid products={mockWishList.content} />
    </section>
  );
}
