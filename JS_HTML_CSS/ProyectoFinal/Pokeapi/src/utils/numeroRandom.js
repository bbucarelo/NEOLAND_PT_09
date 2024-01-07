export const numeroRandom = (array) => {
  let min = Math.ceil(0);
  let max = Math.floor(array.length - 1);
  return Math.floor(Math.random() * (max - min - 1) + min);
};


//esto es usado para el hangman 