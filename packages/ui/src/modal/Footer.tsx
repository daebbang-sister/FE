import { cn } from "../lib/utils";

type FooterProps = {
  children: React.ReactNode;
  className?: string;
};
export function Footer({ children, className }: FooterProps) {
  return <div className={cn("mt-9", className)}>{children}</div>;
}
