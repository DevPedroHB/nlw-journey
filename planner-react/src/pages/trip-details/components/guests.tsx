import { CheckCircle, CircleDashed, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../components/button";
import { fetchParticipants } from "../../../data/participant/fetch-participants";

export function Guests() {
  const { tripId } = useParams();

  if (!tripId) return;

  const { data, error } = fetchParticipants(tripId);

  if (error) return toast.error(error.message);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>
      <div className="space-y-5">
        {data?.participants.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index + 1}`}
                </span>
                <span className="block truncate text-sm text-zinc-400">
                  {participant.email}
                </span>
              </div>
              {participant.isConfirmed ? (
                <CheckCircle className="size-5 shrink-0 text-lime-400" />
              ) : (
                <CircleDashed className="size-5 shrink-0 text-zinc-400" />
              )}
            </div>
          );
        })}
      </div>
      <Button type="button" variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
