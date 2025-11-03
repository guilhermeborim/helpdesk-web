import { tv, type VariantProps } from "tailwind-variants";
import Text from "./text";

export const ButtonVariants = tv({
  base: "rounded w-full py-2.5 cursor-pointer",
  variants: {
    variant: {
      primary: "bg-gray-200",
      secondary: "bg-gray-500",
    },
    disabled: {
      true: "pointer-events-none opacity-50",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    disabled: false,
  },
});

export const ButtonTextVariants = tv({
  variants: {
    variant: {
      primary: "text-gray-600",
      secondary: "text-gray-200",
    },
  },
});

export interface ButtonProps
  extends VariantProps<typeof ButtonVariants>,
    Omit<React.ComponentProps<"button">, "disabled"> {}

export default function Button({
  variant,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <div className="w-full">
      <button className={ButtonVariants({ disabled, variant })} {...props}>
        <Text
          className={ButtonTextVariants({ variant })}
          variant="body-sm-bold"
        >
          {children}
        </Text>
      </button>
    </div>
  );
}
