import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../styles/global";

export default function SwitchModoOscuro() {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.leftRow}>
        <Ionicons
          name={isDarkMode ? "moon" : "sunny"}
          size={22}
          color={isDarkMode ? "#A29BFE" : "#FFB142"}
        />
        <Text style={[styles.titulo, { color: theme.text }]}>Modo Oscuro</Text>
      </View>
      <Switch
        trackColor={{ false: "#767577", true: colors.primary }}
        thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isDarkMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "500",
  },
});
