import { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";

export default function InformationScreen() {
    const [form, setForm] = useState({
        nombre: "Rodolfo Rodríguez",
        correo: "rr@gmail.com",
        telefono: "+52 664 794 5661",
        direccion: "Calle Tenango",
        estado: "Ciudad de México",
        ciudad: "Ciudad de México",
        cp: "10369",
        pais: "México",
    });

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleSave = () => {
        Alert.alert("Datos guardados", "La información del usuario se ha actualizado correctamente.");
    };

    return (
        <ScrollView className="flex-1 bg-white px-6 py-6">
            <Text className="text-xl font-bold text-gray-900 mb-6">Datos de usuario</Text>

            {Object.entries({
                nombre: "Nombre completo",
                correo: "Correo",
                telefono: "Teléfono",
                direccion: "Dirección",
                estado: "Estado",
                ciudad: "Ciudad",
                cp: "Código Postal",
                pais: "País",
            }).map(([key, label]) => (
                <View key={key} className="mb-4">
                    <Text className="text-gray-700 mb-1">{label}</Text>
                    <TextInput
                        value={form[key as keyof typeof form]}
                        onChangeText={(value) => handleChange(key, value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
                    />
                </View>
            ))}

            <TouchableOpacity
                onPress={handleSave}
                activeOpacity={0.8}
                className="mt-6 bg-purple-700 py-4 rounded-xl items-center"
            >
                <Text className="text-white font-semibold text-base">Guardar Cambios</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
