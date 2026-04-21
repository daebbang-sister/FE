import MypageSideNav from "@/features/mypage/components/MypageSideNav";

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const user = await fetchGetUser();
  //   console.log(user);

  return (
    <section className="container gap-13.5 py-15.75 md:grid md:grid-cols-[1fr_776px]">
      <MypageSideNav />
      <article>{children}</article>
    </section>
  );
}
