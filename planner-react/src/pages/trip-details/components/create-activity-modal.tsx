import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../../components/button";

interface ICreateActivityModal {
  handleChangeCreateActivity: () => void;
}

export function CreateActivityModal({
  handleChangeCreateActivity,
}: ICreateActivityModal) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[40rem] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button type="button" onClick={handleChangeCreateActivity}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados pode visualizar as atividades.
          </p>
        </div>
        <form className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              placeholder="Qual a atividade?"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Calendar className="size-5 text-zinc-400" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="Data e horário da atividade"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none [color-scheme:dark]"
            />
          </div>
          <Button type="button" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
