import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AirtimeLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6924ff" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Tipo de venta",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 0 }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="category" options={{ title: "Selecciona Categoría" }} />
      <Stack.Screen name="subcategory" options={{ title: "Selecciona Subcategoría" }} />
      <Stack.Screen name="carrier" options={{ title: "Selecciona Compañía" }} />
      <Stack.Screen name="product" options={{ title: "Selecciona Monto" }} />
      <Stack.Screen
        name="detail"
        options={{
          title: "Detalle de Transacción",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 0 }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
     
    </Stack>
  );
}
