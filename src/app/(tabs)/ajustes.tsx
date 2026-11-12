// app/(tabs)/ajustes.tsx
import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemeContext } from "@/src/context/ThemeContext";
import { globalStyles } from "@/src/styles/global";
import ModoOscuro from "@/src/components/Ajustes/ModoOscuro";

export default function AjustesScreen() {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[globalStyles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Ajustes</Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSubtitle }]}>
          Personaliza tu experiencia con el álbum
        </Text>
      </View>

      <ModoOscuro />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});
