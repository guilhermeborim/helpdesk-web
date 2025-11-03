import Logout from "../assets/icons/log-out.svg?react";
import { useAuth } from "../contexts/sign/hooks/use-auth";
import Icon from "./icon";
import Text from "./text";

export default function UserMenu() {
  const { signOut, decoded } = useAuth();

  return (
    <div className="flex items-center justify-between gap-3 p-4 bg-gray-100 w-56">
      <div className="bg-blue-dark w-8 h-8 rounded-full flex items-center justify-center text-gray-600">
        UC
      </div>
      <div className="flex flex-col">
        <Text variant="body-sm" className="text-gray-600">
          Usuário {decoded?.role}
        </Text>
        <Text variant="body-xs" className="text-gray-400">
          {decoded?.email}
        </Text>
      </div>
      <button className=" cursor-pointer" onClick={signOut}>
        <Icon svg={Logout} className="fill-feedback-danger w-5 h-5" />
      </button>
    </div>
  );
}
