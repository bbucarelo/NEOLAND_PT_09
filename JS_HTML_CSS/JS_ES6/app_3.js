//? 3.1 Dado el siguiente array, crea una copia usando spread operators.

   // const pointsList = [32, 54, 21, 64, 75, 43];
   // const pointsListCopy = [...pointsList];
     //   console.log(pointsListCopy);


//? 3.2 Dado el siguiente objeto, crea una copia usando spread operators.

   // const toy = {name: 'Bus laiyiar', date: '20-30-1995', color: 'multicolor'};
   // const toyCopy = {...toy};
       // console.log(toyCopy);


//? 3.3 Dado los siguientes arrays, crea un nuevo array juntandolos usando spread operatos.

    const pointsList = [32, 54, 21, 64, 75, 43];
    const pointsLis2 = [54,87,99,65,32];
    const pointListsCopy = [...pointsList, ...pointsLis2];
        console.log(pointListsCopy);


//? 3.4 Dado los siguientes objetos. Crea un nuevo objeto fusionando los dos con spread operators.
const toy = {name: 'Bus laiyiar', date: '20-30-1995', color: 'multicolor'};
const toyUpdate = {lights: 'rgb', power: ['Volar like a dragon', 'MoonWalk']};

    const newToy = {...toy, ...toyUpdate};
        console.log(newToy);

//? 3.5 Dado el siguiente array, crear una copia de él eliminando la posición 2 pero sin editar el array inicial. 
//? De nuevo, usando spread operator.

    const colors = ['rojo', 'azul', 'amarillo', 'verde', 'naranja'];
    const colorsCopy = [...colors];
        console.log(colorsCopy);
    
    colorsCopy.splice(2, 1);
        console.log(colorsCopy);
