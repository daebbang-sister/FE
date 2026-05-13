import { cn } from "../lib/utils";

type ContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function Content({ children, className }: ContentProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-999 container flex items-center justify-center bg-transparent"
    >
      <div
        className={cn(
          "bg-neutral-0 h-fit max-h-[90vh] overflow-y-auto px-5 py-5 shadow-[0_0_16px_rgba(0,0,0,0.04)] lg:px-7.5 lg:py-8.75",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
