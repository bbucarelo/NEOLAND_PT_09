const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
console.log(avengers[0])

avengers[0] = "IRONMAN";
console.log(avengers[0])

cantidadElementos = avengers.length
console.log(cantidadElementos)

const rickAndMortyCharacters = ["Rick", "Beth", "Jerry"];
rickAndMortyCharacters.push("Morty","Summer")
console.log(rickAndMortyCharacters[4])
console.log(rickAndMortyCharacters)

const characters = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
characters.pop();

dibujosAnimados = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
dibujosAnimados.splice(1, 1);
console.log(dibujosAnimados)