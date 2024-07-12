import { Link2, UserCog } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../components/button";
import { fetchLinks } from "../../../data/link/fetch-links";

export function ImportantLinks() {
  const { tripId } = useParams();

  if (!tripId) return;

  const { data, error } = fetchLinks(tripId);

  if (error) toast.error(error.message);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      <div className="space-y-5">
        {data?.links.map((link) => {
          return (
            <div
              key={link.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  className="block truncate text-xs text-zinc-400 transition-colors hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="size-5 shrink-0 text-zinc-400" />
            </div>
          );
        })}
      </div>
      <Button type="button" variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
