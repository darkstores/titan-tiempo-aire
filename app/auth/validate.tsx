import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useValidateSmsCodeMutation } from "~/store/api/authApi";
import { useState } from "react";
import { setCredentials } from "~/store/loginSlice";
import { useAppDispatch } from "~/store/hooks";

export default function ValidateCodeScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [validateSmsCode] = useValidateSmsCodeMutation();
  const dispatch = useAppDispatch();

  const handleValidate = async () => {
    try {
      const res = await validateSmsCode({ phone: `+52${phone}`, code }).unwrap();
      if (res.status) {
        dispatch(setCredentials(res.data));
        router.push("/(tabs)");
      } else alert(res.message);
    } catch {
      alert("Error validando código");
    }
  };

  return (
    <View className="flex-1 bg-main">
      {/* Header fijo */}
      <View className="items-center justify-center pt-20 pb-10 relative">
        <TouchableOpacity
          className="absolute top-12 left-6 p-2 rounded-full bg-white/20"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={require("../../assets/img/logos/isotipo_white.png")}
          contentFit="contain"
          style={{ width: 120, height: 190 }}
        />

        
      </View>

      {/* Parte blanca scrolleable */}
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 32,
          paddingBottom: 60,
        }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === "ios" ? 20 : 100}
      >
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
          value={code}
          onChangeText={setCode}
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

        <TouchableOpacity className="mt-6" onPress={() => router.back()}>
          <Text className="text-main text-center font-medium">
            Reenviar código
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
