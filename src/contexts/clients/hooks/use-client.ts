import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../helpers/api";
import type { ClientResponse } from "../models/client";

export default function useClient() {
  const { data, isLoading } = useQuery<ClientResponse>({
    queryKey: ["clients"],
    queryFn: () => fetcher("/clients", {}),
  });

  return {
    data,
    isLoading,
  };
}
