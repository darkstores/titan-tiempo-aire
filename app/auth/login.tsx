import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLoginMutation } from "~/store/api/authApi";
import { useAppDispatch } from "~/store/hooks";
import { setCredentials } from "~/store/loginSlice";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const [pass, setPassword] = useState("");
  const [login] = useLoginMutation();

  const handleContinue = async () => {
    try {
      const res = await login({ phone: "+526647945661", pass: "RRpassword6234!" }).unwrap();
      if (res.status && res.data.token) {
        dispatch(setCredentials(res.data));
        router.push("/auth/validate");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === "ios" ? 20 : 100}
    >
      <View className="flex-1 bg-main">
        {/* Parte superior */}
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
          <Text className="text-2xl font-bold text-gray-900 mb-2">Bienvenido</Text>
          <Text className="text-gray-600 mb-6">
            Ingresa tu número de teléfono para crear una cuenta o iniciar sesión.
          </Text>

          <View className="flex-row items-center bg-white rounded-xl px-3 py-3 border border-gray-300 mb-6">
            <View className="px-3 py-2 bg-purple-100 rounded-xl mr-2">
              <Text className="text-purple-700 font-bold">+52</Text>
            </View>
            <TextInput
              style={{ flex: 1, height: "100%" }}
              keyboardType="phone-pad"
              placeholder="6641235678"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity className="bg-main py-4 rounded-lg" onPress={handleContinue}>
            <Text className="text-white text-center font-semibold text-lg">
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
