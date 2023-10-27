//? Crea una función llamada swap() que reciba un array y dos parametros que sean indices del array. 
//? La función deberá intercambiar la posición de los valores de los indices que hayamos enviado como parametro. 
//? Retorna el array resultante.
//! Hacer console.log para saber que está entregando, cambiar function por arrow 
const array = ['Mesirve', 'Cristiano Romualdo', 'Fernando Muralla', 'Ronalguiño']

const swapArray = (array, param1, param2) => {

    const copyArray = [...array];
    const posicionArray = copyArray[param1];
    const posicionArrayc = copyArray[param2];
    
    copyArray.splice(param1, 1, posicionArrayc);
    copyArray.splice(param2, 1, posicionArray);
    
    return copyArray;
    


    
}
    console.log(swapArray(array,1,2));



