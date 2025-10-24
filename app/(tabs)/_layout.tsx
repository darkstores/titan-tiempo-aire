import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Home, Zap, User, MessageCircle } from "lucide-react-native";
import "global.css";

// Reutilizable: ícono con círculo morado y texto
function TabIcon({
  icon: Icon,
  label,
  focused,
}: {
  icon: any;
  label: string;
  focused: boolean;
}) {
  return (
    <View className="items-center justify-center mt-3">
      <View
        className={`w-12 h-8 rounded-full items-center justify-center ${focused ? "bg-[#6924ff]" : "bg-gray-200"
          }`}
      >
        <Icon size={16} color={focused ? "white" : "#6924ff"} />
      </View>
      <Text
        className={`mt-1 text-[10px] font-semibold ${focused ? "text-[#6924ff]" : "text-gray-500"
          }`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 75,
          paddingBottom: 6,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Home} label="Inicio" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="tiempo_aire"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Zap} label="Info" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={User} label="Perfil" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={MessageCircle} label="Chat" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
