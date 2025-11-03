import Plus from "@/assets/icons/plus.svg?react";
import InputText from "@/components/input-text";
import Text from "@/components/text";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ButtonIcon from "../../../components/button-icon";
import useTech from "../hooks/use-tech";
import { type TechFormSchema, techFormSchema } from "../schemas";

export default function TechCreate() {
  const { mutation } = useTech();
  const [openModal, setOpenModal] = React.useState(false);
  const [creatingTech, setCreatingTech] = React.useTransition();
  const form = useForm<TechFormSchema>({
    resolver: zodResolver(techFormSchema),
  });

  function handleSubmit(payload: TechFormSchema) {
    setCreatingTech(async () => {
      await mutation.mutateAsync(payload);
    });
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      setOpenModal(false);
      form.reset();
    }
  }, [mutation.isSuccess, form]);

  return (
    <AlertDialog
      open={openModal}
      onOpenChange={(isOpen) => {
        setOpenModal(isOpen);
        if (!isOpen) form.reset();
      }}
    >
      <AlertDialogTrigger asChild>
        <ButtonIcon icon={Plus}>Novo</ButtonIcon>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Text variant="body-md-bold" className="text-gray-200">
              Cadastro de Técnico
            </Text>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <InputText
            placeholder="Nome completo"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          >
            Nome
          </InputText>
          <InputText
            placeholder="exemplo@gmail.com"
            type="email"
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          >
            E-mail
          </InputText>
          <InputText
            type="password"
            {...form.register("password")}
            placeholder="Defina a senha de acesso"
            error={form.formState.errors.password?.message}
          >
            Senha
          </InputText>
          <AlertDialogFooter className="pt-2">
            <AlertDialogCancel
              className="cursor-pointer"
              type="reset"
              onClick={() => setOpenModal(false)}
            >
              Fechar
            </AlertDialogCancel>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={mutation.isPending}
            >
              {creatingTech ? "Salvando..." : "Salvar"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
