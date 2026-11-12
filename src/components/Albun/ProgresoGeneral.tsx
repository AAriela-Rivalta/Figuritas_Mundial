import { ThemeContext } from "@/src/context/ThemeContext";
import { ProgresoAlbum } from "@/src/storage/albumStorage";
import { colors } from "@/src/styles/global";
import { paisesMundial } from "@/src/utils/paises";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProgresoGeneralProps {
  progreso: ProgresoAlbum;
}

export default function ProgresoGeneral({ progreso }: ProgresoGeneralProps) {
  const { theme } = useContext(ThemeContext);
  const totalFiguritas = paisesMundial.reduce(
    (sum, p) => sum + (p.total || 20),
    0,
  );

  const totalObtenidas = Object.values(progreso).reduce(
    (acumulador, ids) => acumulador + ids.length,
    0,
  );

  const porcentaje =
    totalFiguritas > 0
      ? Math.round((totalObtenidas / totalFiguritas) * 100)
      : 0;

  return (
    <View
      style={[
        styles.progresoCard,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.progresoMainRow}>
        <View style={styles.leftProgressContent}>
          <Text style={[styles.tituloProgreso, { color: theme.text }]}>
            Mi Progreso:{" "}
          </Text>

          <View style={[styles.barTrack, { backgroundColor: theme.border }]}>
            <View
              style={[
                styles.barFill,
                { width: `${porcentaje}%` },
                { backgroundColor: theme.textVerde },
              ]}
            />
          </View>

          <Text style={[styles.contadoresTexto, { color: theme.textSubtitle }]}>
            <Text
              style={[styles.obtenidasDestacado, { color: theme.textVerde }]}
            >
              {totalObtenidas} Obtenidas
            </Text>
            {"\n"}de{" "}
            <Text style={[styles.totalesDestacado, { color: theme.text }]}>
              {totalFiguritas}
            </Text>{" "}
            Totales
          </Text>
        </View>

        <View style={styles.circleBadgeContainer}>
          <View
            style={[styles.circleOuterBorder, { borderColor: theme.amarillo }]}
          >
            <Text
              style={[styles.circlePercentageText, { color: theme.textVerde }]}
            >
              {porcentaje}%
            </Text>
          </View>
          <Text style={[styles.completadoLabel, { color: theme.textVerde }]}>
            Completado
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progresoCard: {
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutralMedio,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  progresoMainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftProgressContent: {
    flex: 1,
    marginRight: 16,
  },
  tituloProgreso: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subTituloProgreso: {
    fontWeight: "500",
  },
  barTrack: {
    height: 14,
    borderRadius: 7,
    overflow: "hidden",
    marginBottom: 10,
  },
  barFill: {
    height: "100%",
    borderRadius: 7,
  },
  contadoresTexto: {
    fontSize: 14,
    lineHeight: 18,
  },
  obtenidasDestacado: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalesDestacado: {
    fontWeight: "600",
  },
  circleBadgeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circleOuterBorder: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  circlePercentageText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  completadoLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
});
