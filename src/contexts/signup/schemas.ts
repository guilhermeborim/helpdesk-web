import { z } from "zod";

export const signupFormSchema = z.object({
  name: z
    .string({ error: "Campo Obrigat[orio" })
    .min(4, { error: "Mínimo de 6 Caracteres" }),
  email: z.email({ error: "Campo Obrigatório" }),
  password: z
    .string({ error: "Campo Obrigatório" })
    .min(6, { error: "Mínimo de 6 Caracteres" }),
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
