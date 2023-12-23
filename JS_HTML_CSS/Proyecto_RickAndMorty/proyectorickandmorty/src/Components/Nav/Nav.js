import { PrintBusquedaPages } from "../Pages/Busqueda/Busqueda";
import { PrintHomePage } from "../Pages/Home/Home";
import "./Nav.css";

const template = () => `
<nav>
    <button id="navegateHome" class="btn-nav">HOME</button>
    <button id="navegateBusqueda" class="btn-nav">BUSQUEDA</button>
</nav>`;

export const Listener = () => {
    const home = document.getElementById("navegateHome");
    home.addEventListener("click", () => {
        PrintHomePage();
    });


    const busqueda = document.getElementById("navegateBusqueda");
    busqueda.addEventListener("click", () => {
        PrintBusquedaPages();
    });

}

export const PrintNav = ()=> {
    document.querySelector("header").innerHTML += template();
}