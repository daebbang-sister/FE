import MypageTitle from "@/features/mypage/components/MypageTitle";
import OrderHistoryDashboard from "@/features/mypage/components/OrderHistoryDashboard";
import OrderHistoryList from "@/features/mypage/components/OrderHistoryList";

export default function MyPageOrders() {
  return (
    <section>
      <MypageTitle title={"주문조회"} />
      <OrderHistoryDashboard />
      <OrderHistoryList />
    </section>
  );
}
