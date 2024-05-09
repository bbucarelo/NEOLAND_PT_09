// Se usa para unir dos o más arrays 
// Este método no cambia los arrays existentes, sino que devuelve un nuevo array
// Valor devuelto: Una nueva instancia de Array
//? var nuevo_array = viejo_array.concat(valor1[, valor2[, ...[, valorN]]])

function concatCustom(...arrays) {
    const nuevoArray = [];
    for (const array of arrays) {
        nuevoArray.push(...array);
        }     

    return nuevoArray;
};

const array1 = ["pato", "pera", 1];
const array2 = ["perro", "manzana", 2];
const array3 = ["gato", "uva", 3];

const nuevoArray = concatCustom(array1, array2, array3);
console.log(nuevoArray);

  