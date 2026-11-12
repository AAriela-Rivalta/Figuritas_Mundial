import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RepetidasAlbum } from "@/src/storage/albumStorage";
import { colors } from "@/src/styles/global";
import { ThemeContext } from "@/src/context/ThemeContext";

interface ProgresoRepetidasProps {
  repetidas: RepetidasAlbum;
}

export default function ProgresoRepetidas({
  repetidas,
}: ProgresoRepetidasProps) {
  const { theme } = useContext(ThemeContext);
  const totalRepetidas = Object.values(repetidas).reduce(
    (acumuladorPais, paisObj) => {
      const sumaPais = Object.values(paisObj).reduce(
        (sum, cantidad) => sum + cantidad,
        0,
      );
      return acumuladorPais + sumaPais;
    },
    0,
  );

  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.mainRow}>
        <View style={styles.leftContent}>
          <Text style={[styles.titulo, { color: theme.text }]}>
            Mis Repetidas
          </Text>
          <Text style={[styles.subtitulo, { color: theme.textSubtitle }]}>
            Total de figuritas para cambiar
          </Text>
        </View>

        <View
          style={[
            styles.badgeContainer,
            { backgroundColor: theme.amarillo || colors.secondary },
          ]}
        >
          <Ionicons
            name="layers-outline"
            size={20}
            color={colors.light.text}
            style={styles.icono}
          />
          <Text style={[styles.numeroDestacado, { color: colors.light.text }]}>
            {totalRepetidas}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutralMedio,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 14,
    marginTop: 2,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  icono: {
    marginTop: 1,
  },
  numeroDestacado: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
