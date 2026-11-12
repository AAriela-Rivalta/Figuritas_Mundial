import { ThemeContext } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useContext } from "react";

export default function TabLayout() {
  const { theme } = useContext(ThemeContext);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.textVerde,
        tabBarInactiveTintColor: theme.textSubtitle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Colección",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-figus"
        options={{
          title: "Repetidas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="copy-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="buscador"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ajustes"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
