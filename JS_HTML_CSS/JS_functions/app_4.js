//? Calcular un promedio es una tarea extremadamente común.

const numbers = [12, 21, 38, 5, 45, 37, 6];

average = param => {

let sum = 0; 

numbers.forEach((number, index) => {
    sum += number;
    avg = sum / numbers.length;
}
)
console.log(avg)
}
average(numbers);