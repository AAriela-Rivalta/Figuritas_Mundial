import { StyleSheet } from "react-native";

export const colors = {
  primary: "#1B5E20",
  primaryDark: "#60ad59",
  secondary: "#FFD700",
  tertiary: "#D32F2F",
  neutralClaro: "#F5F5F5",
  neutralMedio: "#E2E2E2",
  neutralMedio1: "#777777",
  neutralOscuro: "#1A1C1C",

  light: {
    bg: "#F5F5F7",
    card: "#FFFFFF",
    text: "#1C1C1E",
    textVerde: "#1B5E20",
    textSubtitle: "#8E8E93",
    border: "#E5E5EA",
    icon: "#1A1C1C",
    amarillo: "#FFD700",
  },

  dark: {
    bg: "#121212",
    card: "#2e2e2e",
    text: "#F5F5F7",
    textVerde: "#60ad59",
    textSubtitle: "#AEAEB2",
    border: "#464444",
    icon: "#777777",
    amarillo: "#FFD700",
  },
};

export const navHeaderConfig = {
  headerStyle: {
    backgroundColor: colors.neutralMedio,
  },
  headerTintColor: colors.primary,
  headerTitleAlign: "left" as const,
  headerTitleStyle: {
    fontSize: 26,
    fontWeight: "900" as const,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
