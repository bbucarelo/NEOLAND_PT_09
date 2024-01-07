import { changeColorRGB, initControler } from "../../utils";
import "./Header.css";

const template = () => `
  <img
    src="https://res.cloudinary.com/ddte4t4qb/image/upload/v1703801471/Blue_Pink_Minimalist_Organic_Creative_Name_Letter_Company_Logo_2_v6j4zg.png"
    alt="title hub game website (app)"
    class="logo"
  />
  <nav>
    <img
      src="https://res.cloudinary.com/ddte4t4qb/image/upload/v1703799753/color-wheel_4822056_tk02aj.png"
      alt=" change to style mode page"
      id="changeColor"
    />
    <img
      src="https://res.cloudinary.com/ddte4t4qb/image/upload/v1703799850/gamepad_1884705_ann4dq.png"
      alt=" navigate to home app"
      id="buttonDashboard"
    />
    <img
      src="https://res.cloudinary.com/ddte4t4qb/image/upload/v1703800123/switch_9974616_ozvndg.png"
      alt="logout"
      id="buttonLogout"
    />
  </nav>
`;

const listeners = () => {

  //Se introduce el evento del boton de la función changecolors, apuntando a el:

    const changeColor = document.getElementById("changeColor");
    changeColor.addEventListener("click", () => {
        const colorRGB = changeColorRGB();
        document.body.style.background = colorRGB; //funcion que cambia el estilo del color 

    });

    const buttonDashboard = document.getElementById("buttonDashboard");
     buttonDashboard.addEventListener("click", ()=> {
      //console.log("pinto dashboard"); 
      initControler("Dashboard");

    const buttonLogout =  document.getElementById("buttonLogout");
      buttonLogout.addEventListener("click", () => {
        localStorage.removeItem("user"); //Debo borrar al usuario, al ser un logout y pasarlo al controlador
        initControler();
      })

  })

};

// Debajo está la respectiva función que se exporta y pinta (así como en el footer), siempre va abajo del todo:

export const PrintTemplateHeader = () => {
    document.querySelector("header").innerHTML = template ();
    listeners();

};
