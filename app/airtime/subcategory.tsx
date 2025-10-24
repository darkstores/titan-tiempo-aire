import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAirtimeInformation } from "../../store/airtimeSlice";
import { useGetAirtimeSubcategoriesMutation } from "~/store/api/airtimeApi";

export default function SubCategoriaScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { category_name } = useAppSelector((state) => state.airtime);

    const [getSubCategories, { data, isLoading }] = useGetAirtimeSubcategoriesMutation();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (category_name) {
            getSubCategories({ category: category_name } as any)
                .then((res) => console.log("📡 Subcategorías:", res.data?.data))
                .catch((err) => console.error("❌ Error al obtener subcategorías:", err));
        }
    }, [category_name]);

    const handleSelectSubCategory = (subcat: string, id: number) => {
        setSelectedId(id);
        dispatch(setAirtimeInformation({ subcategory_name: subcat } as any));
    };

    const handleNext = () => {
        if (selectedId === null) return;
        router.push("/airtime/carrier");
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView className="flex-1 px-6 mt-6">
                <Text className="text-xl font-bold mb-4">
                    {`Subcategorías de ${(category_name || "").toLowerCase()}`}
                </Text>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#6b21a8" />
                ) : (
                    data?.data?.map((subcat: any, idx: number) => {
                        const isSelected = selectedId === idx;

                        return (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => handleSelectSubCategory(subcat.ProductSubCategory, idx)}
                                className={`relative overflow-hidden rounded-2xl px-5 py-10 mb-5 ${isSelected ? "bg-purple-600" : "bg-purple-900"
                                    }`}
                                activeOpacity={0.9}
                            >
                                <Text className="text-white font-extrabold text-2xl pr-32">
                                    {subcat.ProductSubCategory
                                        ? subcat.ProductSubCategory.charAt(0).toUpperCase() +
                                        subcat.ProductSubCategory.slice(1).toLowerCase()
                                        : ""}
                                </Text>
                                <Image
                                    source={require("../../assets/img/airtime/servicios.png")}
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
                    disabled={selectedId === null}
                    onPress={handleNext}
                    className={`py-4 rounded-xl ${selectedId !== null ? "bg-purple-700" : "bg-gray-400"
                        }`}
                >
                    <Text className="text-center text-white text-lg font-bold">Siguiente</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
