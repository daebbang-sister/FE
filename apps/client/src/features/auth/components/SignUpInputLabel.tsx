import { cn } from "@repo/ui";
type SignUpInputLabelProps = React.ComponentProps<"label"> & {
  required?: boolean;
};

export default function SignUpInputLabel({
  children,
  className,
  required = false,
  ...props
}: SignUpInputLabelProps) {
  return (
    <label
      className={cn("body1 text-text-primary mb-3 block", className)}
      {...props}
    >
      {children}{" "}
      {required && (
        <span className="text-danger-200" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
