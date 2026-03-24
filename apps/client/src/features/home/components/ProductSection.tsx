import ProductGrid from "@/features/home/components/ProductGrid";
import SectionLayout from "@/features/home/components/SectionLayout";
import { MainProduct } from "@/features/home/model";

type Props = {
  title: string;
  moreLink: string;
  description?: string;
  products: MainProduct[];
};

export default function ProductSection({
  title,
  description,
  moreLink,
  products,
}: Props) {
  return (
    <SectionLayout title={title} moreLink={moreLink} description={description}>
      <ProductGrid products={products} />
    </SectionLayout>
  );
}
