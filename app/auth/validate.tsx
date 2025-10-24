// app/auth/validate.tsx
import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ValidateCodeScreen() {
  const router = useRouter();

  const handleValidate = () => {
    console.log("Código validado 🚀");
    router.push("/(tabs)");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === "ios" ? 20 : 100}
    >
      <View className="flex-1 bg-main">
        {/* Parte superior con logo */}
        <View className="flex-[0.4] relative items-center justify-center">
          <TouchableOpacity
            className="absolute top-12 left-6 p-2 rounded-full bg-white/20"
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>

          <Image
            source={require("../../assets/img/logos/isotipo_white.png")}
            contentFit="contain"
            style={{ width: 120, height: 120 }}
          />
        </View>

        {/* Parte inferior */}
        <View className="flex-[0.6] bg-white rounded-t-3xl px-6 py-8">
          <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Ingresa tu código
          </Text>
          <Text className="text-gray-600 mb-8 text-center">
            Hemos enviado un código de 4 dígitos a tu teléfono.
          </Text>

          <TextInput
            className="border border-gray-300 rounded-xl text-center text-3xl tracking-[15px] py-4 mb-6 bg-gray-50"
            keyboardType="number-pad"
            maxLength={4}
            placeholder="----"
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity
            className="bg-main py-4 rounded-lg shadow-sm"
            onPress={handleValidate}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Validar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-6">
            <Text className="text-main text-center font-medium">
              Reenviar código
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
