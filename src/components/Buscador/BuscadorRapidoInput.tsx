import React, { useRef, useContext } from "react"; // 👈 1. Importamos useContext
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";
import { ThemeContext } from "@/src/context/ThemeContext"; // 👈 2. Importamos tu contexto de tema

interface BuscadorRapidoInputProps {
  p1: string;
  setP1: (t: string) => void;
  p2: string;
  setP2: (t: string) => void;
  p3: string;
  setP3: (t: string) => void;
  n1: string;
  setN1: (t: string) => void;
  n2: string;
  setN2: (t: string) => void;
  onLimpiar: () => void;
}

export default function BuscadorRapidoInput({
  p1,
  setP1,
  p2,
  setP2,
  p3,
  setP3,
  n1,
  setN1,
  n2,
  setN2,
  onLimpiar,
}: BuscadorRapidoInputProps) {
  // 3. Consumimos el tema actual
  const { theme } = useContext(ThemeContext);

  const refP2 = useRef<TextInput>(null);
  const refP3 = useRef<TextInput>(null);
  const refN1 = useRef<TextInput>(null);
  const refN2 = useRef<TextInput>(null);

  return (
    // 4. Panel principal con fondo y borde dinámico
    <View
      style={[
        styles.searchPanel,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.headerRow}>
        <Ionicons
          name="flash"
          size={18}
          color={theme.amarillo || colors.secondary}
        />
        {/* 5. Título principal adaptado */}
        <Text style={[styles.panelTitle, { color: theme.text }]}>
          Búsqueda rápida
        </Text>
      </View>
      <Text style={[styles.panelSubtitle, { color: theme.textSubtitle }]}>
        Encuentra rápido un cromo y márcalo como tuyo o repetido.
      </Text>

      <View style={styles.inputsRow}>
        {/* Bloque País */}
        <View style={styles.groupContainer}>
          <Text style={[styles.groupLabel, { color: theme.textSubtitle }]}>
            PAÍS
          </Text>
          <View style={styles.casillerosRow}>
            <TextInput
              style={[
                styles.boxInput,
                {
                  backgroundColor: theme.border,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              value={p1}
              maxLength={1}
              autoCapitalize="characters"
              onChangeText={(t) => {
                setP1(t);
                if (t) refP2.current?.focus();
              }}
            />
            <TextInput
              ref={refP2}
              style={[
                styles.boxInput,
                {
                  backgroundColor: theme.border,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              value={p2}
              maxLength={1}
              autoCapitalize="characters"
              onChangeText={(t) => {
                setP2(t);
                if (t) refP3.current?.focus();
              }}
            />
            <TextInput
              ref={refP3}
              style={[
                styles.boxInput,
                {
                  backgroundColor: theme.border,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              value={p3}
              maxLength={1}
              autoCapitalize="characters"
              onChangeText={(t) => {
                setP3(t);
                if (t) refN1.current?.focus();
              }}
            />
          </View>
        </View>

        {/* 6. Divisor adaptado al color de los bordes */}
        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Bloque Número */}
        <View style={styles.groupContainer}>
          <Text style={[styles.groupLabel, { color: theme.textSubtitle }]}>
            NÚMERO
          </Text>
          <View style={styles.casillerosRow}>
            <TextInput
              ref={refN1}
              style={[
                styles.boxInput,
                {
                  backgroundColor: theme.border,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              value={n1}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(t) => {
                setN1(t);
                if (t) refN2.current?.focus();
              }}
            />
            <TextInput
              ref={refN2}
              style={[
                styles.boxInput,
                {
                  backgroundColor: theme.border,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              value={n2}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(t) => {
                setN2(t);
                if (t) Keyboard.dismiss();
              }}
            />
          </View>
        </View>
      </View>

      <Pressable style={styles.btnLimpiar} onPress={onLimpiar}>
        <Ionicons name="refresh-outline" size={16} color={theme.textSubtitle} />
        <Text style={[styles.txtLimpiar, { color: theme.textSubtitle }]}>
          LIMPIAR
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  searchPanel: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  panelTitle: { fontSize: 18, fontWeight: "bold" },
  panelSubtitle: {
    fontSize: 13,
    marginBottom: 16,
  },
  inputsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  groupContainer: { alignItems: "center", flex: 1 },
  groupLabel: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: 1,
  },
  casillerosRow: { flexDirection: "row", gap: 6 },
  boxInput: {
    width: 40,
    height: 48,
    borderWidth: 1.5,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    width: 1,
    height: 40,
    marginHorizontal: 8,
  },
  btnLimpiar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    alignSelf: "center",
  },
  txtLimpiar: { fontSize: 12, fontWeight: "bold" },
});
