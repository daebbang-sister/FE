type Props = {
  params: Promise<{
    category: string;
    productId: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { category, productId } = await params;

  return (
    <div>
      <p>category: {category}</p>
      <p>productId: {productId}</p>
    </div>
  );
}
