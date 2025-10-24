// app/_layout.tsx
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { Text, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "NotoSans-Regular": require("../assets/fonts/NotoSans-Regular.ttf"),
    "NotoSans-SemiBold": require("../assets/fonts/NotoSans-SemiBold.ttf"),
    "NotoSans-Bold": require("../assets/fonts/NotoSans-Bold.ttf"),
    "NotoSans-Light": require("../assets/fonts/NotoSans-Light.ttf"),
    "NotoSans-ExtraLight": require("../assets/fonts/NotoSans-ExtraLight.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded) {
      const isAuthenticated = false;
      const hasSeenWelcome = false;
 
      if (!hasSeenWelcome) router.replace("/welcome" as any);
      else if (!isAuthenticated) router.replace("/auth" as any);
      else router.replace("/(tabs)");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Cargando fuentes...</Text>;
  }

  return (
    <Provider store={store}>
      {/* 🔹 Esto hace que al tocar fuera se cierre el teclado globalmente */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
}
