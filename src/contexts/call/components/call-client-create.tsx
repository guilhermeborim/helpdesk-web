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
import useService from "@/contexts/services/hooks/use-service";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ButtonIcon from "../../../components/button-icon";
import useCall from "../hooks/use-call";
import { type CallFormSchema, callFormSchema } from "../schemas";

export default function CallCreate() {
  const { mutation } = useCall();
  const { data } = useService();
  const [openModal, setOpenModal] = React.useState(false);
  const [creatingCall, setCreatingCall] = React.useTransition();

  const form = useForm<CallFormSchema>({
    resolver: zodResolver(callFormSchema),
  });

  function handleSubmit(payload: CallFormSchema) {
    setCreatingCall(async () => {
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
              Cadastro de Chamado
            </Text>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit, (err) => console.log(err))}
        >
          <InputText
            placeholder="Nome completo"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          >
            Título
          </InputText>
          <InputText
            placeholder="exemplo@gmail.com"
            type="text"
            {...form.register("description")}
            error={form.formState.errors.description?.message}
          >
            Descrição
          </InputText>
          <div className="flex flex-col gap-2">
            <Text variant="body-xxs-bold">CATEGORIA DO SERVIÇO</Text>
            <select
              className="border p-2 rounded-sm"
              required
              {...form.register("serviceId")}
            >
              <option value="">Selecione o Serviço</option>
              {data?.services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
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
              {creatingCall ? "Salvando..." : "Salvar"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
