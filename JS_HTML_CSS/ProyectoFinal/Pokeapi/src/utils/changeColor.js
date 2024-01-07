export const changeColorRGB = () => {

  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    console.log(min);
    max = Math.floor(max);
   const random = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(
      "🚀 ~ file: changeColor.js:8 ~ randomNumber ~  random:",
      random
    );

    return random;
  };
  
  let R = randomNumber(0, 255);
  let G = randomNumber(0, 255);
  let B = randomNumber(0, 255);
  let A = Math.random();

  const color = `rgba(${R},${G},${B},${A})`;
  return color;
};

// funcion que permite el cambio de colores en la pokeapi