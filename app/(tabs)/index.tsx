import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useFocusEffect, useRouter } from "expo-router";
import {
  useGetAirtimeAccountBalanceQuery,
  useGetAirtimeAllQuery,
} from "~/store/api/airtimeApi";
import { RouteProp, useRoute } from "@react-navigation/native";

const formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

type RootStackParamList = {
  tiempoAire: { from?: string };
};


export default function TiempoAireScreen() {
  const router = useRouter();
  const route = useRoute<RouteProp<RootStackParamList, "tiempoAire">>();

  const {
    data: airtimeBalance,
    isFetching: loadingBalance,
    refetch: refetchBalance,
  } = useGetAirtimeAccountBalanceQuery();

  const {
    data: airtimeTransactions,
    isFetching: loadingTransactions,
    refetch: refetchTransactions,
  } = useGetAirtimeAllQuery();

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copiado", `${text} copiado al portapapeles`);
  };

  const onRefresh = () => {
    refetchBalance();
    refetchTransactions();
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params?.from === "product") {
        refetchBalance();
        refetchTransactions();
      }
    }, [route.params])
  );

  console.log(airtimeBalance);
  

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

          <View className="flex-col">
            <Text className="text-base font-medium">${t.amount.toFixed(2)}</Text>

            {t.response_code === "00" &&
              t.earning != null &&
              !isNaN(Number(t.earning)) && (
                <Text className="text-green-500 text-sm font-semibold">
                  +${Number(t.earning).toFixed(2)}
                </Text>
              )}
          </View>
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

  const stp = airtimeBalance?.data?.stp || "—";
  const siteId = airtimeBalance?.data?.siteId || "—";

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

          <View className="mt-3">
            <TouchableOpacity
              onPress={() => copyToClipboard(siteId.toString())}
              className="flex-row items-center gap-2 mb-1"
            >
              <Text className="text-white font-medium text-sm">
                ID: #{siteId}
              </Text>
              <Ionicons name="copy-outline" size={13} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => copyToClipboard(stp)}
              className="flex-row items-center gap-2"
            >
              <Text className="text-white font-medium text-sm">
                STP: {stp}
              </Text>
              <Ionicons name="copy-outline" size={13} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>

      <View className="flex-1 px-6 pt-4 bg-white rounded-t-2xl -mt-4">
        <View className="bg-main rounded-xl p-4 mb-6 overflow-hidden">
          <View>
            <Text className="text-white font-semibold mb-1">Ganancias hoy</Text>
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
