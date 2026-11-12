import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";
import { ProgresoAlbum } from "@/src/storage/albumStorage";
import { colors } from "@/src/styles/global";

interface CompartirFaltantesProps {
  progreso: ProgresoAlbum;
  paisesMundial: { abreviatura: string; bandera?: string; total?: number }[];
}

export default function CompartirFaltantes({
  progreso,
  paisesMundial,
}: CompartirFaltantesProps) {
  const obtenerEmojiBandera = (isoCode?: string) => {
    if (!isoCode || isoCode.length !== 2) return "📍";

    const codePoints = isoCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
  };

  const copiarFaltantes = async () => {
    let textoFinal = "📋 ¡Mis Faltantes! 📋\n\n";
    let tieneFaltantes = false;

    paisesMundial.forEach((pais) => {
      const totalDelPais = pais.total || 20;
      const obtenidasIds = progreso[pais.abreviatura] || [];
      const faltantesPais: number[] = [];

      for (let i = 1; i <= totalDelPais; i++) {
        // 👈 Cambiado el '20' por 'totalDelPais'
        if (!obtenidasIds.includes(i)) {
          faltantesPais.push(i);
        }
      }

      if (faltantesPais.length > 0) {
        tieneFaltantes = true;

        const iconoIconico = obtenerEmojiBandera(pais.bandera);

        textoFinal += `${iconoIconico} ${pais.abreviatura.toUpperCase()}: ${faltantesPais.join(", ")}\n`;
      }
    });

    if (!tieneFaltantes) {
      Alert.alert(
        "¡Felicitaciones!",
        "¡Ya completaste todo el álbum, no te falta ninguna figurita!",
      );
      return;
    }

    await Clipboard.setStringAsync(textoFinal);

    Alert.alert(
      "¡Copiado!",
      "La lista de figuritas que te faltan se copió al portapapeles para que la compartas.",
    );
  };

  return (
    <Pressable style={styles.botonCopiar} onPress={copiarFaltantes}>
      <Ionicons name="copy-outline" size={20} color="#fff" />
      <Text style={styles.textoBoton}>Copiar faltantes</Text>
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
