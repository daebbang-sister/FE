import { cn } from "@repo/ui";
type AuthInputLabelProps = React.ComponentProps<"label"> & {
  required?: boolean;
};

export default function AuthInputLabel({
  children,
  className,
  required = false,
  ...props
}: AuthInputLabelProps) {
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
