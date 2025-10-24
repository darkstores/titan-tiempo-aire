import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAirtimeInformation } from "../../store/airtimeSlice";
import { useGetAirtimeCategoriesMutation } from "../../store/api/airtimeApi";
import PhoneInput from "~/components/airtime/PhoneInput";

export default function CategoriaScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { accountid_phone, category_name, flow_type } = useAppSelector(
        (state) => state.airtime
    );

    const [getCategories, { data, isLoading }] = useGetAirtimeCategoriesMutation();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const isValidNumber =
        flow_type === "A"
            ? accountid_phone && accountid_phone.length === 10
            : accountid_phone && accountid_phone.length >= 3;

    useEffect(() => {
        if (flow_type) {
            getCategories({ flowType: flow_type } as any)
                .then((res) => console.log("📡 Categorías:", res.data?.data))
                .catch((err) => console.error("❌ Error al obtener categorías:", err));
        }
    }, [flow_type]);

    const handleSelectCategory = (cat: string, id: number) => {
        setSelectedId(id);
        dispatch(setAirtimeInformation({ category_name: cat, accountid_phone }));
    };

    const handleNext = () => {
        if (selectedId === null) return;
        if (flow_type === "A") router.push("/airtime/carrier");
        else router.push("/airtime/subcategory");
    };

    return (
        <View className="flex-1 bg-white">
            {/* <View className="bg-main px-6 pt-8 pb-6">
                <PhoneInput
                    value={accountid_phone}
                    setValue={(val) => dispatch(setAirtimeInformation({ accountid_phone: val }))}
                />
            </View> */}

            <ScrollView className="flex-1 px-6 mt-6">
                <Text className="text-xl font-bold mb-4">
                    {flow_type === "A" ? "Categorías de Recargas" : "Categorías de Servicios"}
                </Text>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#6b21a8" />
                ) : (
                    data?.data?.map((cat: any) => {
                        const normalize = (str: string) =>
                            str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

                        const normalizedCategory = normalize(cat.ProductCategory);
                        const normalizedSelected = normalize(category_name);

                        const isSelected =
                            normalizedSelected === normalizedCategory;

                        const imageMap: Record<string, any> = {
                            "solo internet": require("../../assets/img/airtime/mano.png"),
                            "recargas": require("../../assets/img/airtime/refresh.png"),
                            "todo en uno": require("../../assets/img/airtime/allin.png"),
                            "codigos digitales": require("../../assets/img/airtime/codigos.png"),
                            "pago de servicios": require("../../assets/img/airtime/servicios.png"),
                        };

                        return (
                            <TouchableOpacity
                                key={cat.ProductCategory} // ✅ clave única estable
                                onPress={() => {
                                    setSelectedId(cat.ProductCategory); // ✅ usa categoría como id
                                    dispatch(
                                        setAirtimeInformation({
                                            category_name: cat.ProductCategory,
                                            accountid_phone,
                                        })
                                    );
                                }}
                                className={`relative overflow-hidden rounded-2xl px-5 py-10 mb-5 ${isSelected ? "bg-purple-600" : "bg-purple-900"
                                    }`}
                                activeOpacity={0.9}
                            >
                                <Text className="text-white font-extrabold text-2xl pr-32">
                                    {cat.ProductCategory
                                        ? cat.ProductCategory.charAt(0).toUpperCase() +
                                        cat.ProductCategory.slice(1).toLowerCase()
                                        : ""}
                                </Text>
                                <Image
                                    source={
                                        imageMap[normalizedCategory] ||
                                        require("../../assets/img/airtime/servicios.png")
                                    }
                                    className="absolute right-0 top-0 w-32 h-32"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        );
                    })
                )}
            </ScrollView>



            <View className="px-6 pb-6 pt-3 bg-white border-t border-gray-200">
                <TouchableOpacity
                    disabled={!selectedId}
                    onPress={handleNext}
                    className={`py-4 rounded-xl ${selectedId ? "bg-purple-700" : "bg-gray-400"
                        }`}
                >
                    <Text className="text-center text-white text-lg font-bold">Siguiente</Text>
                </TouchableOpacity>

                {/* {!isValidNumber && (
                    <Text className="text-red-500 text-sm mb-2 text-center mt-3">
                        {flow_type === "A"
                            ? "Ingresa un número válido de 10 dígitos"
                            : "Ingresa un número o cuenta válida (mínimo 3 caracteres)"}
                    </Text>
                )} */}
            </View>
        </View>
    );
}
