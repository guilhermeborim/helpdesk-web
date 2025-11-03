import { z } from "zod";

export const serviceFormSchema = z.object({
  name: z
    .string({ error: "Campo obrigatório" })
    .min(4, { message: "Mínimo de 4 caracteres" }),

  price: z
    .string({ error: "Campo obrigatório" })
    .refine((val) => !!val && !isNaN(Number(val.replace(",", "."))), {
      message: "Insira um número válido",
    }),
});

export type ServiceFormSchema = z.infer<typeof serviceFormSchema>;
