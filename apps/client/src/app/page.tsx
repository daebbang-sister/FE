import BestProducts from "@/features/home/components/BestProducts";
import BottomProducts from "@/features/home/components/BottomProducts";
import MainBanner from "@/features/home/components/MainBanner";
import NewProducts from "@/features/home/components/NewProducts";
import TopProducts from "@/features/home/components/TopProducts";

export default function Page() {
  return (
    <section className="w-full">
      <MainBanner />
      <div className="container-wide mt-36 mb-36 space-y-36">
        <NewProducts />
        <BestProducts />
        <TopProducts />
        <BottomProducts />
      </div>
    </section>
  );
}
