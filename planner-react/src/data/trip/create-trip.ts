import { useMutation } from "@tanstack/react-query";
import type { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { queryClient } from "../../lib/react-query";

interface ICreateTrip {
  destination: string;
  ownerName: string;
  ownerEmail: string;
  eventStartAndEndDates: DateRange | undefined;
  emailsToInvite: string[];
}

interface ICreateTripResponse {
  tripId: string;
}

export function createTrip() {
  const mutation = useMutation({
    mutationKey: ["create-trip"],
    mutationFn: async ({
      destination,
      ownerName,
      ownerEmail,
      eventStartAndEndDates,
      emailsToInvite,
    }: ICreateTrip) => {
      try {
        if (
          destination.length === 0 ||
          !eventStartAndEndDates ||
          !eventStartAndEndDates.from ||
          !eventStartAndEndDates.to ||
          emailsToInvite.length === 0 ||
          ownerName.length === 0 ||
          ownerEmail.length === 0
        )
          throw new Error(
            "Todos os campos são obrigatórios e devem estar preenchidos.",
          );

        const response = await api.post<ICreateTripResponse>("/trips", {
          destination,
          startsAt: eventStartAndEndDates.from,
          endsAt: eventStartAndEndDates.to,
          emailsToInvite,
          ownerName,
          ownerEmail,
        });

        return response.data;
      } catch (error) {
        console.error(error);

        throw new Error(
          "Não foi possível salvar a viagem. Por favor, tente novamente.",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch-trips"],
      });
    },
  });

  return mutation;
}
