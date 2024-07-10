import { api } from "./api";

export type TripDetails = {
  id: string;
  destination: string;
  startsAt: string;
  endsAt: string;
  isConfirmed: boolean;
};

type TripCreate = Omit<TripDetails, "id" | "isConfirmed"> & {
  emailsToInvite: string[];
};

async function getById(id: string) {
  try {
    const { data } = await api.get<{ trip: TripDetails }>(`/trips/${id}`);

    return data.trip;
  } catch (error) {
    throw error;
  }
}

async function create({
  destination,
  startsAt,
  endsAt,
  emailsToInvite,
}: TripCreate) {
  try {
    const { data } = await api.post<{ tripId: string }>("/trips", {
      destination,
      startsAt,
      endsAt,
      emailsToInvite,
      ownerName: "Pedro Henrique Bérgamo",
      ownerEmail: "email@pedrohb.dev",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

async function update({
  id,
  destination,
  startsAt,
  endsAt,
}: Omit<TripDetails, "isConfirmed">) {
  try {
    await api.put(`/trips/${id}`, {
      destination,
      startsAt,
      endsAt,
    });
  } catch (error) {
    throw error;
  }
}

export const tripServer = { getById, create, update };
