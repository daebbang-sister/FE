export function Header({ title }: { title: string }) {
  return <div>{title && <h6 className="title3 mb-6">{title}</h6>}</div>;
}
