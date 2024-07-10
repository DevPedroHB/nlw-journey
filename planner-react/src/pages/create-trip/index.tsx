import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmTripModal } from "./components/confirm-trip-modal";
import { DestinationAndDateStep } from "./components/destination-and-date-step";
import { InviteGuestsModal } from "./components/invite-guests-modal";
import { InviteGuestsStep } from "./components/invite-guests-step";

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  function handleChangeGuestsInput() {
    setIsGuestsInputOpen((prev) => !prev);
  }

  function handleChangeGuestsModal() {
    setIsGuestsModalOpen((prev) => !prev);
  }
  function handleChangeConfirmTripModal() {
    setIsConfirmTripModalOpen((prev) => !prev);
  }

  function handleAddNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email || emailsToInvite.includes(email)) return;

    setEmailsToInvite((prev) => [...prev, email]);

    event.currentTarget.reset();
  }

  function handleRemoveEmailToInvites(emailToRemove: string) {
    setEmailsToInvite((prev) =>
      prev.filter((email) => email !== emailToRemove),
    );
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate("/trips/an-example-id");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/icons/logo.svg" alt="Logo plann.er" />
          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            handleChangeGuestsInput={handleChangeGuestsInput}
          />
          {isGuestsInputOpen && (
            <InviteGuestsStep
              handleChangeGuestsModal={handleChangeGuestsModal}
              emailsToInvite={emailsToInvite}
              handleChangeConfirmTripModal={handleChangeConfirmTripModal}
            />
          )}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br /> com nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
      {isGuestsModalOpen && (
        <InviteGuestsModal
          handleChangeGuestsModal={handleChangeGuestsModal}
          emailsToInvite={emailsToInvite}
          handleRemoveEmailToInvites={handleRemoveEmailToInvites}
          handleAddNewEmailToInvite={handleAddNewEmailToInvite}
        />
      )}
      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          handleChangeConfirmTripModal={handleChangeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  );
}