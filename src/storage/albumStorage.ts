import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ProgresoAlbum {
  [abreviaturaPais: string]: number[];
}

const STORAGE_KEY = "@progreso_album_virtual_v1";

export const guardarProgresoAlbum = async (
  progreso: ProgresoAlbum,
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(progreso);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error("Error al guardar el progreso en el storage:", error);
  }
};

export const cargarProgresoAlbum = async (): Promise<ProgresoAlbum> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
    return {};
  } catch (error) {
    console.error("Error al cargar el progreso desde el storage:", error);
    return {};
  }
};

export const borrarProgresoAlbum = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error al borrar el progreso:", error);
  }
};

//REPETIDAS
export interface RepetidasAlbum {
  [abreviaturaPais: string]: { [numFigu: number]: number };
}

const REPETIDAS_KEY = "@repetidas_album_virtual_v1";

export const guardarRepetidasAlbum = async (
  repetidas: RepetidasAlbum,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(REPETIDAS_KEY, JSON.stringify(repetidas));
  } catch (error) {
    console.error("Error al guardar las repetidas:", error);
  }
};

export const cargarRepetidasAlbum = async (): Promise<RepetidasAlbum> => {
  try {
    const jsonValue = await AsyncStorage.getItem(REPETIDAS_KEY);
    return jsonValue !== null ? JSON.parse(jsonValue) : {};
  } catch (error) {
    console.error("Error al cargar las repetidas:", error);
    return {};
  }
};
