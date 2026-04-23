import MypageTitle from "@/features/mypage/components/MypageTitle";
import PointsHistoryDashboard from "@/features/mypage/components/PointsHistoryDashboard";
import PointsHistoryList from "@/features/mypage/components/PointsHistoryList";

export default function MyPagePoints() {
  return (
    <section>
      <MypageTitle title={"적립금"} />
      <PointsHistoryDashboard />
      <PointsHistoryList />
      {/* <PageLinkButton></PageLinkButton> */}
    </section>
  );
}
