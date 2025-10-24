import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { CheckCircle, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            {/* Header fijo */}
            <View className="bg-main items-center pt-24 pb-10">
                <Image
                    source={require("../../assets/img/logos/isotipo_white.png")}
                    contentFit="contain"
                    style={{ width: 80, height: 80 }}
                />
                <Text className="text-xl font-bold text-white mt-4">
                    Abarrotes Tereza
                </Text>

                {/* Badge */}
                <View className="flex-row items-center mt-3 bg-green-100 px-3 py-1 rounded-full">
                    <CheckCircle size={16} color="green" />
                    <Text className="text-green-700 ml-2 text-sm font-semibold">
                        Usuario Verificado
                    </Text>
                </View>
            </View>

            {/* Contenido scrolleable */}
            <ScrollView className="flex-1">
                <View className="px-6 py-6">
                    {/* Mi cuenta */}
                    <Text className="text-lg font-bold text-gray-900 mb-4">Mi cuenta</Text>
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4 border-b border-gray-200"
                        onPress={() => router.push("/profile/information")} // 👈 link a info
                    >
                        <Text className="text-base text-gray-800">Mi información</Text>
                        <ChevronRight size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    {/* Ayuda */}
                    <Text className="text-lg font-bold text-gray-900 mt-8 mb-4">Ayuda</Text>
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4 border-b border-gray-200"
                        onPress={() => router.push("/profile/support")} // 👈 link a soporte
                    >
                        <Text className="text-base text-gray-800">Soporte</Text>
                        <ChevronRight size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
