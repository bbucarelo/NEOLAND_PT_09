//? Completa la función que tomando dos números como argumento devuelva el más alto.

function sum(numberOne , numberTwo) {
    if (numberOne > numberTwo) {
        return numberOne;
    }   else {
        return numberTwo;
    }
}
const sumNumeroMasAlto = sum(35,7)
console.log(sumNumeroMasAlto);

//? Ahora haciendolo con arrow

const sumArrow = (numberOne, numberTwo) => {
    if (numberOne > numberTwo) {
        return numberOne;
    }   else {
        return numberTwo;
    }
}

const sumNumeroMasAltoArrow = sumArrow(35,7)
console.log(sumNumeroMasAltoArrow)

