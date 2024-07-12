import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import type { Activity } from "../../types/activity-types";

interface IFetchActivitiesResponse {
  activities: {
    date: Date;
    activities: Activity[];
  }[];
}

export function fetchActivities(tripId: string) {
  const query = useQuery({
    queryKey: ["fetch-activities", tripId],
    queryFn: async () => {
      try {
        const response = await api.get<IFetchActivitiesResponse>(
          `/trips/${tripId}/activities`,
        );

        return response.data;
      } catch (error) {
        console.error(error);

        throw new Error(
          "Ocorreu um erro ao buscar as atividades. Tente novamente mais tarde.",
        );
      }
    },
  });

  return query;
}
