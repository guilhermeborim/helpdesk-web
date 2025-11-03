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
  const [connectingUserAdmin, setConnectingUserAdmin] = React.useTransition();
  const [connectingUserTec, setConnectingUserTec] = React.useTransition();
  const form = useForm<SignFormSchema>({
    resolver: zodResolver(signFormSchema),
  });

  function handleSubmit(payload: SignFormSchema) {
    setConnectingUser(async () => {
      await signIn(payload);
    });
  }

  function handleSubmitAdmin() {
    setConnectingUserAdmin(async () => {
      await signInAdmin();
    });
  }

  function handleSubmitTec() {
    setConnectingUserTec(async () => {
      await signInTec();
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
        <div className="flex gap-2 mt-2">
          <Button
            variant="secondary"
            type="button"
            disabled={connectingUserAdmin}
            onClick={handleSubmitAdmin}
          >
            {connectingUserAdmin ? "Entrando..." : "ADMIN"}
          </Button>
          <Button
            variant="secondary"
            type="button"
            disabled={connectingUserTec}
            onClick={handleSubmitTec}
          >
            {connectingUserTec ? "Entrando..." : "TÉCNICO"}
          </Button>
        </div>
        {error && <Text>{error}</Text>}
      </div>
    </form>
  );
}
