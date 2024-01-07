import { numeroRandom } from "../numeroRandom";

const palabras = [
  "chubasquero",
  "perro",
  "nieve",
  "tormenta",
  "ordenador",
  "agobio",
];

// Devolvemos un array de la palabra random en formato array y en formato string

export const palabraRandom = () => {
  const palabra = palabras[numeroRandom(palabras)];
  let arrayPalabra = palabra.split("");
  return [arrayPalabra, palabra];
};
