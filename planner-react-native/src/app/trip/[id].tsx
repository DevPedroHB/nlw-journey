import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Modal } from "@/components/modal";
import { tripServer, type TripDetails } from "@/server/trip-server";
import { colors } from "@/styles/colors";
import { calendarUtils, type DatesSelected } from "@/utils/calendarUtils";
import { dayjs } from "@/utils/dayjsLocaleConfig";
import { router, useLocalSearchParams } from "expo-router";
import {
  Calendar as CalendarIcon,
  CalendarRange,
  Info,
  MapPin,
  Settings2,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Text, TouchableOpacity, View } from "react-native";
import type { DateData } from "react-native-calendars";
import { Activities } from "./activities";
import { Details } from "./details";

export type TripData = TripDetails & { when: string };

enum MODAL {
  NONE = 0,
  UPDATE_TRIP = 1,
  CALENDAR = 2,
}

export default function Trip() {
  const tripId = useLocalSearchParams<{ id: string }>().id;
  const [isLoadingTrip, setIsLoadingTrip] = useState(false);
  const [tripDetails, setTripDetails] = useState({} as TripData);
  const [option, setOption] = useState<"activity" | "details">("activity");
  const [showModal, setShowModal] = useState(MODAL.NONE);
  const [destination, setDestination] = useState("");
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected);
  const [isUpdatingTrip, setIsUpdatingTrip] = useState(false);

  async function getTripDetails() {
    try {
      setIsLoadingTrip(true);

      if (!tripId) {
        return router.back();
      }

      const trip = await tripServer.getById(tripId);
      const maxLengthDestination = 14;
      const destination =
        trip.destination.length > maxLengthDestination
          ? trip.destination.slice(0, maxLengthDestination) + "..."
          : trip.destination;
      const startsAt = dayjs(trip.startsAt).format("DD");
      const endsAt = dayjs(trip.endsAt).format("DD");
      const month = dayjs(trip.startsAt).format("MMM");

      setDestination(trip.destination);
      setTripDetails({
        ...trip,
        when: `${destination} de ${startsAt} à ${endsAt} de ${month}.`,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTrip(false);
    }
  }

  function handleSelectDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    });

    setSelectedDates(dates);
  }

  async function handleUpdateTrip() {
    try {
      if (!tripId) return;

      if (!destination || !selectedDates.startsAt || !selectedDates.endsAt) {
        return Alert.alert(
          "Atualizar viagem",
          "Todos os campos são obrigatórios."
        );
      }

      setIsUpdatingTrip(true);

      await tripServer.update({
        id: tripDetails.id,
        destination,
        startsAt: dayjs(selectedDates.startsAt.dateString).toString(),
        endsAt: dayjs(selectedDates.endsAt.dateString).toString(),
      });

      Alert.alert("Atualizar viagem", "Viagem atualizada com sucesso.", [
        {
          text: "OK",
          onPress: () => {
            getTripDetails();

            setShowModal(MODAL.NONE);
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingTrip(false);
    }
  }

  useEffect(() => {
    getTripDetails();
  }, []);

  if (isLoadingTrip) {
    return <Loading />;
  }

  return (
    <View className="flex-1 px-5 pt-6">
      <Text className="text-zinc-100 text-2xl">Trip</Text>
      <Input variant="tertiary">
        <MapPin color={colors.zinc[400]} size={20} />
        <Input.Field value={tripDetails.when} readOnly />
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-9 h-9 bg-zinc-800 items-center justify-center rounded"
          onPress={() => setShowModal(MODAL.UPDATE_TRIP)}
        >
          <Settings2 color={colors.zinc[400]} size={20} />
        </TouchableOpacity>
      </Input>
      {option === "activity" ? (
        <Activities tripDetails={tripDetails} />
      ) : (
        <Details tripId={tripDetails.id} />
      )}
      <View className="w-full absolute -bottom-1 self-center justify-end pb-5 z-10 bg-zinc-950">
        <View className="w-full flex-row bg-zinc-900 p-4 rounded-lg border border-zinc-800 gap-2">
          <Button
            className="flex-1"
            onPress={() => setOption("activity")}
            variant={option === "activity" ? "primary" : "secondary"}
          >
            <CalendarRange
              color={
                option === "activity" ? colors.lime[950] : colors.zinc[200]
              }
              size={20}
            />
            <Button.Title>Atividades</Button.Title>
          </Button>
          <Button
            className="flex-1"
            onPress={() => setOption("details")}
            variant={option === "details" ? "primary" : "secondary"}
          >
            <Info
              color={option === "details" ? colors.lime[950] : colors.zinc[200]}
              size={20}
            />
            <Button.Title>Detalhes</Button.Title>
          </Button>
        </View>
      </View>
      <Modal
        title="Atualizar viagem"
        subtitle="Somente quem criou a viagem pode editar."
        visible={showModal === MODAL.UPDATE_TRIP}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="gap-2 my-4">
          <Input variant="secondary">
            <MapPin color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Para onde?"
              onChangeText={setDestination}
              value={destination}
            />
          </Input>
          <Input variant="secondary">
            <CalendarIcon color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Quando?"
              value={selectedDates.formatDatesInText}
              onPressIn={() => setShowModal(MODAL.CALENDAR)}
              onFocus={() => Keyboard.dismiss()}
              showSoftInputOnFocus={false}
            />
          </Input>
          <Button onPress={handleUpdateTrip} isLoading={isUpdatingTrip}>
            <Button.Title>Atualizar</Button.Title>
          </Button>
        </View>
      </Modal>
      <Modal
        title="Selecionar datas"
        subtitle="Selecione a data de ida e volta da viagem."
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.UPDATE_TRIP)}
      >
        <View className="gap-4 mt-4">
          <Calendar
            minDate={dayjs().toISOString()}
            onDayPress={handleSelectDate}
            markedDates={selectedDates.dates}
          />
          <Button onPress={() => setShowModal(MODAL.UPDATE_TRIP)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}