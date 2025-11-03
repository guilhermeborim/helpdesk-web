import ClipBoard from "../assets/icons/clipboard-list.svg?react";
import { BaseLayout } from "./base-layout";

export default function ClientLayout() {
  return (
    <BaseLayout
      menuItems={[
        { href: "/cliente/chamados", icon: ClipBoard, label: "Meus chamados" },
      ]}
    />
  );
}
