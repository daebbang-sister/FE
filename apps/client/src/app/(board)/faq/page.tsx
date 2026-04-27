import SearchInput from "@/shared/ui/input/SearchInput";

export default function FaqPage() {
  return (
    <section className="container-wide">
      <article className="w-full">
        <h2 className="title2 flex justify-center pt-17 pb-9">
          자주 묻는 질문
        </h2>
        <SearchInput value={"검생어"}></SearchInput>
      </article>
    </section>
  );
}
