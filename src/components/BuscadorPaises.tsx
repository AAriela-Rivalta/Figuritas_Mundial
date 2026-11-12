import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

interface BuscadorPaisesProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function BuscadorPaises({
  value,
  onChangeText,
}: BuscadorPaisesProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <Ionicons
        name="search-outline"
        size={20}
        color={theme.textSubtitle}
        style={styles.icono}
      />
      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholder="Buscar"
        placeholderTextColor={theme.textSubtitle}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="characters"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Ionicons
          name="close-circle"
          size={18}
          color={theme.textSubtitle}
          onPress={() => onChangeText("")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  icono: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
});
