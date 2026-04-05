type FooterProps = {
  children: React.ReactNode;
};
export function Footer({ children }: FooterProps) {
  return <div className="mt-9">{children}</div>;
}
