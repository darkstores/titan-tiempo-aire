import React, { useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetAirtimeDetailMutation } from "~/store/api/airtimeApi";
import { Ionicons } from "@expo/vector-icons";

const AirtimeDetail = () => {
    const { transaction_id } = useLocalSearchParams();
    const [getDetail, { data, isLoading, isError }] = useGetAirtimeDetailMutation();

    useEffect(() => {
        if (transaction_id) getDetail({ transaction_id: transaction_id as string });
    }, [transaction_id]);

    const formatter = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    });

    const formatPhoneNumber = (phone: string) => {
        if (!phone) return "";
        const digits = phone.replace(/\D/g, "");
        if (digits.length === 10) return digits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        return phone;
    };

    const formatDate = (utcDate?: string) => {
        if (!utcDate) return "Sin fecha";
        const options: any = {
            year: "numeric",
            month: "short",
            day: "2-digit",
            timeZone: "America/Mexico_City",
        };
        return new Date(utcDate).toLocaleString("es-MX", options);
    };

    const detail = data?.data;
    const success = detail?.response_code === "0" || detail?.response_code === "00";

    if (isLoading)
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#6924FF" />
            </View>
        );

    if (isError || !detail)
        return (
            <View className="flex-1 bg-white items-center justify-center px-6">
                <View className="bg-gray-100 rounded-xl p-4 shadow-sm">
                    <Text className="text-gray-800 font-semibold text-center">
                        No se encontró información
                    </Text>
                </View>
            </View>
        );

    return (
        <ScrollView className="flex-1 bg-white px-5 py-8">
            {/* Header */}
            <View className="items-center mb-8">
                <Ionicons
                    name={success ? "checkmark-circle" : "close-circle"}
                    size={70}
                    color={success ? "#22C55E" : "#EF4444"}
                />
                <Text className="text-2xl font-semibold mt-3 text-gray-900">
                    {success ? "Transacción Exitosa" : "Transacción Fallida"}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">ID #{detail.id}</Text>
            </View>

            {/* Card */}
            <View className="bg-gray-50 rounded-2xl border border-gray-200 p-5 space-y-7 shadow-sm">
                <InfoRow label="Número" value={formatPhoneNumber(detail.account_id_phone)} />
                <InfoRow label="Compañía" value={detail.carrier_name} />
                <InfoRow label="Producto" value={detail.product_name} />
                <InfoRow label="Importe" value={formatter.format(detail.amount ?? 0)} />

                {(detail.fee || detail.Fee) && (
                    <InfoRow label="Fee" value={formatter.format(detail.fee ?? detail.Fee ?? 0)} />
                )}

                <InfoRow
                    label="Autorización"
                    value={detail.carrier_control_no || "Sin información"}
                />

                {detail.response_message && (
                    <View className="mt-2">
                        <Text className="text-gray-500 mb-1">Mensaje</Text>
                        <Text className="text-gray-900 text-base leading-relaxed">
                            {detail.response_message}
                        </Text>
                    </View>
                )}

                <View className="border-t border-gray-200 pt-5">
                    <InfoRow label="Fecha" value={formatDate(detail.created_date)} />
                </View>
                {success && detail.earning != null && !isNaN(Number(detail.earning)) && (
                    <InfoRow
                        label="Ganancia"
                        value={formatter.format(Number(detail.earning))}
                    />
                )}
            </View>

            {/* Button */}
            <TouchableOpacity
                activeOpacity={0.8}
                className="mt-8 bg-purple-700 py-4 rounded-xl items-center"
            >
                <Text className="text-white font-semibold text-base">Descargar Recibo</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View className="flex-row justify-between mt-2">
        <Text className="text-gray-500">{label}</Text>
        <Text className="text-gray-900 font-medium max-w-[60%] text-right">{value}</Text>
    </View>
);

export default AirtimeDetail;
