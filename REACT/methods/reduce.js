// El método reduce() ejecuta una función reductora sobre cada elemento de un array, 
// devolviendo como resultado un único valor
//? Función reductora = función que toma dos valores y los combina en un solo valor. 
//? Este proceso de reducción se repite iterativamente sobre una secuencia de valores hasta que se procesan todos los elementos
// Sintaxis: arr.reduce(callback(acumulador, valorActual[, índice[, array]])[, valorInicial])

function customReduce(array, callback, valorInicial) {

    let acumulador = valorInicial !== undefined ? valorInicial : array[0]; //inicializando el valor de acumulador 
    const indexInicial = valorInicial !== undefined ? 0 : 1; //Esto determina desde donde puede iniciar el index
    
    for (let index = indexInicial; index < array.length; index++) {
        acumulador = callback(acumulador, array[index], index, array); //actualizando el valor de acumulador en cada iteración como hicimos con map 
        
    }

    return acumulador;
};

const array = [1,2,3,4,5];
const valorInicial = 10;
const response = customReduce(array, (acumulador, valorActual) => acumulador + valorActual, valorInicial);
console.log(response);

