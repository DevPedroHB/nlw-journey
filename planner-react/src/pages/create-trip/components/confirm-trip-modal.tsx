import { AtSign, User, X } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "../../../components/button";

interface IConfirmTripModal {
  handleChangeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({
  handleChangeConfirmTripModal,
  createTrip,
}: IConfirmTripModal) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[40rem] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button type="button" onClick={handleChangeConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">
              Florianópolis, Brasil
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              16 a 27 de Agosto de 2024
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>
        <form onSubmit={createTrip} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>
          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
