import "./FigurePokemon.css";

//clase dinámica y para que coja el figure metemos "" para que coja varias cosas
const template = (name, id, image, type, height, weight) => `
<figure class="${type[0].type.name} height figurePokemon" id=${id}> 
    <img src=${image} alt=${name}/>
    <h3>${name}</h3>
    <p> ID: ${id}
    <p> height: ${height}
    <p> weight: ${weight}
    </h3>

</figure>
`
export const PrintFigurePokemon = (name, id, image, type, height, weight) => {
    document.getElementById("galleryPokemon").innerHTML += template(
        name, 
        id, 
        image, 
        type,
        height,
        weight,
    );
};
