import { colors } from "@/src/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import FiguCard from "./FiguCard";
import { ThemeContext } from "@/src/context/ThemeContext";

interface PaisAccordionProps {
  abreviatura: string;
  bandera?: string;
  totalFiguritas: number;
  obtenidasIds: number[];
  onFiguToggle: (abreviatura: string, num: number) => void;
}

export default function PaisAccordion({
  abreviatura,
  bandera,
  totalFiguritas,
  obtenidasIds,
  onFiguToggle,
}: PaisAccordionProps) {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const numeroFiguritas = Array.from(
    { length: totalFiguritas },
    (_, index) => index + 1,
  );

  const obtenidasSet = new Set(obtenidasIds);

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
          <Text style={[styles.contadorText, { color: theme.textSubtitle }]}>
            {obtenidasIds.length}/{totalFiguritas}
          </Text>

          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color={theme.icon}
          />
        </View>
      </Pressable>

      {isOpen && (
        <View style={[styles.content, { backgroundColor: theme.card }]}>
          <View style={styles.grid}>
            {numeroFiguritas.map((num) => (
              <FiguCard
                key={`${abreviatura}-${num}`}
                abreviatura={abreviatura}
                numero={num}
                obtenida={obtenidasSet.has(num)}
                onToggle={() => onFiguToggle(abreviatura, num)}
              />
            ))}
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
    borderColor: colors.neutralMedio,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.neutralClaro,
  },
  headerOpen: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutralMedio,
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
    borderColor: colors.neutralMedio,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contadorText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.neutralMedio1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: colors.neutralOscuro,
    fontWeight: "bold",
    fontSize: 16,
  },
  banderaText: {
    fontSize: 20,
  },
  paisText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.neutralOscuro,
  },
  content: {
    padding: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
