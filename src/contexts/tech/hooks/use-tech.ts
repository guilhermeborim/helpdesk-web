import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { api, fetcher } from "../../../helpers/api";
import type { TechResponse } from "../models/tech";
import type { TechFormSchema } from "../schemas";

export default function useTech() {
  const [error, setError] = React.useState<string | null>(null);

  const { data, isLoading } = useQuery<TechResponse>({
    queryKey: ["tech"],
    queryFn: () => fetcher("/tech", {}),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: TechFormSchema) => {
      try {
        setError(null);
        // TODO: Fazer a rota de criar um técnico na API
        await api.post("/tech", payload);

        queryClient.invalidateQueries({ queryKey: ["tech"] });
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message || "Erro ao autenticar");
        }
      }
    },
  });

  return {
    data,
    isLoading,
    mutation,
    error,
  };
}
