import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import type { Trip } from "../../types/trip-types";

interface IGetTripDetailsResponse {
  trip: Trip;
}

export function getTripDetails(tripId: string) {
  const query = useQuery({
    queryKey: ["get-trip-details", tripId],
    queryFn: async () => {
      try {
        const response = await api.get<IGetTripDetailsResponse>(
          `/trips/${tripId}`,
        );

        return response.data;
      } catch (error) {
        console.error(error);

        throw new Error(
          "Não foi possível carregar os detalhes do tripulante. Tente novamente mais tarde.",
        );
      }
    },
  });

  return query;
}
