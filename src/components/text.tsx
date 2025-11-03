import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const TextVariants = tv({
  base: "font-sans text-gray-200 ",
  variants: {
    variant: {
      "body-xl-bold": "text-2xl leading-5 font-bold",
      "body-lg-bold": "text-xl leading-5 font-bold",
      "body-md": "text-base leading-6 font-normal",
      "body-md-bold": "text-base leading-6 font-bold",
      "body-sm": "text-sm leading-6 font-normal",
      "body-sm-bold": "text-sm leading-6 font-bold",
      "body-xs": "text-xs font-normal",
      "body-xs-bold": "text-xs leading-6 font-bold",
      "body-xxs-bold": "text-[10px] leading-6 font-bold uppercase",
    },
  },
  defaultVariants: {
    variant: "body-md",
  },
});

interface TextProps extends VariantProps<typeof TextVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  as = "span",
  variant,
  children,
  className,
  ...props
}: TextProps) {
  return React.createElement(
    as,
    {
      className: TextVariants({ variant, className }),
      ...props,
    },
    children
  );
}
