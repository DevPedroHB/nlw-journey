import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { GuestEmail } from "@/components/email";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Modal } from "@/components/modal";
import { tripServer } from "@/server/trip-server";
import { tripStorage } from "@/storage/trip";
import { colors } from "@/styles/colors";
import { calendarUtils, type DatesSelected } from "@/utils/calendarUtils";
import { dayjs } from "@/utils/dayjsLocaleConfig";
import { validateInput } from "@/utils/validateInput";
import { router } from "expo-router";
import {
  ArrowRight,
  AtSign,
  Calendar as CalendarIcon,
  MapPin,
  Settings2,
  UserRoundPlus,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Image, Keyboard, Text, View } from "react-native";
import type { DateData } from "react-native-calendars";

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAIL = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2,
}

export default function Index() {
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS);
  const [showModal, setShowModal] = useState(MODAL.NONE);
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected);
  const [destination, setDestination] = useState("");
  const [emailToInvite, setEmailToInvite] = useState("");
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);
  const [isGettingTrip, setIsGettingTrip] = useState(true);

  function handleNextStepForm() {
    if (
      destination.trim().length === 0 ||
      !selectedDates.startsAt ||
      !selectedDates.endsAt
    ) {
      return Alert.alert(
        "Detalhes da viagem",
        "Preencha todas as informações da viagem para seguir."
      );
    }

    if (destination.length < 4) {
      return Alert.alert(
        "Detalhes da viagem",
        "Destino deve ter pelo menos 4 caracteres."
      );
    }

    if (stepForm === StepForm.TRIP_DETAILS) {
      return setStepForm(StepForm.ADD_EMAIL);
    }

    Alert.alert("Nova viagem", "Você deseja confirmar a viagem?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => createTrip(),
      },
    ]);
  }

  function handleSelectDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    });

    setSelectedDates(dates);
  }

  function handleRemoveEmail(emailToRemove: string) {
    setEmailsToInvite((prev) =>
      prev.filter((email) => email !== emailToRemove)
    );
  }

  function handleAddEmail() {
    if (!validateInput.email(emailToInvite)) {
      return Alert.alert(
        "Convidar amigos",
        "Email inválido. Verifique o endereço e tente novamente."
      );
    }

    const emailAlreadyExists = emailsToInvite.some(
      (email) => email === emailToInvite
    );

    if (emailAlreadyExists) {
      return Alert.alert("Convidar amigos", "Este e-mail já foi adicionado.");
    }

    setEmailsToInvite((prev) => [...prev, emailToInvite]);

    setEmailToInvite("");
  }

  async function saveTrip(tripId: string) {
    try {
      await tripStorage.save(tripId);

      router.navigate(`trip/${tripId}`);
    } catch (error) {
      Alert.alert("Salvar viagem", "Ocorreu um erro ao salvar a viagem.");

      console.log(error);
    }
  }

  async function createTrip() {
    try {
      setIsCreatingTrip(true);

      const newTrip = await tripServer.create({
        destination,
        startsAt: dayjs(selectedDates.startsAt?.dateString).toString(),
        endsAt: dayjs(selectedDates.endsAt?.dateString).toString(),
        emailsToInvite,
      });

      Alert.alert(
        "Nova viagem",
        "Viagem criada com sucesso! Aguarde enquanto os convidados confirmam.",
        [
          {
            text: "OK. Continuar.",
            onPress: () => saveTrip(newTrip.tripId),
          },
        ]
      );
    } catch (error) {
      console.error(error);

      setIsCreatingTrip(false);
    }
  }

  async function getTrip() {
    try {
      const tripId = await tripStorage.get();

      if (!tripId) {
        return setIsGettingTrip(false);
      }

      const trip = await tripServer.getById(tripId);

      if (trip) {
        router.navigate(`trip/${trip.id}`);
      }
    } catch (error) {
      console.error(error);

      setIsGettingTrip(false);
    }
  }

  useEffect(() => {
    getTrip();
  }, []);

  if (isGettingTrip) {
    return <Loading />;
  }

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image
        source={require("@/assets/logo.png")}
        className="h-8"
        resizeMode="contain"
      />
      <Image source={require("@/assets/bg.png")} className="absolute" />
      <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
        Convide seus amigos e planeje sua{"\n"}próxima viagem
      </Text>
      <View className="w-full bg-zinc-900 p-4 rounded-xl my-8 border border-zinc-800">
        <Input>
          <MapPin color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Para onde?"
            editable={stepForm === StepForm.TRIP_DETAILS}
            onChangeText={setDestination}
            value={destination}
          />
        </Input>
        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Quando?"
            editable={stepForm === StepForm.TRIP_DETAILS}
            onFocus={() => Keyboard.dismiss()}
            showSoftInputOnFocus={false}
            onPressIn={() =>
              stepForm === StepForm.TRIP_DETAILS && setShowModal(MODAL.CALENDAR)
            }
            value={selectedDates.formatDatesInText}
          />
        </Input>
        {stepForm === StepForm.ADD_EMAIL && (
          <>
            <View className="border-b py-3 border-zinc-800">
              <Button
                variant="secondary"
                onPress={() => setStepForm(StepForm.TRIP_DETAILS)}
              >
                <Button.Title>Alterar local/data</Button.Title>
                <Settings2 color={colors.zinc[200]} size={20} />
              </Button>
            </View>
            <Input>
              <UserRoundPlus color={colors.zinc[400]} size={20} />
              <Input.Field
                placeholder="Quem estará na viagem?"
                autoCorrect={false}
                showSoftInputOnFocus={false}
                value={
                  emailsToInvite.length > 0
                    ? `${emailsToInvite.length} pessoa(s) convidada(s)`
                    : ""
                }
                onPressIn={() => {
                  Keyboard.dismiss();

                  setShowModal(MODAL.GUESTS);
                }}
              />
            </Input>
          </>
        )}
        <Button onPress={handleNextStepForm} isLoading={isCreatingTrip}>
          <Button.Title>
            {stepForm === StepForm.TRIP_DETAILS
              ? "Continuar"
              : "Confirmar Viagem"}
          </Button.Title>
          <ArrowRight color={colors.lime[950]} size={20} />
        </Button>
      </View>
      <Text className="text-zinc-500 font-regular text-center text-base">
        Ao planejar sua viagem pela plann.er você automaticamente concorda com
        nossos{" "}
        <Text className="text-zinc-300 underline">
          termos de uso e políticas de privacidade.
        </Text>
      </Text>
      <Modal
        title="Selecionar datas"
        subtitle="Selecione a data de ida e volta da viagem."
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="gap-4 mt-4">
          <Calendar
            minDate={dayjs().toISOString()}
            onDayPress={handleSelectDate}
            markedDates={selectedDates.dates}
          />
          <Button onPress={() => setShowModal(MODAL.NONE)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>
      <Modal
        title="Selecionar convidados"
        subtitle="Os convidados irão receber e-mails para confirmar a participação na viagem."
        visible={showModal === MODAL.GUESTS}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="my-2 flex-wrap gap-2 border-b border-zinc-800 py-5 items-start">
          {emailsToInvite.length > 0 ? (
            emailsToInvite.map((email) => {
              return (
                <GuestEmail
                  key={email}
                  email={email}
                  onRemove={() => handleRemoveEmail(email)}
                />
              );
            })
          ) : (
            <Text className="text-zinc-600 text-base font-regular">
              Nenhum e-mail adicionado.
            </Text>
          )}
        </View>
        <View className="gap-4 mt-4">
          <Input variant="secondary">
            <AtSign color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Digite o e-mail do convidado"
              keyboardType="email-address"
              onChangeText={(text) => setEmailToInvite(text.toLowerCase())}
              value={emailToInvite}
              returnKeyType="send"
              onSubmitEditing={handleAddEmail}
            />
          </Input>
          <Button onPress={handleAddEmail}>
            <Button.Title>Convidar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
