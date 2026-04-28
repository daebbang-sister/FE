import PageLoading from "@/shared/components/layout/PageLoading";

export default function Loading() {
  return (
    <section className="min-h-[calc(100vh-var(--size-header-h)-var(--size-footer-h))]">
      <PageLoading />
    </section>
  );
}
