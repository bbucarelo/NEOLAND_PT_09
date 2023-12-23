import { PrintFooter } from "../Estructura/Footer/Footer";
import { PrintHeader } from "../Estructura/Header/Header";
import { PrintMain } from "../Estructura/Main/Main";
import { Listener } from "../Nav/Nav";

export const initTemplate = () => {
    PrintHeader();
    PrintMain();
    PrintFooter();
    Listener();
}