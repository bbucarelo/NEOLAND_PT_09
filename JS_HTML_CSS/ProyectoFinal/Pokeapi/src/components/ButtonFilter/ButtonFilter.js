
import { filterButtonPokemon} from "../../utils";
import "./ButtonFilter.css"

export const PrintButton = (types, data)  => {

    types.forEach((type) =>{
        const buttonType = `<button class="buttonFilter ${type}">${type}</button>`;
    const containerFilter = document.getElementById("filterButton");
    containerFilter.innerHTML += buttonType;
    });

    addListeners(data);
    };

const addListeners = (data) => {
    const allButton = document.querySelectorAll(".buttonFilter");
    allButton.forEach((button) => {
        button.addEventListener("click", (e) => {
            //console.log(button.textContent);
            const typesFilter = button.textContent;
            filterButtonPokemon(data, typesFilter);
            
        })
        
    })

    // types.forEach((type) => {
    //     const buttonType = document.querySelector(`.${type}`);
    //     buttonType.addEventListener("click", (e) => {
    //     filterButtonPokemon(data, type);
    //     });
    // }); antigua
};


