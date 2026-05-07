import MypageTitle from "@/features/mypage/components/MypageTitle";
import ProfileForm from "@/features/mypage/components/ProfileForm";

export default function MyPageProfile() {
  return (
    <section>
      <MypageTitle title={"회원정보 수정"} />
      <ProfileForm />
    </section>
  );
}
