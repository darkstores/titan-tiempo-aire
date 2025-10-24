import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Alert,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useGetAirtimeAccountBalanceQuery, useGetAirtimeAllQuery } from "~/store/api/airtimeApi";


const formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

export default function TiempoAireScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  // ✅ Hooks RTK Query
  const { data: airtimeBalance, isFetching: loadingBalance, refetch: refetchBalance } =
    useGetAirtimeAccountBalanceQuery();

  const { data: airtimeTransactions, isFetching: loadingTransactions, refetch: refetchTransactions } =
    useGetAirtimeAllQuery();

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copiado", `${text} copiado al portapapeles`);
  };

  const onRefresh = () => {
    refetchBalance();
    refetchTransactions();
  };

  const renderTransaction = ({ item }: any) => (
    <View className="mb-6">
      <Text className="text-gray-500 text-xs mb-1 capitalize">{item.date}</Text>

      {item.transactions.map((t: any) => (
        <TouchableOpacity
          key={t.id}
          onPress={() =>
            router.push({
              pathname: "/airtime/detail",
              params: { transaction_id: t.id },
            })
          }
          className="flex flex-row justify-between items-center mb-3"
        >
          <View className="flex flex-row items-start space-x-3 flex-1">
            <Image
              source={require("../../assets/img/airtime/plane.png")}
              style={{ width: 22, height: 22, marginTop: 2, marginRight: 10 }}
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold capitalize">
                {t.carrier_name} ({t.account_id_phone})
              </Text>
              <Text className="text-gray-700 capitalize">{t.product_name}</Text>
              <Text
                className={`mt-1 text-sm font-medium ${t.response_code === "00" || t.response_code === "0"
                    ? "text-green-600"
                    : "text-red-500"
                  }`}
              >
                {t.response_code === "00" || t.response_code === "0"
                  ? "Exitosa"
                  : "Fallida"}
              </Text>
            </View>
          </View>

          <Text className="text-gray-900 font-semibold">
            {formatter.format(t.amount)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const commissions = airtimeTransactions?.data?.comissions || {
    earnings_today: 0,
    earnings_week: 0,
    earnings_month: 0,
  };

  const groupedTransactions = airtimeTransactions?.data?.grouped_transactions || [];

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView edges={["top"]} className="bg-main">
        <ImageBackground
          source={require("../../assets/img/airtime/bg_prup.png")}
          resizeMode="stretch"
          className="px-6 pt-6 pb-8 rounded-b-2xl"
        >
          <Text className="text-white text-base mb-1">Saldo disponible</Text>
          <Text className="text-4xl text-white font-bold mb-2">
            {formatter.format(airtimeBalance?.data?.availableBalance || 0)}
          </Text>

          <View className="flex flex-row justify-between items-center mt-2">
            <Text className="text-white">
              ID: #{airtimeBalance?.data?.siteId || "—"}
            </Text>

            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-white font-bold mr-1">Depositar</Text>
              <Ionicons name="chevron-forward" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>

      {/* Modal de depósito */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white p-6 rounded-t-2xl pb-12">
            <Text className="text-lg font-bold mb-4">Información Bancaria</Text>

            <View className="flex flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-gray-700 font-semibold">CLABE</Text>
                <Text className="text-gray-900">
                  {airtimeBalance?.data?.stp || "646180279900528289"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  copyToClipboard(airtimeBalance?.data?.stp || "646180279900528289")
                }
                className="bg-purple-700 px-4 py-2 rounded-lg ml-4"
              >
                <Text className="text-white font-semibold">Copiar</Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-row justify-between items-center mb-12">
              <View>
                <Text className="text-gray-700 font-semibold">Concepto</Text>
                <Text className="text-gray-900">
                  {airtimeBalance?.data?.siteId || "—"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => copyToClipboard(airtimeBalance?.data?.siteId?.toString() || "")}
                className="bg-purple-700 px-4 py-2 rounded-lg ml-4"
              >
                <Text className="text-white font-semibold">Copiar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-purple-700 py-3 rounded-lg"
            >
              <Text className="text-center text-white font-semibold text-lg">
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cuerpo */}
      <View className="flex-1 px-6 pt-4 bg-white rounded-t-2xl -mt-4">
        {/* Ganancias */}
        <View className="bg-main rounded-xl p-4 mb-6 overflow-hidden">
          <View>
            <Text className="text-white font-semibold mb-1">Ganancias</Text>
            <Text className="text-3xl text-white font-bold mb-2">
              {formatter.format(commissions.earnings_today || 0)}
            </Text>
            <View className="flex flex-row">
              <View className="bg-white p-2 w-24 rounded mr-3 items-center justify-center">
                <Text className="text-gray-800 font-semibold text-xs">Semana</Text>
                <Text className="text-gray-800 text-xs">
                  {formatter.format(commissions.earnings_week || 0)}
                </Text>
              </View>
              <View className="bg-white p-2 w-24 rounded items-center justify-center">
                <Text className="text-gray-800 font-semibold text-xs">Mes</Text>
                <Text className="text-gray-800 text-xs">
                  {formatter.format(commissions.earnings_month || 0)}
                </Text>
              </View>
            </View>
          </View>

          <Image
            source={require("../../assets/img/airtime/Object.png")}
            style={{
              width: 180,
              height: 180,
              position: "absolute",
              right: -10,
              bottom: -20,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Lista de movimientos */}
        {loadingTransactions ? (
          <ActivityIndicator color="#6924ff" size="large" />
        ) : groupedTransactions.length > 0 ? (
          <FlatList
            data={groupedTransactions}
            keyExtractor={(item, i) => i.toString()}
            renderItem={renderTransaction}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loadingTransactions}
                onRefresh={onRefresh}
                colors={["#6924ff"]}
              />
            }
          />
        ) : (
          <View className="flex-1 justify-center items-center mt-8">
            <Image
              source={require("../../assets/img/airtime/titan_tiempo.png")}
              style={{ width: 200, height: 200, opacity: 0.25 }}
            />
            <Text className="text-gray-600 mt-4 font-medium">
              Aún no hay transacciones
            </Text>
            <Text className="text-gray-500 text-sm">
              ¡Comienza a recargar y gana comisiones!
            </Text>
          </View>
        )}

        <TouchableOpacity
          className="bg-main py-3 rounded-lg w-full mt-4 mb-6"
          onPress={() => router.push("/airtime")}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Nueva recarga
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
