import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui";

const discountRateVariants = cva(
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

type DiscountRateProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof discountRateVariants>;

export function DiscountRate({
  children,
  className,
  size,
  ...props
}: DiscountRateProps) {
  return (
    <span className={cn(discountRateVariants({ size }), className)} {...props}>
      {children}
    </span>
  );
}
