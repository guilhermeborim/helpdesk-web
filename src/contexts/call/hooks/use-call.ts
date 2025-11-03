import { useAuth } from "@/contexts/sign/hooks/use-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { api, fetcher } from "../../../helpers/api";
import type { CallResponse } from "../models/call";
import type { CallFormSchema } from "../schemas";

export default function useCall() {
  const { decoded } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  const { data, isLoading } = useQuery<CallResponse>({
    queryKey: ["call"],
    queryFn: () => {
      if (decoded?.role === "ADMIN") {
        return fetcher("/calls", {});
      } else {
        return Promise.resolve(null);
      }
    },
  });

  const { data: dataClient, isLoading: isLoadingClient } =
    useQuery<CallResponse>({
      queryKey: ["call_client"],
      queryFn: () => {
        if (decoded?.role === "CLIENTE") {
          return fetcher(`/calls/${decoded?.sub}`, {});
        } else {
          return Promise.resolve(null);
        }
      },
    });

  const { data: dataTech, isLoading: isLoadingTech } = useQuery<CallResponse>({
    queryKey: ["call_tech"],
    queryFn: () => {
      if (decoded?.role === "TECNICO") {
        return fetcher(`/calls/tech/${decoded?.sub}`, {});
      } else {
        return Promise.resolve(null);
      }
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: CallFormSchema) => {
      try {
        setError(null);
        const data = {
          ...payload,
          clientId: decoded?.sub,
        };
        await api.post("/calls", data);

        queryClient.invalidateQueries({ queryKey: ["call_client"] });
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message || "Erro ao criar chamada");
        }
      }
    },
  });

  return {
    data,
    isLoading,
    dataClient,
    isLoadingClient,
    error,
    mutation,
    dataTech,
    isLoadingTech,
  };
}
