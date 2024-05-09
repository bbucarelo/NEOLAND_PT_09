// crea un nuevo array con los resultados de la llamada 
// a la función indicada aplicados a cada uno de sus elementos
// Valor devuelto: Un nuevo array en la que cada elemento es el resultado de ejecutar callback.

// var nuevo_array = arr.map(function callback(currentValue, index, array) {
    // Elemento devuelto de nuevo_array
// }[, thisArg])

function mapCustom(array, callback) {
    const nuevoArray = [];
    for (let index = 0; index < array.length; index++) {
        nuevoArray.push(callback(array[index], index, array)) 
    }

    return nuevoArray;
};

const arrNums = [1,4,6,7,8,10]
const response = mapCustom(arrNums, (item, index, array)=>item + 6);
console.log(response);