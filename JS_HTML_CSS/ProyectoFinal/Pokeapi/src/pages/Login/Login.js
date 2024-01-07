import { initControler } from "../../utils";
import "./Login.css";

const template = () => `
  <div id="containerLogin">
    <h1 id="titleLogin">LOGIN</h1>
    <p id="instruccionUsuario">Introduce debajo tu usuario:</p>
    <input type="text" name="username" id="username" />
    <button id="buttonLogin">Enviar</button>
  </div>
  `;

const listeners = () => {
    const buttonLogin = document.getElementById("buttonLogin");
    buttonLogin.addEventListener("click", () => {
      const input = document.getElementById("username");
      const valueInput = input.value;
    

    localStorage.setItem("user", valueInput);
    initControler();
    });
};

export const PrintLogin = () => {
    document.querySelector("main").innerHTML = template();
    document.querySelector("nav").style.display = "none";
    listeners();
}
  