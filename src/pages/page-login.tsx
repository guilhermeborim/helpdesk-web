import { Link } from "react-router";
import bgImage from "../assets/images/Login_Background.svg";
import Logo from "../assets/images/Logo_IconDark.svg";
import Button from "../components/button";
import Text from "../components/text";
import Sign from "../contexts/sign/components/sign";

export default function PageLogin() {
  return (
    <main
      className="bg-cover bg-center h-screen flex items-end xl:justify-end pt-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-gray-600 rounded-t-3xl xl:rounded-tl-2xl xl:rounded-t-none h-full w-full xl:w-[680px] px-6 xl:px-36">
        <div className="flex items-center justify-center pt-8 pb-6 gap-3">
          <img src={Logo} alt="" className="w-10 h-10" />
          <Text variant="body-xl-bold" className="text-blue-dark">
            HelpDesk
          </Text>
        </div>
        <Sign />
        <div className="p-6 rounded-xl border border-gray-500 mt-3">
          <div className="flex flex-col gap-0.5 pb-8">
            <Text variant="body-md-bold" className="text-gray-200">
              Ainda nao tem uma conta?
            </Text>
            <Text variant="body-xs" className="text-gray-300">
              Cadastre agora mesmo
            </Text>
          </div>
          <Link to={"/signup"}>
            <Button variant="secondary">Criar conta</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
