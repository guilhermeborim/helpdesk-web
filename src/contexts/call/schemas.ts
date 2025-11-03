import { z } from "zod";

export const callFormSchema = z.object({
  name: z.string({ error: "Campo obrigatório" }),
  description: z.string({ error: "Campo obrigatório " }),
  serviceId: z.string(),
});

export type CallFormSchema = z.infer<typeof callFormSchema>;
