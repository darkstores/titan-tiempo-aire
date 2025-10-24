import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { globalStyles } from "globalStyles";

export default function WelcomeTwo() {
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-white px-6 pt-16">
            {/* Forzar status bar oscuro */}
            <StatusBar style="dark" />

            {/* Logo */}
            <View className="items-center">
                <Image
                    source={require("../../assets/img/logos/titan-logo.png")}
                    contentFit="contain"
                    transition={1000}
                    style={{ width: 100, height: 100 }}
                    className="mb-8"
                />
            </View>

            {/* Card bienvenida */}
            <View
                className="bg-white p-8 mb-8"
                style={[globalStyles.shadowCard, globalStyles.card_rounded]}
            >
                <Text className="text-3xl text-gray-900 mb-6 font-noto-bold">
                    Bienvenido a la familia Titan
                </Text>
                <Text className="text-gray-600 mb-6 text-lg mb-8">
                    Únete a nuestra plataforma y empieza a vender recargas de tiempo aire
                    de forma sencilla. Genera ingresos extra y haz crecer tu negocio desde
                    tu celular.
                </Text>

                <TouchableOpacity
                    className="bg-main rounded-lg py-4"
                    onPress={() => router.push("/auth/login")}
                >
                    <Text className="text-white text-center font-semibold">
                        Inicia Sesión
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Segunda sección */}
            <View className="bg-main p-6 pb-0 mb-10" style={[globalStyles.shadowCard, globalStyles.card_rounded]} >
                <Text className="text-3xl font-bold text-white mb-2 text-center font-noto-bold">
                    Tiempo aire {"\n"} fácil y rápido
                </Text>
                <Text className="text-white text-lg text-center mt-4">
                    Con Titan puedes vender recargas en segundos, recibir tu comisión de
                    inmediato y ofrecer un servicio rápido y confiable a tus clientes.
                </Text>
                <View className="items-center">
                    <Image
                    source={require("../../assets/img/airtime/5g.png")}
                    contentFit="contain"
                    transition={1000}
                    style={{ width: 300, height: 300 }}
                    className="mb-8"
                />
                </View>
                 
            </View>
        </ScrollView>
    );
}
