import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { fetchActivities } from "../../../data/activity/fetch-activities";

export function Activities() {
  const { tripId } = useParams();

  if (!tripId) return;

  const { data, error } = fetchActivities(tripId);

  if (error) toast.error(error.message);

  return (
    <div className="space-y-8">
      {data?.activities.map((activity) => {
        return (
          <div key={String(activity.date)} className="space-y-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-zinc-300">
                Dia {format(activity.date, "d")}
              </span>
              <span className="text-xs text-zinc-500">
                {format(activity.date, "EEEE", { locale: ptBR })}
              </span>
            </div>
            {activity.activities.length > 0 ? (
              <div className="space-y-2.5">
                {activity.activities.map((activityDay) => {
                  return (
                    <div
                      key={activityDay.id}
                      className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape"
                    >
                      <CircleCheck className="size-5 text-lime-300" />
                      <span className="text-zinc-100">{activityDay.title}</span>
                      <span className="ml-auto text-sm text-zinc-400">
                        {format(activityDay.occursAt, "HH:mm")}h
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
