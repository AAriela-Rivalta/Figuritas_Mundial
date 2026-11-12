import CompartirFaltantes from "@/src/components/Albun/CompartirFaltantes";
import CompartirFaltantesBoton from "@/src/components/Albun/CompartirFaltantesBoton";
import ProgresoGeneral from "@/src/components/Albun/ProgresoGeneral";
import BuscadorPaises from "@/src/components/BuscadorPaises";
import {
  cargarProgresoAlbum,
  guardarProgresoAlbum,
  ProgresoAlbum,
} from "@/src/storage/albumStorage";
import { paisesMundial } from "@/src/utils/paises";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import PaisAccordion from "../../components/Albun/PaisAccordion";
import { colors, globalStyles } from "../../styles/global";
import { ThemeContext } from "@/src/context/ThemeContext";

export default function Index() {
  const { theme } = useContext(ThemeContext);

  const [progreso, setProgreso] = useState<ProgresoAlbum>({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      const inicializarAlbum = async () => {
        const datosCargados = await cargarProgresoAlbum();
        setProgreso(datosCargados);
        setIsLoading(false);
      };
      inicializarAlbum();
    }, []),
  );

  const paisesFiltrados = paisesMundial.filter((pais) =>
    pais.abreviatura.toLowerCase().includes(search.toLowerCase().trim()),
  );

  const handleFiguToggleGlobal = async (abreviatura: string, num: number) => {
    const nuevoProgreso = { ...progreso };

    const figusPaisActuales = nuevoProgreso[abreviatura] || [];

    let figusPaisNuevas;
    if (figusPaisActuales.includes(num)) {
      figusPaisNuevas = figusPaisActuales.filter((f) => f !== num);
    } else {
      figusPaisNuevas = [...figusPaisActuales, num];
    }

    nuevoProgreso[abreviatura] = figusPaisNuevas;
    setProgreso(nuevoProgreso);

    guardarProgresoAlbum(nuevoProgreso);
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
      <ProgresoGeneral progreso={progreso} />
      <BuscadorPaises value={search} onChangeText={setSearch} />
      <View style={styles.botonesContainer}>
        <View style={{ flex: 1 }}>
          <CompartirFaltantes
            progreso={progreso}
            paisesMundial={paisesMundial}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CompartirFaltantesBoton
            progreso={progreso}
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
            <PaisAccordion
              key={pais.abreviatura}
              abreviatura={pais.abreviatura}
              bandera={pais.bandera}
              totalFiguritas={totalFigus}
              obtenidasIds={progreso[pais.abreviatura] || []}
              onFiguToggle={handleFiguToggleGlobal}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 16,
  },
  loadingCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 8,
  },
});
