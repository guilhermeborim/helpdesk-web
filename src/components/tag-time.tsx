import type React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";

export const TagTimeVariants = tv({
  base: "inline-flex items-center justify-center rounded-full p-1.5 h-7 gap-1",
  variants: {
    variant: {
      default: "border border-gray-400",
      selected: "bg-blue-base border-none",
      read: "border border-gray-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const TagsTextVariants = tv({
  variants: {
    variant: {
      default: "text-gray-200",
      selected: "text-gray-600",
      read: "text-gray-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const TagsIconVariants = tv({
  base: "w-3.5 h-3.5",
  variants: {
    variant: {
      default: "",
      selected: "fill-gray-600",
      read: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TagTimeProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof TagTimeVariants> {
  icon?: React.ComponentProps<typeof Icon>["svg"];
  loading?: boolean;
}

export default function TagTime({
  variant,
  className,
  children,
  icon,
  ...props
}: TagTimeProps) {
  return (
    <div className={TagTimeVariants({ variant, className })} {...props}>
      {icon && <Icon svg={icon} className={TagsIconVariants({ variant })} />}
      {children && (
        <Text variant="body-xs-bold" className={TagsTextVariants({ variant })}>
          {children}
        </Text>
      )}
    </div>
  );
}
