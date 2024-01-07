import { getByIdPokemon } from "../services/pokemon.service"



export const getDataServicePokemon = async() => {


    const rawData = []
        for(let i=1; i<151; i++) {
            rawData.push(await getByIdPokemon(i))
        }
        // console.log(rawData);
        return dataMap(rawData); 
};

    const dataMap = (data) => {
        const filterDataa = data.map((pokemon) => ({
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default, // ruta especifica para acceder a la imagen
            type: pokemon.types, //los tipos sirven para los botones si no hiciera el select
            id: pokemon.id,
            height: pokemon.height, // requerimiento adicional del mapeo 
            weight: pokemon.weight,
        }));

       return filterDataa;

    };

   