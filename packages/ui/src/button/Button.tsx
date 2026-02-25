import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center p-4 text-text-primary body1",
  {
    variants: {
      variant: {
        stroke: "border border-border-default hover:border-text-primary",
        white:
          "bg-neutral-0 border border-border-default hover:bg-text-primary hover:text-neutral-0",
        gray: "bg-neutral-300 hover:bg-text-primary hover:text-neutral-0",
        black: "bg-text-primary text-neutral-0",
      },
    },
    defaultVariants: {
      variant: "white",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), "w-full", className)}
      {...props}
    />
  );
}
