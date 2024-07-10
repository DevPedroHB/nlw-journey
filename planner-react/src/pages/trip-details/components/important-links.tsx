import { Link2, UserCog } from "lucide-react";
import { Button } from "../../../components/button";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <a
              href="https://www.airbnb.com.br/rooms/104700011"
              target="_blank"
              className="block truncate text-xs text-zinc-400 transition-colors hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/104700011
            </a>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <a
              href="https://www.airbnb.com.br/rooms/104700011"
              target="_blank"
              className="block truncate text-xs text-zinc-400 transition-colors hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/104700011
            </a>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>
      </div>
      <Button type="button" variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
