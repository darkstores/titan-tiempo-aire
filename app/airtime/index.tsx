import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { globalStyles } from "~/globalStyles";
import { useAppDispatch } from "~/store/hooks";
import { setAirtimeInformation } from "~/store/airtimeSlice";

export default function AirtimeCategory() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <View className="flex-1 px-6 py-6 bg-white pb-12">
            {/* Tiempo Aire */}
            <TouchableOpacity
                onPress={() => {
                    dispatch(setAirtimeInformation({ flow_type: "A" }));
                    router.push("/airtime/category");
                }}
            >
                <View
                    className="bg-main p-6 pb-6 mb-5"
                    style={[globalStyles.shadowCard, globalStyles.card_rounded]}
                >
                    <Text className="text-3xl font-bold text-white mb-2 text-center font-noto-bold">
                        Tiempo aire y Codigos Digitales
                    </Text>
                    <View className="items-center">
                        <Text className="text-white text-lg text-center mt-4 max-w-[280px]">
                            Vende recargas en segundos y gana tu comisión al instante.
                        </Text>
                    </View>
                    <View className="items-center">
                        <Image
                            source={require("../../assets/img/airtime/5g.png")}
                            contentFit="contain"
                            transition={1000}
                            style={{ width: 200, height: 200 }}
                            className="mb-8"
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {/* Pago de servicios */}
            <TouchableOpacity
                onPress={() => {
                    dispatch(setAirtimeInformation({ flow_type: "B" }));
                    router.push("/airtime/category");
                }}
            >
                <View
                    className="bg-main p-6 pb-6 mb-10"
                    style={[globalStyles.shadowCard, globalStyles.card_rounded]}
                >
                    <Text className="text-3xl font-bold text-white mb-2 text-center font-noto-bold">
                        Pago de servicios
                    </Text>
                    <View className="items-center">
                        <Text className="text-white text-lg text-center mt-4 max-w-[280px]">
                            Cobra luz, agua, internet y más de forma fácil y rápida.
                        </Text>
                    </View>
                    <View className="items-center">
                        <Image
                            source={require("../../assets/img/airtime/servicios.png")}
                            contentFit="contain"
                            transition={1000}
                            style={{ width: 200, height: 200 }}
                            className="mb-8"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
