import { RepetidasAlbum } from "@/src/storage/albumStorage";
import { colors } from "@/src/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, Share, StyleSheet, Text } from "react-native";

interface CompartirRepetidasBotonProps {
  repetidas: RepetidasAlbum;
  paisesMundial: { abreviatura: string; bandera?: string; total?: number }[];
}

export default function CompartirRepetidasBoton({
  repetidas,
  paisesMundial,
}: CompartirRepetidasBotonProps) {
  const obtenerEmojiBandera = (isoCode?: string) => {
    if (!isoCode || isoCode.length !== 2) return "📍";

    const codePoints = isoCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
  };

  const compartirRepetidas = async () => {
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

    try {
      await Share.share({
        message: textoFinal,
      });
    } catch (error) {
      console.error("Error al intentar compartir:", error);
    }
  };

  return (
    <Pressable style={styles.botonCompartir} onPress={compartirRepetidas}>
      <Ionicons name="share-social-outline" size={20} color="#fff" />
      <Text style={styles.textoBoton}>Compartir repetidas</Text>
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
