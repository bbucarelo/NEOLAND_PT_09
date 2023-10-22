//? Crea una función llamada findArrayIndex que reciba como parametros un array de textos y un texto 
//? y devuelve la posición del array cuando el valor del array sea igual al valor del texto que enviaste como parametro. 
//? Haz varios ejemplos y compruebalos.


let arrayDado = ['Caracol', 'Mosquito', 'Salamandra', 'Ajolote'];
let texto = "Ajolote" 

   let findArrayIndex = (array, text) => {
        console.log(array.indexOf(text))

}
    findArrayIndex(arrayDado,texto)