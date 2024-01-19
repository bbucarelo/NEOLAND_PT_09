import { PrintButton, PrintFigurePokemon, PrintSpinner } from "../../components";

import { filterDataPokemon, getDataServicePokemon, typePokemon } from "../../utils";
import "./Pokemon.css";

//La asincronía siempre se debe tratar con el servicio

const template = () => 
`
  <div id="pokemon">
    <div id="containerFilter">
      <div id="spinnerButtonFilter"></div>
      <div id="filterButton"></div>
      <input
        type="text"
        id="inputPokemon"
        placeholder="Busca tu pokemon favorito"
      />
    </div>
    <div id="spinner"></div>
    <div id="galleryPokemon"></div>
  </div>
`;

const getDataService = async () => {
  PrintSpinner();
    const data = await getDataServicePokemon(); //Esta es la del bucle de dataPokemon
    const types = typePokemon(data);
    //console.log(types);
    listeners(data);
    printGallery(data);
    PrintButton(types, data);
    
   
    document.getElementById("spinner").innerHTML = "";
    
};
    
const printGallery = (dataPrint) => {
  document.getElementById("galleryPokemon").innerHTML = "";
  dataPrint.map((pokemon) => 
    PrintFigurePokemon(pokemon.name, pokemon.id, pokemon.image, pokemon.type, pokemon.height, pokemon.weight)
    );
};

const listeners = (totalData) => {
  const inputPokemon = document.getElementById("inputPokemon");
  inputPokemon.addEventListener("input", (e)=>{
    const filterData = filterDataPokemon(totalData, e.target.value);
    // console.log(filterData);
    printGallery(filterData);
  });

  
};


export const PrintPokemonPage = () => {
    document.querySelector("main").innerHTML = template ();
    getDataService();
    }