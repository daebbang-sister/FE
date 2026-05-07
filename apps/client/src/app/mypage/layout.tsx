import MypageAuthGuard from "@/features/mypage/components/MypageAuthGuard";
import MypageSideNav from "@/features/mypage/components/MypageSideNav";

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MypageAuthGuard>
      <section className="container gap-13.5 py-15.75 md:grid md:grid-cols-[1fr_776px]">
        <article className="md:sticky md:top-40.75 md:self-start">
          <MypageSideNav />
        </article>
        <article>{children}</article>
      </section>
    </MypageAuthGuard>
  );
}
