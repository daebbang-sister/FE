import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui";

const badgeVariants = cva(
  "bg-text-primary text-brand-700 rounded-xl inline-flex items-center",
  {
    variants: {
      size: {
        base: "caption2 py-0.25 px-1 tracking-wide",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ children, className, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ size }), className)} {...props}>
      {children}
    </span>
  );
}
