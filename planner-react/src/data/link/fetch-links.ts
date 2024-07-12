import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import type { Link } from "../../types/link-types";

interface IFetchLinksResponse {
  links: Link[];
}

export function fetchLinks(tripId: string) {
  const query = useQuery({
    queryKey: ["fetch-links", tripId],
    queryFn: async () => {
      try {
        const response = await api.get<IFetchLinksResponse>(
          `/trips/${tripId}/links`,
        );

        return response.data;
      } catch (error) {
        console.error(error);

        throw new Error(
          "Ocorreu um erro ao buscar os links. Tente novamente mais tarde.",
        );
      }
    },
  });

  return query;
}
