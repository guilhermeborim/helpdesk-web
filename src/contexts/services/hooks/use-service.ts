import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { api, fetcher } from "../../../helpers/api";
import type { ServiceResponse } from "../models/service";
import type { ServiceFormSchema } from "../schemas";

export default function useService() {
  const [error, setError] = React.useState<string | null>(null);
  const { data, isLoading } = useQuery<ServiceResponse>({
    queryKey: ["services"],
    queryFn: () => fetcher("/services", {}),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: ServiceFormSchema) => {
      try {
        setError(null);
        const newPayload = {
          ...payload,
          price: Number(payload.price.replace(",", ".")),
        };
        await api.post("/services", newPayload);

        queryClient.invalidateQueries({ queryKey: ["services"] });
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
    error,
    mutation,
  };
}
