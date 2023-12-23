import { PrintInput } from "../../Input/Input";
import "./Busqueda.css"
const template = () => `<div id="BusquedaPages">
</div>`

export const PrintBusquedaPages = () => {
    document.querySelector("main").innerHTML = template();
    PrintInput();
};
