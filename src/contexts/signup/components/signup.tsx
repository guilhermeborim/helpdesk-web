import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import useSignup from "../hooks/use-signup";
import { signupFormSchema, type SignupFormSchema } from "../schemas";

export default function Signup() {
  const { signupUser, errorSignup } = useSignup();
  const [connectingUser, setConnectingUser] = React.useTransition();
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
  });

  function handleSubmit(payload: SignupFormSchema) {
    setConnectingUser(async () => {
      await signupUser(payload);
    });
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="p-6 rounded-xl border border-gray-500">
        <div className="flex flex-col gap-0.5 pb-8">
          <Text variant="body-lg-bold" className="text-gray-200">
            Crie sua conta
          </Text>
          <Text variant="body-xs" className="text-gray-300">
            Informe seu nome, e-mail e senha
          </Text>
        </div>
        <div className="flex flex-col gap-4 pb-8">
          <InputText
            placeholder="Digite o nome completo"
            type="text"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          >
            Nome
          </InputText>
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
          {connectingUser ? "Cadastrando..." : "Cadastrar"}
        </Button>
        {errorSignup && <Text>{errorSignup}</Text>}
      </div>
    </form>
  );
}
