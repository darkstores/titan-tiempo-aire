// app/_layout.tsx
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, RootState } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadCredentials } from "../store/loginSlice";

function NavigatorContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [loadingSession, setLoadingSession] = useState(true);

  // Cargar sesión persistida antes de renderizar
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("auth");
      if (stored) dispatch(loadCredentials(JSON.parse(stored)));
      setLoadingSession(false);
    })();
  }, []);

  // Redirigir solo después de cargar sesión
  useEffect(() => {
    if (!loadingSession) {
      if (token) router.replace("/(tabs)");
      else router.replace("/welcome" as any);
    }
  }, [token, loadingSession]);

  if (loadingSession) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "NotoSans-Regular": require("../assets/fonts/NotoSans-Regular.ttf"),
    "NotoSans-SemiBold": require("../assets/fonts/NotoSans-SemiBold.ttf"),
    "NotoSans-Bold": require("../assets/fonts/NotoSans-Bold.ttf"),
    "NotoSans-Light": require("../assets/fonts/NotoSans-Light.ttf"),
    "NotoSans-ExtraLight": require("../assets/fonts/NotoSans-ExtraLight.ttf"),
  });

  if (!fontsLoaded) return <Text>Cargando fuentes...</Text>;

  return (
    <Provider store={store}>
      <NavigatorContent />
    </Provider>
  );
}
