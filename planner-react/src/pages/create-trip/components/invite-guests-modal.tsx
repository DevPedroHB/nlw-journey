import { AtSign, Plus, X } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "../../../components/button";

interface IInviteGuestsModal {
  handleChangeGuestsModal: () => void;
  emailsToInvite: string[];
  handleRemoveEmailToInvites: (email: string) => void;
  handleAddNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
}

export function InviteGuestsModal({
  handleChangeGuestsModal,
  emailsToInvite,
  handleRemoveEmailToInvites,
  handleAddNewEmailToInvite,
}: IInviteGuestsModal) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[40rem] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button type="button" onClick={handleChangeGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => (
            <div
              key={email}
              className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
            >
              <span className="text-zinc-300">{email}</span>
              <button
                type="button"
                onClick={() => handleRemoveEmailToInvites(email)}
              >
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-zinc-800" />
        <form
          onSubmit={handleAddNewEmailToInvite}
          className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-2.5"
        >
          <div className="flex flex-1 items-center gap-2 px-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>
          <Button type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
