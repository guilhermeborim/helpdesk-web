import type React from "react";
import Text from "./text";

interface HeaderPagesProps {
  children?: React.ReactNode;
  title: string;
}

export default function HeaderPages({ children, title }: HeaderPagesProps) {
  return (
    <header className="flex items-center justify-between pt-14 pb-7">
      <div>
        <Text variant="body-xl-bold" className="text-blue-dark">
          {title}
        </Text>
      </div>
      <div className="flex gap-1">{children}</div>
    </header>
  );
}
