import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { Image } from "expo-image";
import { CheckCircle, User, HelpCircle, LogOut, Trash2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { clearAuth } from "~/store/loginSlice";
import { useState } from "react";

export default function ProfileScreen() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteText, setDeleteText] = useState("");

    const handleLogout = () => {
        dispatch(clearAuth());
        setShowLogoutConfirm(false);
        router.replace("/welcome" as any);
    };

    const handleDeleteAccount = () => {
        if (deleteText.trim().toLowerCase() === "eliminar cuenta") {
            dispatch(clearAuth());
            setShowDeleteConfirm(false);
            router.replace("/welcome" as any);
        } else {
            alert('Debes escribir "eliminar cuenta" exactamente.');
        }
    };

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-main items-center pt-24 pb-10 rounded-b-3xl shadow-sm">
                <Image
                    source={require("../../assets/img/logos/isotipo_white.png")}
                    contentFit="contain"
                    style={{ width: 90, height: 90 }}
                />
                <Text className="text-2xl font-bold text-white mt-4">
                    Abarrotes Tereza
                </Text>

                <View className="flex-row items-center mt-3 bg-white/20 px-4 py-1.5 rounded-full">
                    <CheckCircle size={18} color="white" />
                    <Text className="text-white ml-2 text-sm font-semibold">
                        Usuario verificado
                    </Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView
                className="flex-1 px-6 mt-6"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Mi cuenta */}
                <View className="bg-white rounded-2xl p-5 shadow-sm mb-5">
                    <Text className="text-lg font-semibold text-gray-900 mb-3">Mi cuenta</Text>

                    <TouchableOpacity
                        className="flex-row items-center py-3"
                        onPress={() => router.push("/profile/information")}
                    >
                        <View className="bg-main/10 p-3 rounded-full mr-3">
                            <User size={22} color="#6b21a8" />
                        </View>
                        <View>
                            <Text className="text-base text-gray-800 font-medium">Mi información</Text>
                            <Text className="text-sm text-gray-500">
                                Edita tu nombre, teléfono y correo
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Soporte */}
                <View className="bg-white rounded-2xl p-5 shadow-sm mb-5">
                    <Text className="text-lg font-semibold text-gray-900 mb-3">Soporte</Text>

                    <TouchableOpacity
                        className="flex-row items-center py-3"
                        onPress={() => router.push("/profile/support")}
                    >
                        <View className="bg-blue-100 p-3 rounded-full mr-3">
                            <HelpCircle size={22} color="#2563eb" />
                        </View>
                        <View>
                            <Text className="text-base text-gray-800 font-medium">Centro de ayuda</Text>
                            <Text className="text-sm text-gray-500">
                                Chatea con soporte o revisa tus dudas
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Botones de acción */}
                <TouchableOpacity
                    onPress={() => setShowLogoutConfirm(true)}
                    className="flex-row items-center justify-center bg-red-500 py-4 rounded-2xl mt-6 shadow-sm"
                >
                    <LogOut size={22} color="white" />
                    <Text className="text-white text-lg font-semibold ml-2">
                        Cerrar sesión
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setShowDeleteConfirm(true)}
                    className="flex-row items-center justify-center bg-gray-200 py-4 rounded-2xl mt-4 mb-12"
                >
                    <Trash2 size={22} color="#6b21a8" />
                    <Text className="text-main text-lg font-semibold ml-2">
                        Eliminar cuenta
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Modal confirmar logout */}
            <Modal transparent visible={showLogoutConfirm} animationType="fade">
                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                    <View className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <Text className="text-xl font-semibold mb-3 text-center">
                            ¿Cerrar sesión?
                        </Text>
                        <Text className="text-gray-500 text-center mb-6">
                            Se cerrará tu sesión actual.
                        </Text>
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                className="bg-gray-200 flex-1 py-3 rounded-xl mr-2"
                                onPress={() => setShowLogoutConfirm(false)}
                            >
                                <Text className="text-center font-semibold text-gray-700">
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-red-500 flex-1 py-3 rounded-xl ml-2"
                                onPress={handleLogout}
                            >
                                <Text className="text-center font-semibold text-white">
                                    Cerrar sesión
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal eliminar cuenta */}
            <Modal transparent visible={showDeleteConfirm} animationType="fade">
                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                    <View className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <Text className="text-xl font-semibold mb-3 text-center">
                            Confirmar eliminación
                        </Text>
                        <Text className="text-gray-500 text-center mb-4">
                            Escribe <Text className="font-semibold">"eliminar cuenta"</Text> para confirmar.
                        </Text>
                        <TextInput
                            className="border border-gray-300 rounded-xl py-3 px-4 mb-5 text-center"
                            placeholder="eliminar cuenta"
                            value={deleteText}
                            onChangeText={setDeleteText}
                        />
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                className="bg-gray-200 flex-1 py-3 rounded-xl mr-2"
                                onPress={() => setShowDeleteConfirm(false)}
                            >
                                <Text className="text-center font-semibold text-gray-700">
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-red-500 flex-1 py-3 rounded-xl ml-2"
                                onPress={handleDeleteAccount}
                            >
                                <Text className="text-center font-semibold text-white">
                                    Eliminar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
