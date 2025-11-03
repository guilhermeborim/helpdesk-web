import type React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";

export const ButtonVariants = tv({
  base: "cursor-pointer inline-flex items-center justify-start py-2.5 px-4 rounded gap-2",
  variants: {
    variant: {
      primary: "bg-gray-200",
      secondary: "bg-gray-500",
      link: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const ButtonTextVariants = tv({
  variants: {
    variant: {
      primary: "text-gray-600",
      secondary: "text-gray-200",
      link: "text-gray-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const ButtonIconVariants = tv({
  base: "w-4 h-4",
  variants: {
    variant: {
      primary: "fill-gray-600",
      secondary: "fill-gray-200",
      link: "fill-gray-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  href?: string;
  children?: React.ReactNode;
  icon: React.ComponentProps<typeof Icon>["svg"];
}

export default function ButtonIcon({
  icon,
  variant,
  className,
  children,
  ...props
}: ButtonIconProps) {
  return (
    <button className={ButtonVariants({ variant })} {...props}>
      <Icon svg={icon} className={ButtonIconVariants({ variant, className })} />
      {children && (
        <Text variant="body-sm" className={ButtonTextVariants({ variant })}>
          {children}
        </Text>
      )}
    </button>
  );
}
