export interface InfoJugadores {
  nombre: string;
}

export const datosJugadores: {
  [pais: string]: { [numero: number]: InfoJugadores };
} = {
  FWC: {
    1: { nombre: "FWC 01" },
    2: { nombre: "FWC 02" },
    3: { nombre: "FWC 03" },
    4: { nombre: "FWC 04" },
    5: { nombre: "FWC 05" },
    6: { nombre: "FWC 06" },
    7: { nombre: "FWC 07" },
    8: { nombre: "FWC 08" },
    9: { nombre: "FWC 09" },
    10: { nombre: "FWC 010" },
    11: { nombre: "FWC 011" },
    12: { nombre: "FWC 012" },
    13: { nombre: "FWC 013" },
    14: { nombre: "FWC 014" },
    15: { nombre: "FWC 015" },
    16: { nombre: "FWC 016" },
    17: { nombre: "FWC 017" },
    18: { nombre: "FWC 018" },
    19: { nombre: "FWC 019" },
    20: { nombre: "FWC 020" },
  },
  CC: {
    1: { nombre: "CC 01" },
    2: { nombre: "CC 02" },
    3: { nombre: "CC 03" },
    4: { nombre: "CC 04" },
    5: { nombre: "CC 05" },
    6: { nombre: "CC 06" },
    7: { nombre: "CC 07" },
    8: { nombre: "CC 08" },
    9: { nombre: "CC 09" },
    10: { nombre: "CC 010" },
    11: { nombre: "CC 011" },
    12: { nombre: "CC 012" },
    13: { nombre: "CC 013" },
    14: { nombre: "CC 014" },
  },
  ARG: {
    1: { nombre: "Escudo AFA" },
    2: { nombre: "Emiliano Martínez" },
    3: { nombre: "Emiliano Martínez" }, //CAMBIAR
    4: { nombre: "Cristian Romero" },
    5: { nombre: "Nicolás Otamendi" },
    6: { nombre: "Nicolás Tagliafico" }, //CAMBIAR
    7: { nombre: "Nicolás Tagliafico" }, //CAMBIAR
    8: { nombre: "Nicolás Tagliafico" },
    9: { nombre: "Alexis Mac Allister" },
    10: { nombre: "Rodrigo De Paul" },
    11: { nombre: "Exequiel Palacios" },
    12: { nombre: "Leandro Paredes" },
    13: { nombre: "Equipo" },
    14: { nombre: "Nico Paz" },
    15: { nombre: "Franco Mastantuono" },
    16: { nombre: "Nico Gonzáles" },
    17: { nombre: "Lionel Mess" },
    18: { nombre: "Lautaro Martínez" },
    19: { nombre: "Julián Alvarez" },
    20: { nombre: "Giulliano Simeone" },
  },
};
