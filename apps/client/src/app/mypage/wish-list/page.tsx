import MypageTitle from "@/features/mypage/components/MypageTitle";
import WishlistGrid from "@/features/mypage/components/WishlistGrid";

export default async function MyPageWishList() {
  return (
    <section className="h-full">
      <MypageTitle title={"위시리스트"} />
      <WishlistGrid />
    </section>
  );
}
