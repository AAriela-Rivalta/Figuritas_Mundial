import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext, ThemeProvider } from "../context/ThemeContext";
import { colors, navHeaderConfig } from "../styles/global";

function StackLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        ...navHeaderConfig,
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Ionicons
              name="football"
              size={35}
              color={theme.textVerde || colors.primary}
            />
            <Text
              style={[
                styles.headerTitleText,
                { color: theme.textVerde || colors.primary },
              ]}
            >
              FiguSwap
            </Text>
          </View>
        ),

        headerStyle: {
          ...navHeaderConfig?.headerStyle,
          backgroundColor: theme.card,
        },
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StackLayout />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerTitleText: {
    fontSize: 25,
    fontWeight: "900",
  },
});
