//? Crea una función llamada rollDice() que reciba como parametro el numero de caras que queramos que tenga el dado 
//? que deberá simular el codigo dentro de la función. 
//? Como hemos dicho, que la función use el parametro para simular una tirada de dado y retornar el resultado. 
//? Si no se te ocurre como hacer un numero aleatorio no te preocupes! busca información sobre la función de javascript Math.random();


    const rollDice = (numCaras) => {
        return Math.floor(Math.random() * (numCaras - 1 + 1) + 1); 
        //? Esto es (-1) un mínimo valor que debe tener
    }

    const dado = rollDice(5);
    console.log(dado);

