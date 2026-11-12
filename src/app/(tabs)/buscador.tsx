import BuscadorRapidoInput from "@/src/components/Buscador/BuscadorRapidoInput";
import BuscadorRapidoResultado from "@/src/components/Buscador/BuscadorRapidoResultado";
import { ThemeContext } from "@/src/context/ThemeContext";
import {
  cargarProgresoAlbum,
  cargarRepetidasAlbum,
  guardarProgresoAlbum,
  guardarRepetidasAlbum,
  ProgresoAlbum,
  RepetidasAlbum,
} from "@/src/storage/albumStorage";
import { colors, globalStyles } from "@/src/styles/global";
import { paisesMundial } from "@/src/utils/paises";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  View,
} from "react-native";

export default function BuscarScreen() {
  const { theme } = useContext(ThemeContext);

  const [progreso, setProgreso] = useState<ProgresoAlbum>({});
  const [repetidas, setRepetidas] = useState<RepetidasAlbum>({});
  const [isLoading, setIsLoading] = useState(true);

  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");

  useFocusEffect(
    useCallback(() => {
      const cargarDatos = async () => {
        const [progCargado, repCargadas] = await Promise.all([
          cargarProgresoAlbum(),
          cargarRepetidasAlbum(),
        ]);
        setProgreso(progCargado);
        setRepetidas(repCargadas);
        setIsLoading(false);
      };
      cargarDatos();
    }, []),
  );

  const paisIngresado = `${p1}${p2}${p3}`.toUpperCase();
  const numeroIngresado = parseInt(`${n1}${n2}`, 10);

  const paisEncontrado = paisesMundial.find(
    (p) => p.abreviatura === paisIngresado,
  );
  const totalFigusPais = paisEncontrado ? paisEncontrado.total || 20 : 0;
  const esFiguValida =
    paisEncontrado && numeroIngresado >= 1 && numeroIngresado <= totalFigusPais;

  const figusPaisActuales = progreso[paisIngresado] || [];
  const laTengo = figusPaisActuales.includes(numeroIngresado);
  const cantidadRepetidas =
    (repetidas[paisIngresado] && repetidas[paisIngresado][numeroIngresado]) ||
    0;

  const handleToggleObtenida = async () => {
    if (!esFiguValida) return;

    let nuevasFigus;
    const nuevoEstadoRep = { ...repetidas };
    const paisActualRep = { ...nuevoEstadoRep[paisIngresado] };

    if (laTengo) {
      nuevasFigus = figusPaisActuales.filter((f) => f !== numeroIngresado);
      if (paisActualRep[numeroIngresado]) {
        delete paisActualRep[numeroIngresado];
        nuevoEstadoRep[paisIngresado] = paisActualRep;
        setRepetidas(nuevoEstadoRep);
        await guardarRepetidasAlbum(nuevoEstadoRep);
      }
    } else {
      nuevasFigus = [...figusPaisActuales, numeroIngresado];
    }

    const nuevoProgreso = { ...progreso, [paisIngresado]: nuevasFigus };
    setProgreso(nuevoProgreso);
    await guardarProgresoAlbum(nuevoProgreso);
  };

  const handleCambiarRepetidas = async (operacion: "sumar" | "restar") => {
    if (!esFiguValida) return;

    if (operacion === "sumar" && !laTengo) {
      Alert.alert(
        "Primero al álbum",
        "No podés añadir una figurita repetida si todavía no la marcaste como obtenida en tu colección.",
      );
      return;
    }

    const nuevoEstadoRep = { ...repetidas };
    const paisActualRep = { ...nuevoEstadoRep[paisIngresado] };
    const cantActual = paisActualRep[numeroIngresado] || 0;

    if (operacion === "sumar") {
      paisActualRep[numeroIngresado] = cantActual + 1;
    } else if (operacion === "restar" && cantActual > 0) {
      paisActualRep[numeroIngresado] = cantActual - 1;
      if (paisActualRep[numeroIngresado] === 0)
        delete paisActualRep[numeroIngresado];
    }

    nuevoEstadoRep[paisIngresado] = paisActualRep;
    setRepetidas(nuevoEstadoRep);
    await guardarRepetidasAlbum(nuevoEstadoRep);
  };

  const limpiarBuscador = () => {
    setP1("");
    setP2("");
    setP3("");
    setN1("");
    setN2("");
    Keyboard.dismiss();
  };

  if (isLoading) {
    return (
      <View
        style={[
          globalStyles.container,
          styles.center,
          { backgroundColor: theme.bg },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, { backgroundColor: theme.bg }]}>
      <BuscadorRapidoInput
        p1={p1}
        setP1={setP1}
        p2={p2}
        setP2={setP2}
        p3={p3}
        setP3={setP3}
        n1={n1}
        setN1={setN1}
        n2={n2}
        setN2={setN2}
        onLimpiar={limpiarBuscador}
      />

      {esFiguValida && paisEncontrado && (
        <BuscadorRapidoResultado
          paisIngresado={paisIngresado}
          bandera={paisEncontrado.bandera}
          numeroIngresado={numeroIngresado}
          laTengo={laTengo}
          cantidadRepetidas={cantidadRepetidas}
          onToggleObtenida={handleToggleObtenida}
          onCambiarRepetidas={handleCambiarRepetidas}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: "center", alignItems: "center" },
});
