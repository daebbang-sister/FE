import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id"
> &
  VariantProps<typeof inputVariants> & {
    id: string;
    errorMessage?: string;
    helperMessage?: string;
  };

export const inputVariants = cva(
  "w-full px-3.5 py-4 border transition-all outline-none placeholder:text-text-disabled",
  {
    variants: {
      status: {
        default: "border-neutral-300 focus:border-border-focus ",
        disabled:
          "bg-neutral-200 border-neutral-300 text-text-disabled cursor-not-allowed",
        error: "border-danger-200",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

export function Input({
  id,
  className,
  status = "default",
  errorMessage,
  helperMessage,
  ...props
}: InputProps) {
  const helperId = helperMessage ? `${id}-helper` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const describedBy =
    [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="w-full">
      <input
        id={id}
        className={cn(inputVariants({ status }), className)}
        disabled={status === "disabled"}
        aria-invalid={status === "error"}
        aria-describedby={describedBy}
        {...props}
      />

      <div>
        {helperMessage && (
          <p id={helperId} className="mt-1.5 caption1 text-text-disabled">
            {helperMessage}
          </p>
        )}
        {errorMessage && (
          <p id={errorId} className="caption1 text-danger-200 mt-1.5">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
