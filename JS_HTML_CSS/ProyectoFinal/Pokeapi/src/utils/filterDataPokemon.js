// esto es para el input

 export const filterDataPokemon = (data, wordInput) => {
   console.log(data);
    const dataFiltrada = data.filter((pokemon)=>
    pokemon.name.toLowerCase().includes(wordInput.toLowerCase()));
    return dataFiltrada;
};




