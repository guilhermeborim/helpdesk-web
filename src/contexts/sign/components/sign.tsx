import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import { useAuth } from "../hooks/use-auth";
import { signFormSchema, type SignFormSchema } from "../schemas";

export default function Sign() {
  const { signIn, signInAdmin, signInTec, error } = useAuth();
  const [connectingUser, setConnectingUser] = React.useTransition();

  const form = useForm<SignFormSchema>({
    resolver: zodResolver(signFormSchema),
  });

  function handleSubmit(payload: SignFormSchema) {
    setConnectingUser(async () => {
      await signIn(payload);
    });
  }

  function handleDemo(login: () => Promise<void>) {
    setConnectingUser(async () => {
      await login();
    });
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="p-6 rounded-xl border border-gray-500">
        <div className="flex flex-col gap-0.5 pb-8">
          <Text variant="body-lg-bold" className="text-gray-200">
            Acesse o portal
          </Text>
          <Text variant="body-xs" className="text-gray-300">
            Entre usando seu e-mail e senha cadastrados
          </Text>
        </div>
        <div className="flex flex-col gap-4 pb-8">
          <InputText
            placeholder="exemplo@mail.com"
            type="email"
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          >
            E-mail
          </InputText>
          <InputText
            placeholder="Digite sua senha"
            type="password"
            {...form.register("password")}
            error={form.formState.errors.password?.message}
          >
            Senha
          </InputText>
        </div>
        <Button variant="primary" type="submit" disabled={connectingUser}>
          {connectingUser ? "Entrando..." : "Entrar"}
        </Button>
        {error && <Text>{error}</Text>}
        <div className="flex flex-col gap-2 pt-6">
          <Text variant="body-xs" className="text-gray-300">
            Acesso de demonstração
          </Text>
          <Button
            variant="secondary"
            type="button"
            disabled={connectingUser}
            onClick={() => handleDemo(signInAdmin)}
          >
            Entrar como Admin
          </Button>
          <Button
            variant="secondary"
            type="button"
            disabled={connectingUser}
            onClick={() => handleDemo(signInTec)}
          >
            Entrar como Técnico
          </Button>
          <Button
            variant="secondary"
            type="button"
            disabled={connectingUser}
            onClick={() =>
              handleDemo(() =>
                signIn({ email: "cliente@gmail.com", password: "123456" })
              )
            }
          >
            Entrar como Cliente
          </Button>
        </div>
      </div>
    </form>
  );
}
