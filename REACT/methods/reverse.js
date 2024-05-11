
// invierte el orden de los elementos de un array in place. 
// El primer elemento pasa a ser el último y el último pasa a ser el primero
// Valor devuelto: El array invertido.

function reverseCustom(array) {
    //Se definen los índices en extremos derecho e izquierdo
    let leftIndex = 0; 
    let rightIndex = array.length - 1; 

    while (leftIndex < rightIndex) { // Condición a cumplir
        //Sin usar un array temporal
        [array[leftIndex], array[rightIndex]] = [array[rightIndex], array[leftIndex]];
        leftIndex++; 
        rightIndex--; 
    }

};

const array = [1, 2, 3, 4, 5];
reverseCustom(array);
console.log(array); 