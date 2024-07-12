import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import type { Participant } from "../../types/participant-types";

interface IFetchParticipantResponse {
  participants: Participant[];
}

export function fetchParticipants(tripId: string) {
  const query = useQuery({
    queryKey: ["fetch-participants", tripId],
    queryFn: async () => {
      try {
        const response = await api.get<IFetchParticipantResponse>(
          `/trips/${tripId}/participants`,
        );

        return response.data;
      } catch (error) {
        console.error(error);

        throw new Error(
          "Ocorreu um erro ao buscar os participantes. Tente novamente mais tarde.",
        );
      }
    },
  });

  return query;
}
