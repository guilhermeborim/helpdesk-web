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
import useService from "../hooks/use-service";
import { type ServiceFormSchema, serviceFormSchema } from "../schemas";

export default function ServiceCreate() {
  const { mutation } = useService();
  const [openModal, setOpenModal] = React.useState(false);
  const [creatingService, setCreatingService] = React.useTransition();
  const form = useForm<ServiceFormSchema>({
    resolver: zodResolver(serviceFormSchema),
  });

  function handleSubmit(payload: ServiceFormSchema) {
    setCreatingService(async () => {
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
              Cadastro de serviço
            </Text>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <InputText
            placeholder="Nome do serviço"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          >
            Título
          </InputText>
          <InputText
            placeholder="0,00"
            {...form.register("price")}
            error={form.formState.errors.price?.message}
          >
            Valor
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
              {creatingService ? "Salvando..." : "Salvar"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
