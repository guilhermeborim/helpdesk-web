import { useState } from "react";
import { Link, Outlet } from "react-router";
import Menu from "../assets/icons/menu.svg?react";
import Logo from "../assets/images/Logo_IconDark.svg";
import type Icon from "../components/icon";
import MenuLink from "../components/menu-link";
import Text from "../components/text";
import UserMenu from "../components/user-menu";
import { useAuth } from "../contexts/sign/hooks/use-auth";

interface MenuItem {
  href: string;
  icon: React.ComponentProps<typeof Icon>["svg"];
  label: string;
}

export function BaseLayout({ menuItems }: { menuItems: MenuItem[] }) {
  const { decoded } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pink-base">
      <div className="flex">
        <aside className="hidden md:flex w-64 bg-gray-100 shadow-md h-screen flex-col justify-between">
          <nav className="p-4 space-y-2">
            <Link to={`/${decoded?.role?.toLowerCase()}`}>
              <div className="flex items-center justify-center gap-3">
                <img src={Logo} alt="" className="w-11 h-11" />
                <div className="flex flex-col">
                  <Text variant="body-lg-bold" className="text-gray-600">
                    HelpDesk
                  </Text>
                  <Text variant="body-xxs-bold" className="text-blue-light">
                    {decoded?.role}
                  </Text>
                </div>
              </div>
            </Link>

            <div className="pt-6">
              {menuItems.map((item) => (
                <MenuLink key={item.href} href={item.href} icon={item.icon}>
                  {item.label}
                </MenuLink>
              ))}
            </div>
          </nav>

          <div className="p-4">
            <UserMenu />
          </div>
        </aside>

        <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-100 shadow-md z-20 flex items-center justify-between px-4 py-3">
          <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            <Menu
              className={`fill-gray-400 transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <div className="flex items-center gap-3">
            <img src={Logo} alt="" className="w-9 h-9" />
            <Text variant="body-lg-bold" className="text-gray-600">
              HelpDesk
            </Text>
          </div>
        </div>

        {isOpen && (
          <aside className="md:hidden fixed top-14 left-0 w-64 h-[calc(100vh-56px)] bg-gray-100 shadow-lg flex flex-col justify-between">
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <MenuLink key={item.href} href={item.href} icon={item.icon}>
                  {item.label}
                </MenuLink>
              ))}
            </nav>
            <div className="p-4">
              <UserMenu />
            </div>
          </aside>
        )}

        <main className="flex-1 pt-14 md:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
