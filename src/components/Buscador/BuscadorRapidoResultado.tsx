import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import FiguCard from "../Albun/FiguCard";
import { colors } from "@/src/styles/global";
import { ThemeContext } from "@/src/context/ThemeContext";

interface BuscadorRapidoResultadoProps {
  paisIngresado: string;
  bandera?: string;
  numeroIngresado: number;
  laTengo: boolean;
  cantidadRepetidas: number;
  onToggleObtenida: () => void;
  onCambiarRepetidas: (operacion: "sumar" | "restar") => void;
}

export default function BuscadorRapidoResultado({
  paisIngresado,
  bandera,
  numeroIngresado,
  laTengo,
  cantidadRepetidas,
  onToggleObtenida,
  onCambiarRepetidas,
}: BuscadorRapidoResultadoProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.resultPanel,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.resultHeader}>
        {bandera && (
          <CountryFlag
            isoCode={bandera.toLowerCase()}
            size={18}
            style={styles.flag}
          />
        )}
        <Text style={[styles.resultTitle, { color: theme.text }]}>
          {paisIngresado}
        </Text>
      </View>

      <View style={styles.cardWrapper}>
        <FiguCard
          abreviatura={paisIngresado}
          numero={numeroIngresado}
          obtenida={laTengo}
          onToggle={onToggleObtenida}
        />
      </View>

      <Text style={[styles.ayudaTexto, { color: theme.textSubtitle }]}>
        Usa los botones + y − para gestionar repetidos.{"\n"}Toca el cromo para
        desmarcarlo.
      </Text>

      <Text style={[styles.repetidosTitle, { color: theme.textSubtitle }]}>
        REPETIDOS
      </Text>
      <View style={styles.repRow}>
        <Pressable
          style={styles.btnRep}
          onPress={() => onCambiarRepetidas("restar")}
        >
          <Ionicons name="remove" size={18} color="#fff" />
        </Pressable>
        <Text style={[styles.repCountText, { color: theme.text }]}>
          {cantidadRepetidas}
        </Text>
        <Pressable
          style={styles.btnRep}
          onPress={() => onCambiarRepetidas("sumar")}
        >
          <Ionicons name="add" size={18} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultPanel: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    elevation: 2,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  flag: { borderRadius: 2 },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardWrapper: {
    transform: [{ scale: 1.3 }],
    marginVertical: 20,
  },
  ayudaTexto: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
  },
  repetidosTitle: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 8,
  },
  repRow: { flexDirection: "row", alignItems: "center", gap: 20 },
  btnRep: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  repCountText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.neutralOscuro,
    minWidth: 24,
    textAlign: "center",
  },
});
