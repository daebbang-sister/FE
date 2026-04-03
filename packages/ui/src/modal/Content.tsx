import { cn } from "../lib/utils";

type ContentProps = {
  children: React.ReactNode;
  className?: string;
};
export function Content({ children, className }: ContentProps) {
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-transparent">
      <div
        className={cn(
          "bg-neutral-0 h-fit px-7.5 py-8.75 shadow-[0_0_16px_rgba(0,0,0,0.04)]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
