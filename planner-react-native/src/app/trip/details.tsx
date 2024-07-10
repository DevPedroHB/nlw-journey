import React from "react";
import { Text, View } from "react-native";

interface IDetails {
  tripId: string;
}

export function Details({ tripId }: IDetails) {
  return (
    <View className="flex-1">
      <Text className="text-zinc-50">{tripId}</Text>
    </View>
  );
}
