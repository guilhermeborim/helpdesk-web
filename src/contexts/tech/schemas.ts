import { z } from "zod";

export const techFormSchema = z.object({
  name: z
    .string({ error: "Campo obrigatório" })
    .min(4, { error: "Mínimo de 4 caracteres" }),
  email: z.email({ error: "Campo obrigatório " }),
  password: z
    .string({ error: "Campo obrigatório" })
    .min(4, { error: "Mínimo de 4 caracteres" }),

  availability: z.string().array(),
});

export type TechFormSchema = z.infer<typeof techFormSchema>;
