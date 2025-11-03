import { NavLink } from "react-router";
import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";

export const LinkVariants = tv({
  base: "inline-flex items-center justify-start hover:bg-gray-200 w-56 h-11 p-3 rounded gap-3 ",
  variants: {
    variant: {
      active: "bg-blue-dark hover:bg-blue-dark",
    },
  },
});

export const LinkTextVariants = tv({
  base: "hover:text-gray-500",
  variants: {
    variant: {
      default: "text-gray-400",
      active: "text-gray-600",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const LinkIconVariants = tv({
  base: "fill-gray-400 hover:fill-gray-500 w-5 h-5",
  variants: {
    variant: {
      active: "fill-gray-600",
    },
  },
});

interface MenuLinkProps extends VariantProps<typeof LinkVariants> {
  href?: string;
  children: React.ReactNode;
  icon: React.ComponentProps<typeof Icon>["svg"];
}

export default function MenuLink({
  href,
  icon,
  children,
  ...props
}: MenuLinkProps) {
  return (
    <NavLink to={href!} {...props}>
      {({ isActive }) => (
        <div
          className={LinkVariants({ variant: isActive ? "active" : undefined })}
        >
          <Icon
            svg={icon}
            className={LinkIconVariants({
              variant: isActive ? "active" : undefined,
            })}
          />
          <Text
            variant="body-sm"
            className={LinkTextVariants({
              variant: isActive ? "active" : "default",
            })}
          >
            {children}
          </Text>
        </div>
      )}
    </NavLink>
  );
}
