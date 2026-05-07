import MypageTitle from "@/features/mypage/components/MypageTitle";
import ReviewList from "@/features/mypage/components/ReviewList";

export default function MyPageReview() {
  return (
    <section className="h-full">
      <MypageTitle title={"상품리뷰"} />
      <ReviewList />
    </section>
  );
}
