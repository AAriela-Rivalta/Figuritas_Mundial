import { datosJugadores } from "@/src/utils/jugadores";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles/global";
import { useContext } from "react";
import { ThemeContext } from "@/src/context/ThemeContext";

interface FiguCardProps {
  abreviatura: string;
  numero: number;
  obtenida: boolean;
  onToggle: () => void;
}

export default function FiguCard({
  abreviatura,
  numero,
  obtenida,
  onToggle,
}: FiguCardProps) {
  const { theme } = useContext(ThemeContext);
  const jugador = datosJugadores[abreviatura]?.[numero];
  const nombreMostrar = jugador ? jugador.nombre : `Figurita ${numero}`;

  return (
    <Pressable
      onPress={onToggle}
      style={[
        styles.card,
        styles.cardLayout,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        obtenida && { borderColor: colors.primary, borderWidth: 2 },
      ]}
    >
      <Text style={[styles.numberText, { color: theme.text }]}>{numero}</Text>

      <View style={styles.nombreContainer}>
        <Text
          style={[styles.nombreJugadorText, { color: theme.textSubtitle }]}
          numberOfLines={2}
        >
          {nombreMostrar}
        </Text>
      </View>

      {obtenida && (
        <View style={styles.checkBadge}>
          <Ionicons name="checkmark-circle" size={14} color="#fff" />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardLayout: {
    alignItems: "center",
    paddingTop: 6,
    paddingHorizontal: 4,
  },
  nombreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 10,
  },
  nombreJugadorText: {
    fontSize: 12,
    color: colors.neutralMedio1,
    textAlign: "center",
    lineHeight: 11,
  },
  card: {
    width: 85,
    height: 85,
    borderRadius: 8,
    margin: 6,
    borderWidth: 1,
    borderColor: colors.neutralMedio,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
  },
  numberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.neutralOscuro,
  },
  checkBadge: {
    position: "absolute",
    bottom: -1,
    right: -1,
    backgroundColor: colors.primary,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
