import Busines from "../assets/icons/briefcase-business.svg?react";
import ClipBoard from "../assets/icons/clipboard-list.svg?react";
import Users from "../assets/icons/users.svg?react";
import Wrench from "../assets/icons/wrench.svg?react";
import { BaseLayout } from "./base-layout";

export default function AdminLayout() {
  return (
    <BaseLayout
      menuItems={[
        { href: "/admin/chamados", icon: ClipBoard, label: "Chamados" },
        { href: "/admin/tecnicos", icon: Users, label: "Técnicos" },
        { href: "/admin/clientes", icon: Busines, label: "Clientes" },
        { href: "/admin/servicos", icon: Wrench, label: "Serviços" },
      ]}
    />
  );
}
