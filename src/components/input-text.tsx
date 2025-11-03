import type React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import Text from "./text";

export const InputTextVariants = tv({
  base: "border-b outline-none",
  variants: {
    size: {
      md: "pb-2 px-2",
    },
    disabled: {
      true: "pointer-events-none",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

interface InputTextProps
  extends VariantProps<typeof InputTextVariants>,
    Omit<React.ComponentProps<"input">, "size" | "disabled"> {
  error?: React.ReactNode;
}

export default function InputText({
  size,
  disabled,
  className,
  children,
  error,
  ...props
}: InputTextProps) {
  return (
    <div>
      <div className="flex flex-col">
        <Text variant="body-xxs-bold">{children}</Text>
        <input
          className={InputTextVariants({ size, disabled, className })}
          {...props}
        />
      </div>
      {error && (
        <Text variant="body-xs-bold" className="text-feedback-danger">
          {error}
        </Text>
      )}
    </div>
  );
}
