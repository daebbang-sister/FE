import Image from "next/image";

export default function PageLoading() {
  return (
    <section className="container-wide flex h-full flex-col items-center justify-center">
      <Image src="/loading.gif" alt="로딩 중" width={50} height={50} />
    </section>
  );
}
