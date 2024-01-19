


export const filterButtonPokemon = (data, type) => {
     const dataFiltrada = data.filter((pokemon)=>
     pokemon.type[0].type.name == type )
     console.log(dataFiltrada);
     return dataFiltrada;
 };




