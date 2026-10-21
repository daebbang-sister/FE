import MypageTitle from "@/features/mypage/components/MypageTitle";
import OrderHistoryDashboard from "@/features/mypage/components/OrderHistoryDashboard";
import OrderHistoryList from "@/features/mypage/components/OrderHistoryList";

export default function MyPageOrders() {
  return (
    <section className="h-full">
      <MypageTitle title={"주문조회"} />
      <OrderHistoryDashboard />
      <article className="h-[calc(100%-356px)]">
        <OrderHistoryList />
      </article>
    </section>
  );
}
