import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { Button } from "../../../components/button";

interface IDestinationAndDateStep {
  isGuestsInputOpen: boolean;
  handleChangeGuestsInput: () => void;
  setDestination: (destination: string) => void;
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (dateRange: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  handleChangeGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: IDestinationAndDateStep) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  function handleChangeDatePicker() {
    setIsDatePickerOpen((prev) => !prev);
  }

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputOpen}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
        />
      </div>
      <button
        disabled={isGuestsInputOpen}
        onClick={handleChangeDatePicker}
        className="flex w-[240px] items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="w-40 flex-1 text-lg text-zinc-400">
          {displayedDate || "Quando"}
        </span>
      </button>
      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Selecione a data</h2>
                <button>
                  <X
                    className="size-5 text-zinc-400"
                    onClick={handleChangeDatePicker}
                  />
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}
      <div className="h-6 w-px bg-zinc-800" />
      {isGuestsInputOpen ? (
        <Button
          type="button"
          onClick={handleChangeGuestsInput}
          variant="secondary"
        >
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button type="button" onClick={handleChangeGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
