import { PrintDashboard, PrintLogin, PrintPokemonPage, printTemplateTresEnRaya} from "../pages";
import { printTemplateHangman } from "../pages/Hangman/Hangman";


// El initControler es una ruta de lo que vamos a renderizar en el main, están todos los casos a pintar en el dashboard, que llamamos luego en cada una de las pages
export const initControler = (paginaQueVamosAPintar) => {
    switch (paginaQueVamosAPintar) {
        case undefined:
            localStorage.getItem("user") 
            ? PrintDashboard()
            : PrintLogin();
        break;

        case "Pokemon":
            PrintPokemonPage();
        break;

        case "Dashboard":
            PrintDashboard();
        break;

        case "TresEnRaya":
            printTemplateTresEnRaya();
        break;

        case "Hangman":
            printTemplateHangman();
        break;

        default:
        break;
}

};