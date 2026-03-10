type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  return <div>{category} 카테고리 페이지</div>;
}
