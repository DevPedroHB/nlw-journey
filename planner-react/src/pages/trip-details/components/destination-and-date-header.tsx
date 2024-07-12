import { format } from "date-fns";
import { Calendar, MapPin, Settings2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../components/button";
import { getTripDetails } from "../../../data/trip/get-trip-details";

export function DestinationAndDateHeader() {
  const { tripId } = useParams();

  if (!tripId) return;

  const { data, error } = getTripDetails(tripId);

  if (error) toast.error(error.message);

  const displayedDate =
    data &&
    format(data.trip.startsAt, "d' de 'LLL")
      .concat(" até ")
      .concat(format(data.trip.endsAt, "d' de 'LLL"));

  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-3 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{data?.trip.destination}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>
        <div className="h-6 w-px bg-zinc-800" />
        <Button type="button" variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
