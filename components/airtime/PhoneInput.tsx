import React from "react";
import { View, Text, TextInput } from "react-native";
import { useAppSelector } from "~/store/hooks";

interface PhoneInputProps {
    value: string;
    setValue: (val: string) => void;
}

export default function PhoneInput({ value, setValue }: PhoneInputProps) {
    const { flow_type } = useAppSelector((state) => state.airtime);
    const isA = flow_type === "A";

    return (
        <View>
            <Text className="text-white mb-2">
                {isA ? "Ingresa número celular" : "Número de cuenta"}
            </Text>

            <View className="flex-row items-center bg-white rounded-2xl px-2 py-2">
                <View className="px-3 py-2 bg-purple-100 rounded-xl mr-2">
                    <Text className="text-purple-700 font-bold">
                        {isA ? "+52" : "Cuenta"}
                    </Text>
                </View>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={{ flex: 1, height: "100%" }}
                    keyboardType={isA ? "phone-pad" : "default"}
                    placeholder={isA ? "6641235678" : "Ej. 1234567890"}
                    placeholderTextColor="#9CA3AF"
                />
            </View>
        </View>
    );
}
