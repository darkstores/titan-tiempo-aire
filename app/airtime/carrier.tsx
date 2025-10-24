import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useGetAirtimeCarriersMutation } from "../../store/api/airtimeApi";
import { useEffect, useState } from "react";
import { setAirtimeInformation } from "../../store/airtimeSlice";
import { Image } from "expo-image";
import PhoneInput from "~/components/airtime/PhoneInput";

export default function CarrierSelection() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { accountid_phone, category_name, carrier_name, flow_type } = useAppSelector(
        (state) => state.airtime
    );

    const [getCarriers, { data, isLoading }] = useGetAirtimeCarriersMutation();
    const [selected, setSelected] = useState<string | null>(carrier_name || null);

    useEffect(() => {
        if (category_name && flow_type) {
            getCarriers({ category: category_name, flowType: flow_type }).then((res) => {
                console.log("📡 Carriers response:", res.data?.data);
            });
        }
    }, [category_name, flow_type]);

    const handleSelectCarrier = (carrier: string) => {
        setSelected(carrier);
        dispatch(
            setAirtimeInformation({
                accountid_phone,
                category_name,
                carrier_name: carrier,
            })
        );
    };

    const screenWidth = Dimensions.get("window").width;
    const cardSize = (screenWidth - 48) / 2;

    return (
        <View className="flex-1 bg-white">
            {/* Header fijo con teléfono */}
            {/* <View className="bg-main px-6 pt-8 pb-6">
                <PhoneInput
                    value={accountid_phone}
                    setValue={(val) => dispatch(setAirtimeInformation({ accountid_phone: val }))}
                />
            </View> */}

            {/* Lista de carriers */}
            <View className="flex-1 px-6 py-6">
                <Text className="text-xl font-bold mb-6">Selecciona tu compañía</Text>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#6924ff" />
                ) : (
                    <FlatList
                        data={data?.data || []}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelectCarrier(item.CarrierName)}
                                style={{ width: cardSize, height: cardSize }}
                                className={`mb-4 rounded-2xl border justify-center items-center p-4 ${selected === item.CarrierName
                                        ? "bg-purple-100 border-purple-600"
                                        : "bg-gray-50 border-gray-200"
                                    }`}
                            >
                                <View className="bg-white rounded-xl w-20 h-20 justify-center items-center mb-3 shadow-sm">
                                    <Image
                                        source={{ uri: item.URLImage }}
                                        style={{ width: 60, height: 60 }}
                                        contentFit="contain"
                                    />
                                </View>

                                <Text
                                    className={`text-sm font-semibold text-center ${selected === item.CarrierName ? "text-purple-700" : "text-gray-800"
                                        }`}
                                >
                                    {item.CarrierName}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>

            {/* Botón siguiente */}
            <View className="px-6 pb-6">
                <TouchableOpacity
                    disabled={!selected}
                    onPress={() => router.push("/airtime/product")}
                    className={`py-4 rounded-xl ${selected ? "bg-purple-700" : "bg-gray-400"
                        }`}
                >
                    <Text className="text-center text-white text-lg font-bold">Siguiente</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
