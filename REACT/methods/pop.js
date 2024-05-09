// Elimina el último elemento de un array y lo devuelve
// Este método cambia la longitud del array
// Validar la longitud del array 


function popCustom(array) {
    if (array.length === 0) 
        return undefined; //validando la longitud del array


const ultimoElemento = array[array.length - 1]; //guardando y obteniendo el ultimo elemento (asignar)

array.length = array.length - 1;

return ultimoElemento;

};

const arr = [1,2,3]
const response = popCustom(arr);
console.log(response);



