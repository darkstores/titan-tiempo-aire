import { View, Text, Image, ImageBackground, Pressable, ActivityIndicator, ScrollView, Platform } from "react-native";
import { useState } from "react";

export default function AirtimeIntroScreen() {
    const [loadingApply, setLoadingApply] = useState(false);

    const FuncApplyAirtime = () => {
        setLoadingApply(true);
        setTimeout(() => setLoadingApply(false), 1000);
    };

    return (
        <ScrollView className="flex-1 bg-black">
            <ImageBackground
                source={require("../../assets/img/airtime/bg_dark.png")}
                resizeMode="cover"
                className="px-6 pt-20 pb-16"
            >
                {/* Hero Section */}
                <View className="items-center justify-center mt-10">
                    <Text className="text-4xl font-extrabold text-white text-center leading-tight">
                        Gana más.{"\n"}Recarga fácil.
                    </Text>
                    <Text className="text-neutral-300 text-center mt-3 text-base max-w-[80%]">
                        Usa tu cuenta Titan para vender tiempo aire y gana comisión inmediata con cada recarga.
                    </Text>

                    <Image
                        source={require("../../assets/img/airtime/titan_tiempo.png")}
                        className="w-[260px] h-[230px] mt-6"
                        resizeMode="contain"
                    />
                </View>

                {/* Steps Section */}
                <View className="mt-14">
                    <Text className="text-xl font-semibold text-center text-white mb-2">
                        Comienza en 3 pasos
                    </Text>
                    <Text className="text-neutral-400 text-center mb-8">
                        ¡Empieza hoy y conviértete en distribuidor Titan!
                    </Text>

                    <View className="flex-row justify-between items-center mt-4 mb-4">
                        <View className="items-center w-1/3">
                            <Image source={require("../../assets/img/airtime/store.png")} className="w-10 h-10 mb-3" resizeMode="contain" />
                            <Text className="text-white font-semibold text-sm">Regístrate</Text>
                        </View>
                        <View className="items-center w-1/3">
                            <Image source={require("../../assets/img/airtime/hour.png")} className="w-10 h-10 mb-3" resizeMode="contain" />
                            <Text className="text-white font-semibold text-sm">Sé aprobado</Text>
                        </View>
                        <View className="items-center w-1/3">
                            <Image source={require("../../assets/img/airtime/coins.png")} className="w-10 h-10 mb-3" resizeMode="contain" />
                            <Text className="text-white font-semibold text-sm">Comisiona</Text>
                        </View>
                    </View>
                </View>

            
                {/* Commission Explanation */}
                <View className="bg-white/10 rounded-2xl p-5 mt-8 mb-12 border border-white/10">
                    <Text className="text-white text-lg font-semibold mb-2 text-center">
                        ¿Cómo ganas dinero?
                    </Text>
                    <Text className="text-neutral-300 text-sm text-center leading-5">
                        Con Titan Tiempo Aire ganas por cada recarga que vendes.
                        Si haces una recarga de $50, el sistema te cobra un poco menos
                        y tú cobras al cliente el total. Esa diferencia es tu ganancia
                        automática en cada venta.
                    </Text>
                </View>

                <View className="relative mt-10 mb-12 items-center">
                    <View className="absolute -z-10 w-64 h-64 bg-[#7F4CFF]/40 rounded-full blur-3xl" />
                    <Text className="text-white text-xl font-extrabold mb-2 text-center">
                        Gana mientras ayudas a conectar
                    </Text>
                    <Text className="text-neutral-300 text-center text-sm max-w-[80%] leading-5">
                        Cada venta de recarga o servicio suma a tus ingresos.
                        En servicios, el fee de cada transacción es tu ganancia directa.
                    </Text>
                </View>

                {/* Call to Action */}
                <View className="items-center mt-6">
                    <Pressable onPress={FuncApplyAirtime} className="w-full">
                        <View className="h-14 rounded-xl bg-white items-center justify-center shadow-lg shadow-white/10">
                            {loadingApply ? (
                                <ActivityIndicator color="#6924ff" size={26} />
                            ) : (
                                <Text className="text-[#6924ff] font-bold text-base">Comienza ahora</Text>
                            )}
                        </View>
                    </Pressable>

                    <Text className="text-neutral-400 text-center mt-4 text-xs max-w-[90%]">
                        Recargamos cualquier tipo de línea, ya sea prepago o con paquetes completos, para todas las compañías en México.
                    </Text>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}
