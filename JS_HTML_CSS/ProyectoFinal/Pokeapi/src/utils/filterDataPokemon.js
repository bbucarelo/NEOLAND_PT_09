

export const filterDataPokemon = (data, wordInput) => {
    const dataFiltrada = data.filter((pokemon)=>
    pokemon.name.toLowerCase().includes(wordInput));
    console.log(dataFiltrada);
    return dataFiltrada;
};