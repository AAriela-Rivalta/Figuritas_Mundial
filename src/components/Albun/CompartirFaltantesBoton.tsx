import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, Share, StyleSheet, Text } from "react-native";
import { ProgresoAlbum } from "../../storage/albumStorage";
import { colors } from "../../styles/global";

interface CompartirFaltantesBotonProps {
  progreso: ProgresoAlbum;
  paisesMundial: { abreviatura: string; bandera?: string; total?: number }[];
}

export default function CompartirFaltantesBoton({
  progreso,
  paisesMundial,
}: CompartirFaltantesBotonProps) {
  const obtenerEmojiBandera = (isoCode?: string) => {
    if (!isoCode || isoCode.length !== 2) return "📍";

    const codePoints = isoCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
  };

  const compartirFaltantes = async () => {
    let textoFinal = "📋 ¡Mis Faltantes! 📋\n\n";
    let tieneFaltantes = false;

    paisesMundial.forEach((pais) => {
      const totalDelPais = pais.total || 20;
      const obtenidasIds = progreso[pais.abreviatura] || [];
      const faltantesPais: number[] = [];

      for (let i = 1; i <= totalDelPais; i++) {
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

    try {
      await Share.share({
        message: textoFinal,
      });
    } catch (error) {
      console.error("Error al intentar compartir:", error);
    }
  };

  return (
    <Pressable style={styles.botonCompartir} onPress={compartirFaltantes}>
      <Ionicons name="share-social-outline" size={20} color="#fff" />
      <Text style={styles.textoBoton}>Compartir faltantes</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botonCompartir: {
    backgroundColor: colors.primaryDark, // Podés usar un color distinto (estilo verde WhatsApp) para diferenciarlo del de copiar
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
