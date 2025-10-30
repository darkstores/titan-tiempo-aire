import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useCreateSmsVerificationMutation,
  useLoginMutation,
} from "~/store/api/authApi";
import { setCredentials } from "~/store/loginSlice";
import { useAppDispatch } from "~/store/hooks";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isPhoneMode, setIsPhoneMode] = useState(true);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createSmsVerification] = useCreateSmsVerificationMutation();
  const [login] = useLoginMutation();

  const handleContinue = async () => {
    try {
      if (isPhoneMode) {
        const phoneClean = phone.trim();
        const regex = /^[0-9]{10}$/;
        if (!regex.test(phoneClean)) {
          alert("Número de teléfono inválido. Usa 10 dígitos.");
          return;
        }
        const res = await createSmsVerification({ phone: `+52${phoneClean}` }).unwrap();
        if (res.status) router.push({ pathname: "/auth/validate", params: { phone: phoneClean } });
      } else {
        if (!email || !password) {
          alert("Ingresa correo y contraseña");
          return;
        }
        const res = await login({ email, pass: password }).unwrap();
        if (res.status) {
          dispatch(setCredentials(res.data));
          router.push("/(tabs)");
        } else {
          alert(res.message || "Credenciales incorrectas");
        }
      }
    } catch {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <View className="flex-1 bg-main">
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

      <KeyboardAwareScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 60 }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === "ios" ? 20 : 100}
      >
        <Text className="text-2xl font-bold text-gray-900 mb-2">Bienvenido</Text>
        <Text className="text-gray-600 mb-6">
          {isPhoneMode
            ? "Ingresa tu número de teléfono para recibir un código de acceso."
            : "Inicia sesión con tu correo y contraseña."}
        </Text>

        {isPhoneMode ? (
          <View className="flex-row items-center bg-white rounded-xl px-3 py-3 border border-gray-300 mb-6">
            <View className="px-3 py-2 bg-purple-100 rounded-xl mr-2">
              <Text className="text-purple-700 font-bold">+52</Text>
            </View>
            <TextInput
              style={{ flex: 1, height: "100%" }}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
              maxLength={10}
              placeholder="6641235678"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        ) : (
          <>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
              placeholder="Correo electrónico"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
              placeholder="Contraseña"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </>
        )}

        <TouchableOpacity className="bg-main py-4 rounded-lg" onPress={handleContinue}>
          <Text className="text-white text-center font-semibold text-lg">Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-6" onPress={() => setIsPhoneMode(!isPhoneMode)}>
          <Text className="text-center text-purple-600 font-semibold">
            {isPhoneMode ? "Iniciar sesión con correo y contraseña" : "Usar número de teléfono"}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
