import { View, Text, TouchableOpacity, Linking } from "react-native";

export default function SupportScreen() {
    return (
        <View className="flex-1 bg-white px-6 py-6">
            <Text className="text-xl font-bold text-gray-900 mb-6">Centro de ayuda</Text>

            <Text className="text-gray-700 mb-4">
                Si necesitas asistencia, contáctanos por los siguientes medios:
            </Text>

            <TouchableOpacity
                className="mb-4 bg-[#6924ff] py-3 rounded-lg"
                onPress={() => Linking.openURL("tel:+526634379688")}
            >
                <Text className="text-center text-white font-semibold">📞 Llamar a soporte MX</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="mb-4 bg-[#6924ff] py-3 rounded-lg"
                onPress={() => Linking.openURL("https://wa.me/5216634379688")}
            >
                <Text className="text-center text-white font-semibold">💬 WhatsApp MX</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="mb-4 bg-[#6924ff] py-3 rounded-lg"
                onPress={() => Linking.openURL("mailto:soporte@familiatitan.com")}
            >
                <Text className="text-center text-white font-semibold">📧 Enviar correo</Text>
            </TouchableOpacity>
        </View>
    );
}
