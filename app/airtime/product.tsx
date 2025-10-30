import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    ScrollView,
    LayoutAnimation,
    Platform,
    UIManager,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useCreateAirtimeMutation, useGetAirtimeProductsMutation } from "../../store/api/airtimeApi";
import { setAirtimeInformation } from "../../store/airtimeSlice";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import PhoneInput from "~/components/airtime/PhoneInput";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProductSelection() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { accountid_phone, category_name, carrier_name, flow_type } = useAppSelector(
        (state) => state.airtime
    );

    const [getProducts, { data, isLoading }] = useGetAirtimeProductsMutation();
    const [createAirtime] = useCreateAirtimeMutation();

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [customAmount, setCustomAmount] = useState<string>("");

    const digitsOnly = (accountid_phone || "").replace(/\D/g, "");
    const isValidAccount =
        flow_type === "A"
            ? digitsOnly.length === 10
            : (accountid_phone || "").trim().length >= 3;

    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isLoadingModal) {
            progressAnim.setValue(0);
            Animated.loop(
                Animated.sequence([
                    Animated.timing(progressAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: false,
                    }),
                    Animated.timing(progressAnim, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        } else {
            progressAnim.stopAnimation();
            progressAnim.setValue(0);
        }
    }, [isLoadingModal]);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    useEffect(() => {
        if (category_name && carrier_name && flow_type) {
            getProducts({
                category: category_name,
                carrier: carrier_name,
                flowType: flow_type,
            }).then((res) => {
                console.log("📡 Products response:", res.data?.data);
            });
        }
    }, [category_name, carrier_name, flow_type]);

    const handleSelect = (item: any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const willExpand = expandedId !== item.ProductId;
        setSelectedId(item.ProductId);
        setExpandedId(willExpand ? item.ProductId : null);

        dispatch(
            setAirtimeInformation({
                accountid_phone,
                category_name,
                carrier_name,
                product_id: item.ProductId,
                product_name: item.ProductName,
                amount: item.Amount,
            })
        );
        setCustomAmount("");
    };

    const selectedItem = data?.data?.find((x: any) => x.ProductId === selectedId);

    const minAmount = parseFloat(selectedItem?.AmountMin || "0");
    const maxAmount = parseFloat(selectedItem?.AmountMax || "0");
    const fee = parseFloat(selectedItem?.Fee || "0");
    const inputAmount = parseFloat(customAmount || "0");

    const isAmountValid =
        flow_type !== "B" ||
        (!isNaN(inputAmount) && inputAmount >= minAmount && inputAmount <= maxAmount);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 bg-white">
                    <View className="bg-main px-6 pt-8 pb-6">
                        <PhoneInput
                            value={accountid_phone}
                            setValue={(val) => dispatch(setAirtimeInformation({ accountid_phone: val }))}
                        />
                    </View>

                    <ScrollView
                        className="flex-1 px-6 py-6"
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Text className="text-xl font-bold mb-6">Selecciona el monto</Text>

                        {isLoading ? (
                            <ActivityIndicator size="large" color="#6924ff" />
                        ) : (
                            data?.data?.map((item: any) => {
                                const isSelected = selectedId === item.ProductId;
                                const isExpanded = expandedId === item.ProductId;

                                return (
                                    <TouchableOpacity
                                        key={item.ProductId}
                                        onPress={() => handleSelect(item)}
                                        activeOpacity={0.9}
                                        className={`rounded-2xl border px-5 py-4 mb-4 ${isSelected
                                                ? "bg-purple-100 border-purple-600"
                                                : "bg-gray-50 border-gray-200"
                                            }`}
                                    >
                                        <View className="flex-row items-center justify-between">
                                            <View className="flex-row items-center flex-1">
                                                <Image
                                                    source={{ uri: item.URLImage }}
                                                    style={{ width: 50, height: 50, marginRight: 12 }}
                                                    contentFit="contain"
                                                />
                                                <View className="flex-1">
                                                    <Text
                                                        className={`text-base font-semibold ${isSelected ? "text-purple-700" : "text-gray-800"
                                                            }`}
                                                    >
                                                        {item.ProductName}
                                                    </Text>

                                                    {flow_type !== "B" && (
                                                        <Text className="text-gray-600 text-sm mt-1">
                                                            ${parseFloat(item.Amount).toFixed(2)}
                                                            {item.Fee > 0 &&
                                                                ` + Fee $${parseFloat(item.Fee).toFixed(2)}`}
                                                        </Text>
                                                    )}
                                                </View>
                                            </View>
                                            <AntDesign
                                                name="right"
                                                size={20}
                                                color={isSelected ? "#6b21a8" : "#9CA3AF"}
                                            />
                                        </View>

                                        {isExpanded && (
                                            <View className="mt-4 bg-purple-50 rounded-xl px-4 py-3">
                                                <Text className="text-purple-800 text-sm text-center mb-2">
                                                    {item.ToolTip}
                                                </Text>

                                                {flow_type === "B" && (
                                                    <View className="mt-2">
                                                        <Text className="text-gray-700 text-sm mb-1">
                                                            Ingresa el monto a pagar
                                                        </Text>
                                                        <TextInput
                                                            value={customAmount}
                                                            onChangeText={setCustomAmount}
                                                            keyboardType="numeric"
                                                            placeholder={`Min ${item.AmountMin} - Max ${item.AmountMax}`}
                                                            className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                                                        />
                                                        {!isAmountValid && customAmount.length > 0 && (
                                                            <Text className="text-red-500 text-xs mt-1">
                                                                El monto debe estar entre ${item.AmountMin} y $
                                                                {item.AmountMax}
                                                            </Text>
                                                        )}
                                                        {item.Fee > 0 && (
                                                            <Text className="text-gray-500 text-xs mt-2 text-center">
                                                                Fee adicional: ${parseFloat(item.Fee).toFixed(2)}
                                                            </Text>
                                                        )}
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })
                        )}
                    </ScrollView>

                    <View className="px-6 pb-6 bg-white ">
                        <TouchableOpacity
                            disabled={
                                !selectedId ||
                                !isValidAccount ||
                                (flow_type === "B" && (!customAmount || !isAmountValid))
                            }
                            onPress={async () => {
                                if (!selectedId || !isValidAccount) return;
                                const selected = data?.data?.find(
                                    (x: any) => x.ProductId === selectedId
                                );
                                if (!selected) return;

                                setModalVisible(true);
                                setIsLoadingModal(true);

                                try {
                                    const body = {
                                        product_id: selected.ProductId,
                                        carrier_name,
                                        product_name: selected.ProductName,
                                        accountid_phone,
                                        amount:
                                            flow_type === "B"
                                                ? parseFloat(customAmount)
                                                : parseFloat(selected.Amount),
                                        fee: parseFloat(selected.Fee || 0),
                                        flowType: flow_type,
                                    };

                                    const res: any = await createAirtime(body).unwrap();
                                    setTimeout(() => {
                                        setIsLoadingModal(false);
                                        if (res?.status) {
                                            setModalMessage("✅ Recarga completada correctamente");
                                        } else {
                                            setModalMessage(
                                                res?.message || "Error al completar la recarga"
                                            );
                                        }
                                    }, 1500);
                                } catch (err) {
                                    console.error("❌ Error al procesar recarga:", err);
                                    setIsLoadingModal(false);
                                    setModalMessage("Error al procesar recarga");
                                }
                            }}
                            className={`py-4 rounded-xl ${selectedId &&
                                    isValidAccount &&
                                    (flow_type !== "B" || (customAmount && isAmountValid))
                                    ? "bg-purple-700"
                                    : "bg-gray-400"
                                }`}
                        >
                            <Text className="text-center text-white text-lg font-bold">
                                {selectedId
                                    ? (() => {
                                        const amount =
                                            flow_type === "B"
                                                ? parseFloat(customAmount || "0")
                                                : parseFloat(selectedItem?.Amount || "0");
                                        const fee = parseFloat(selectedItem?.Fee || "0");
                                        const total = amount + fee;

                                        return fee > 0
                                            ? `Completar $${amount.toFixed(2)} + $${fee.toFixed(
                                                2
                                            )} = $${total.toFixed(2)}`
                                            : `Completar $${amount.toFixed(2)}`;
                                    })()
                                    : "Selecciona un producto"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Modal transparent visible={modalVisible} animationType="fade">
                        <View className="flex-1 bg-black/50 justify-center items-center px-8">
                            <View className="bg-white w-full rounded-2xl p-6 items-center">
                                {isLoadingModal ? (
                                    <>
                                        <Text className="text-lg font-semibold text-gray-800 text-center mb-6">
                                            Realizando recarga de {carrier_name}
                                        </Text>
                                        <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
                                            <Animated.View
                                                style={{
                                                    height: "100%",
                                                    width: progressWidth,
                                                    borderRadius: 6,
                                                    backgroundColor: "#6b21a8",
                                                }}
                                            />
                                        </View>
                                        <Text className="text-sm text-gray-500 text-center">
                                            Este proceso puede tardar un momento...
                                        </Text>
                                    </>
                                ) : modalMessage.includes("✅") ? (
                                    <>
                                        <Text className="text-center text-lg font-semibold text-green-700 mb-6">
                                            Recarga exitosa
                                        </Text>
                                        <Text className="text-gray-700 text-center mb-6">
                                            {modalMessage}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModalVisible(false);
                                                router.replace("/");
                                            }}
                                            className="bg-green-600 rounded-xl px-6 py-3"
                                        >
                                            <Text className="text-white text-base font-bold text-center">
                                                Regresar al inicio
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <Text className="text-center text-lg font-semibold text-gray-800 mb-6">
                                            {modalMessage}
                                        </Text>
                                        <View className="flex-row justify-between w-full">
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalVisible(false);
                                                    router.replace("/");
                                                }}
                                                className="flex-1 bg-purple-700 rounded-xl px-4 py-3 mr-2"
                                            >
                                                <Text className="text-white text-base font-bold text-center">
                                                    Regresar al inicio
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalVisible(false);
                                                    setIsLoadingModal(false);
                                                    setModalMessage("");
                                                }}
                                                className="flex-1 bg-gray-300 rounded-xl px-4 py-3 ml-2"
                                            >
                                                <Text className="text-gray-800 text-base font-bold text-center">
                                                    Reintentar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </View>
                        </View>
                    </Modal>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
