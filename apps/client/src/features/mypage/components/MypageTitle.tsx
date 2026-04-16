type Props = {
  title: string;
};
export default function MypageTitle({ title }: Props) {
  return <h2 className="title2 mb-6">{title}</h2>;
}
