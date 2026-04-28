import Link from "next/link";

type Post = {
  id: number;
  title: string;
  author: string;
  createdAt: string;
};
type Props = {
  data: Post[];
  query: string;
};

export default function BoardTable({ data, query }: Props) {
  return (
    <table className="mt-18 w-full table-fixed text-center">
      <thead className="body1 bg-neutral-100">
        <tr className="[&>th]:py-4 [&>th]:font-normal">
          <th className="w-15 md:w-20">번호</th>
          <th className="w-auto">제목</th>
          <th className="w-20 md:w-30">작성자</th>
          <th className="w-30">작성일</th>
        </tr>
      </thead>

      <tbody className="body2">
        {data.map((post, index) => (
          <tr className="border-b border-neutral-300 [&>td]:py-4" key={post.id}>
            <td>{index + 1}</td>
            <td className="w-220 truncate text-left">
              <Link href={`/${query}/${post.id}`}>{post.title}</Link>
            </td>
            <td>{post.author}</td>
            <td>{post.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
