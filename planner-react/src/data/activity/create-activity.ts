import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/react-query";
import type { CreateActivityValidation } from "../../types/validations/create-activity-validation";

interface ICreateActivityResponse {
  activityId: string;
}

export function createActivity(tripId: string) {
  const mutation = useMutation({
    mutationKey: ["create-activity", tripId],
    mutationFn: async (data: CreateActivityValidation) => {
      try {
        const response = await api.post<ICreateActivityResponse>(
          `/trips/${tripId}/activities`,
          data,
        );

        return response.data;
      } catch (error) {
        console.error(error);

        throw new Error(
          "Ocorreu um erro ao salvar a atividade. Por favor, tente novamente.",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch-activities", tripId],
      });
    },
  });

  return mutation;
}
