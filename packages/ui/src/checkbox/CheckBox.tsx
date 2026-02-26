"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const checkboxVariants = cva(
  "peer shrink-0 border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:cursor-not-allowed",
  {
    variants: {
      status: {
        default: [
          "relative border-neutral-300 checked:bg-black checked:border-black",
          "disabled:bg-neutral-200 disabled:border-neutral-200 disabled:checked:bg-neutral-200",
        ].join(" "),
      },
      size: {
        M: "h-4 w-4",
      },
    },
    defaultVariants: {
      status: "default",
      size: "M",
    },
  }
);

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "type"
> &
  VariantProps<typeof checkboxVariants> & {
    id: string;
  };

export function CheckBox({ id, className, ...props }: CheckboxProps) {
  return (
    <div className="relative flex items-center justify-center w-fit">
      <input
        type="checkbox"
        id={id}
        className={cn(checkboxVariants(), "peer", className)}
        {...props}
      />
      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        className="
          absolute 
          left-1/2 top-1/2 z-1
          -translate-x-1/2 -translate-y-1/2 
          hidden peer-checked:block peer-disabled:opacity-50 pointer-events-none 
        stroke-brand-700 fill-brand-700
          peer-disabled:stroke-neutral-400 peer-disabled:fill-neutral-400
        "
      >
        <path d="M3.08714 6.46521L1.01611 4.25765C0.783348 4.00954 0.407341 4.00954 0.174575 4.25765C-0.0581916 4.50576 -0.0581916 4.90656 0.174575 5.15467L2.66935 7.81392C2.90212 8.06203 3.27813 8.06203 3.51089 7.81392L9.82543 1.0831C10.0582 0.83499 10.0582 0.434195 9.82543 0.186083C9.59266 -0.0620278 9.21665 -0.0620278 8.98388 0.186083L3.08714 6.46521Z" />
      </svg>
    </div>
  );
}
