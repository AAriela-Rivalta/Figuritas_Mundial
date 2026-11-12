import BuscadorPaises from "@/src/components/BuscadorPaises";
import CompartirRepetidas from "@/src/components/Repetidas/CompartirRepetidas";
import CompartirRepetidasBoton from "@/src/components/Repetidas/CompartirRepetidasBoton";
import PaisAccordionRepetidas from "@/src/components/Repetidas/PaisAccordionRepetidas";
import ProgresoRepetidas from "@/src/components/Repetidas/ProgresoRepetidas";
import { ThemeContext } from "@/src/context/ThemeContext";
import {
  cargarProgresoAlbum, // 👈 Importamos la carga del álbum
  cargarRepetidasAlbum,
  guardarRepetidasAlbum,
  ProgresoAlbum, // 👈 Importamos el tipo
  RepetidasAlbum,
} from "@/src/storage/albumStorage";
import { colors, globalStyles } from "@/src/styles/global";
import { paisesMundial } from "@/src/utils/paises";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native"; // 👈 Importamos Alert

export default function RepetidasScreen() {
  const { theme } = useContext(ThemeContext);

  const [repetidas, setRepetidas] = useState<RepetidasAlbum>({});
  const [progreso, setProgreso] = useState<ProgresoAlbum>({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const paisesFiltrados = paisesMundial.filter((pais) =>
    pais.abreviatura.toLowerCase().includes(search.toLowerCase().trim()),
  );

  useFocusEffect(
    useCallback(() => {
      const inicializarRepetidas = async () => {
        const [repCargadas, progCargado] = await Promise.all([
          cargarRepetidasAlbum(),
          cargarProgresoAlbum(),
        ]);
        setRepetidas(repCargadas);
        setProgreso(progCargado);
        setIsLoading(false);
      };
      inicializarRepetidas();
    }, []),
  );

  const handleCambiarCantidadGlobal = async (
    abreviatura: string,
    num: number,
    operacion: "sumar" | "restar",
  ) => {
    const figusPais = progreso[abreviatura] || [];
    const laTengo = figusPais.includes(num);

    if (operacion === "sumar" && !laTengo) {
      Alert.alert(
        "No obtenida",
        `Para añadir una repetida de ${abreviatura.toUpperCase()} ${num}, primero debes tenerla en tu colección.`,
      );
      return;
    }

    const nuevoEstado = { ...repetidas };
    const paisActual = { ...nuevoEstado[abreviatura] };
    const cantidadActual = paisActual[num] || 0;

    if (operacion === "sumar") {
      paisActual[num] = cantidadActual + 1;
    } else if (operacion === "restar" && cantidadActual > 0) {
      paisActual[num] = cantidadActual - 1;

      if (paisActual[num] === 0) {
        delete paisActual[num];
      }
    }

    nuevoEstado[abreviatura] = paisActual;
    setRepetidas(nuevoEstado);
    guardarRepetidasAlbum(nuevoEstado);
  };

  if (isLoading) {
    return (
      <View
        style={[
          globalStyles.container,
          styles.loadingCenter,
          { backgroundColor: theme.bg },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, { backgroundColor: theme.bg }]}>
      <ProgresoRepetidas repetidas={repetidas} />
      <BuscadorPaises value={search} onChangeText={setSearch} />
      <View style={styles.botonesContainer}>
        <View style={{ flex: 1 }}>
          <CompartirRepetidas
            repetidas={repetidas}
            paisesMundial={paisesMundial}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CompartirRepetidasBoton
            repetidas={repetidas}
            paisesMundial={paisesMundial}
          />
        </View>
      </View>
      <ScrollView
        style={[globalStyles.container, { backgroundColor: theme.bg }]}
        contentContainerStyle={styles.screen}
      >
        {paisesFiltrados.map((pais) => {
          const totalFigus = pais.total || 20;

          return (
            <PaisAccordionRepetidas
              key={`accordion-rep-${pais.abreviatura}`}
              abreviatura={pais.abreviatura}
              bandera={pais.bandera}
              totalFiguritas={totalFigus}
              repetidasPais={repetidas[pais.abreviatura] || {}}
              onCambiarCantidad={handleCambiarCantidadGlobal}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 16 },
  loadingCenter: { justifyContent: "center", alignItems: "center" },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 8,
  },
});
