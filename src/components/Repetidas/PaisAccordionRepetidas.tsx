import { colors } from "@/src/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import FiguCardRepetidas from "./FiguCardRepetidas";
import { ThemeContext } from "@/src/context/ThemeContext";

interface PaisAccordionRepetidasProps {
  abreviatura: string;
  bandera?: string;
  totalFiguritas: number;
  repetidasPais: { [numFigu: number]: number };
  onCambiarCantidad: (
    abreviatura: string,
    num: number,
    operacion: "sumar" | "restar",
  ) => void;
}

export default function PaisAccordionRepetidas({
  abreviatura,
  bandera,
  totalFiguritas,
  repetidasPais,
  onCambiarCantidad,
}: PaisAccordionRepetidasProps) {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const numeroFiguritas = Array.from(
    { length: totalFiguritas },
    (_, index) => index + 1,
  );

  const totalRepetidasEnPais = Object.values(repetidasPais).reduce(
    (sum, cant) => sum + cant,
    0,
  );

  return (
    <View
      style={[
        styles.accordionContainer,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <Pressable
        style={[
          styles.header,
          { backgroundColor: theme.card },
          isOpen && [styles.headerOpen, { borderBottomColor: theme.border }],
        ]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={styles.leftContainer}>
          {bandera && (
            <View style={[styles.flagWrapper, { borderColor: theme.border }]}>
              <CountryFlag isoCode={bandera.toLowerCase()} size={18} />
            </View>
          )}
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: theme.text }]}>
              {abreviatura.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          {totalRepetidasEnPais > 0 && (
            <View style={styles.badgeRepetidasCount}>
              <Text style={styles.badgeRepetidasCountText}>
                +{totalRepetidasEnPais} rep
              </Text>
            </View>
          )}
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color={theme.textSubtitle}
          />
        </View>
      </Pressable>

      {isOpen && (
        <View style={[styles.content, { backgroundColor: theme.card }]}>
          <View style={styles.grid}>
            {numeroFiguritas.map((num) => {
              const cantidad = repetidasPais[num] || 0;
              return (
                <FiguCardRepetidas
                  key={`rep-${abreviatura}-${num}`}
                  abreviatura={abreviatura}
                  numero={num}
                  cantidad={cantidad}
                  onIncrementar={() =>
                    onCambiarCantidad(abreviatura, num, "sumar")
                  }
                  onDecrementar={() =>
                    onCambiarCantidad(abreviatura, num, "restar")
                  }
                />
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  accordionContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  headerOpen: {
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flagWrapper: {
    borderRadius: 3,
    overflow: "hidden",
    borderWidth: 0.5,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    padding: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  badgeRepetidasCount: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeRepetidasCountText: {
    color: colors.light.text,
    fontSize: 12,
    fontWeight: "bold",
  },
});
