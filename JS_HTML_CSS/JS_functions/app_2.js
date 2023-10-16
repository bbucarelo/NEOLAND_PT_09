//? Completa la función que tomando un array de strings como argumento devuelva el más largo
//? en caso de que dos strings tenga la misma longitud deberá devolver el primero.

const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];
PalabraMasLarga = param => { //? Meter dentro del contenedor, tiene que ser luego del array porque no es reutilizable (uso param para hacerla reutilizable)
let findLongestWord = "";
let numberWord = 0;

avengers.forEach((superheroName, index) => {

    if (superheroName.length > numberWord) {
        findLongestWord=superheroName;
        numberWord=superheroName.length;
    }
}
)
console.log(findLongestWord)
}
PalabraMasLarga (avengers);