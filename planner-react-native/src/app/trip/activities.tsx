import React from "react";
import { Text, View } from "react-native";
import type { TripData } from "./[id]";

interface IActivities {
  tripDetails: TripData;
}

export function Activities({ tripDetails }: IActivities) {
  return (
    <View className="flex-1">
      <Text className="text-zinc-50">{tripDetails.destination}</Text>
    </View>
  );
}
