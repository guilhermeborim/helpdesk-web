import type React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";

export const TagsVariants = tv({
  base: "inline-flex items-center justify-center rounded-full p-2 h-7 gap-1",
  variants: {
    variant: {
      none: "",
      new: "bg-feedback-open/20",
      info: "bg-feedback-progress/20",
      success: "bg-feedback-done/20",
      danger: "bg-feedback-danger/20",
    },
  },
  defaultVariants: {
    variant: "new",
  },
});

export const TagsTextVariants = tv({
  variants: {
    variant: {
      none: "",
      new: "text-feedback-open",
      info: "text-feedback-progress",
      success: "text-feedback-done",
      danger: "text-feedback-danger",
    },
  },
  defaultVariants: {
    variant: "new",
  },
});

export const TagsIconVariants = tv({
  base: "w-4 h-4",
  variants: {
    variant: {
      none: "",
      new: "fill-feedback-open",
      info: "fill-feedback-progress",
      success: "fill-feedback-done",
      danger: "fill-feedback-danger",
    },
  },
  defaultVariants: {
    variant: "new",
  },
});

interface TagsProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof TagsVariants> {
  icon?: React.ComponentProps<typeof Icon>["svg"];
  loading?: boolean;
}

export default function Tags({
  variant,
  className,
  children,
  icon,
  ...props
}: TagsProps) {
  return (
    <div className={TagsVariants({ variant, className })} {...props}>
      {icon && <Icon svg={icon} className={TagsIconVariants({ variant })} />}
      {children && (
        <Text variant="body-xs-bold" className={TagsTextVariants({ variant })}>
          {children}
        </Text>
      )}
    </div>
  );
}
