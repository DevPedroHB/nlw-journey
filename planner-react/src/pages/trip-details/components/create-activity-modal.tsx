import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Tag, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../components/button";
import { createActivity } from "../../../data/activity/create-activity";
import {
  createActivityValidation,
  type CreateActivityValidation,
} from "../../../types/validations/create-activity-validation";

interface ICreateActivityModal {
  handleChangeCreateActivity: () => void;
}

export function CreateActivityModal({
  handleChangeCreateActivity,
}: ICreateActivityModal) {
  const { tripId } = useParams();
  const { register, handleSubmit, reset } = useForm<CreateActivityValidation>({
    resolver: zodResolver(createActivityValidation),
  });

  if (!tripId) return;

  const { mutateAsync, error } = createActivity(tripId);

  if (error) toast.error(error.message);

  async function handleCreateActivity(data: CreateActivityValidation) {
    await mutateAsync(data);

    reset();

    handleChangeCreateActivity();
  }

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
        <form
          onSubmit={handleSubmit(handleCreateActivity)}
          className="space-y-3"
        >
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Qual a atividade?"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              required
              {...register("title")}
            />
          </div>
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Calendar className="size-5 text-zinc-400" />
            <input
              type="datetime-local"
              placeholder="Data e horário da atividade"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none [color-scheme:dark]"
              required
              {...register("occursAt")}
            />
          </div>
          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
