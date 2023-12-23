import { PrintNav } from "../../Nav/Nav";
import "./header.css"

const template = () => `<header> 
<h1 id="titulo">Proyecto Bárbara</h1>
</header>`;

export const PrintHeader = () => {
    document.querySelector("#app").innerHTML += template();
    PrintNav();
}
    
    

