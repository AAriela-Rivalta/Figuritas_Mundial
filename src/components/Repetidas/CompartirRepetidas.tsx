import { RepetidasAlbum } from "@/src/storage/albumStorage";
import { colors } from "@/src/styles/global";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

interface CompartirRepetidasProps {
  repetidas: RepetidasAlbum;
  paisesMundial: { abreviatura: string; bandera?: string; total?: number }[];
}

export default function CompartirRepetidas({
  repetidas,
  paisesMundial,
}: CompartirRepetidasProps) {
  const obtenerEmojiBandera = (isoCode?: string) => {
    if (!isoCode || isoCode.length !== 2) return "📍";

    const codePoints = isoCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
  };

  const copiarRepetidas = async () => {
    let textoFinal = "📋 ¡Mis Repetidas! 📋\n\n";
    let tieneRepetidas = false;

    paisesMundial.forEach((pais) => {
      const repetidasPais = repetidas[pais.abreviatura] || {};
      const listaRepetidasTexto: string[] = [];

      const numerosOrdenados = Object.keys(repetidasPais)
        .map(Number)
        .sort((a, b) => a - b);

      numerosOrdenados.forEach((num) => {
        const cantidad = repetidasPais[num] || 0;

        if (cantidad > 0) {
          const textoFigu = cantidad > 1 ? `${num}(x${cantidad})` : `${num}`;
          listaRepetidasTexto.push(textoFigu);
        }
      });

      if (listaRepetidasTexto.length > 0) {
        tieneRepetidas = true;
        const iconoIconico = obtenerEmojiBandera(pais.bandera);
        textoFinal += `${iconoIconico} ${pais.abreviatura.toUpperCase()}: ${listaRepetidasTexto.join(", ")}\n`;
      }
    });

    if (!tieneRepetidas) {
      Alert.alert(
        "Sin repetidas",
        "Todavía no agregaste ninguna figurita repetida para cambiar.",
      );
      return;
    }

    await Clipboard.setStringAsync(textoFinal);

    Alert.alert(
      "¡Copiado!",
      "La lista de tus figuritas repetidas se copió al portapapeles.",
    );
  };

  return (
    <Pressable style={styles.botonCopiar} onPress={copiarRepetidas}>
      <Ionicons name="copy-outline" size={20} color="#fff" />
      <Text style={styles.textoBoton}>Copiar repetidas</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botonCopiar: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
