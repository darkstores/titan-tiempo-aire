import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileLayout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: "#6924ff" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
                headerTitleAlign: "center",
            }}
        >
            <Stack.Screen
                name="information"
                options={{
                    title: "Mi información",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 0 }}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="support"
                options={{
                    title: "Soporte",
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
