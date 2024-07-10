import { colors } from "@/styles/colors";
import { X } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface IGuestEmail {
  email: string;
  onRemove: () => void;
}

export function GuestEmail({ email, onRemove }: IGuestEmail) {
  return (
    <View className="bg-zinc-800 rounded-lg flex-row px-3 py-2 items-center gap-3">
      <Text className="font-regular text-zinc-300 text-base">{email}</Text>
      <TouchableOpacity onPress={onRemove}>
        <X color={colors.zinc[400]} size={16} />
      </TouchableOpacity>
    </View>
  );
}
