import ClipBoard from "../assets/icons/clipboard-list.svg?react";
import { BaseLayout } from "./base-layout";

export default function TechLayout() {
  return (
    <BaseLayout
      menuItems={[
        { href: "/tecnico/chamados", icon: ClipBoard, label: "Meus chamados" },
      ]}
    />
  );
}
