import { ThemeContext } from "@/src/context/ThemeContext";
import { colors } from "@/src/styles/global";
import { datosJugadores } from "@/src/utils/jugadores";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface FiguCardRepetidasProps {
  numero: number;
  cantidad: number;
  onIncrementar: () => void;
  onDecrementar: () => void;
  abreviatura: string;
}

export default function FiguCardRepetidas({
  numero,
  cantidad,
  onIncrementar,
  onDecrementar,
  abreviatura,
}: FiguCardRepetidasProps) {
  const { theme, isDarkMode } = useContext(ThemeContext);

  const jugador = datosJugadores[abreviatura]?.[numero];
  const nombreMostrar = jugador ? jugador.nombre : `Figurita ${numero}`;

  const estiloCardDinamico = {
    backgroundColor: theme.card,
    borderColor: theme.border,
  };

  if (cantidad > 0) {
    estiloCardDinamico.borderColor = colors.secondary;
    estiloCardDinamico.backgroundColor = isDarkMode ? "#2D2814" : "#FFFDF4";
  }

  return (
    <View
      style={[
        styles.card,
        styles.cardRepetida,
        estiloCardDinamico,
        cantidad > 0 && { borderWidth: 2 },
      ]}
    >
      <Text
        style={[styles.numberText, styles.numeroText, { color: theme.text }]}
      >
        {numero}
      </Text>

      <View style={styles.nombreContainer}>
        <Text
          style={[styles.nombreJugadorText, { color: theme.textSubtitle }]}
          numberOfLines={2}
        >
          {nombreMostrar}
        </Text>
      </View>

      <View style={styles.controlesContainer}>
        <Pressable
          onPress={onDecrementar}
          style={({ pressed }) => [
            styles.botonControl,
            { backgroundColor: theme.border },
            pressed && styles.botonPresionado,
          ]}
        >
          <Ionicons name="remove" size={16} color={theme.text} />
        </Pressable>

        <Text style={[styles.cantidadText, { color: colors.light.text }]}>
          {cantidad > 0 ? `${cantidad}` : "0"}
        </Text>

        <Pressable
          onPress={onIncrementar}
          style={({ pressed }) => [
            styles.botonControl,
            { backgroundColor: theme.border },
            pressed && styles.botonPresionado,
          ]}
        >
          <Ionicons name="add" size={16} color={theme.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    margin: 6,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
  },
  cardRepetida: {
    width: 85,
    height: 95,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  numeroText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  nombreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 2,
  },
  nombreJugadorText: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 12,
  },
  controlesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 2,
  },
  botonControl: {
    borderRadius: 4,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  botonPresionado: {
    opacity: 0.7,
  },
  cantidadText: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: "bold",
    minWidth: 22,
    textAlign: "center",
    overflow: "hidden",
  },
  numberText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
