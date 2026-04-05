import { cn } from "../lib/utils";

type BodyProps = {
  children: React.ReactNode;
  className?: string;
};
export function Body({ children, className }: BodyProps) {
  return <div className={cn("", className)}>{children}</div>;
}
