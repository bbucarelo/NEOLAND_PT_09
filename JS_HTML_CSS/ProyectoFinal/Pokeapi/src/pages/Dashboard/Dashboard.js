import { initControler } from "../../utils";
import "./Dashboard.css";


const template = () => `
  <div id="containerDashboard">
    <ul>
      <li>
        <figure id="navigatePokemon">
          <img
            src="https://res.cloudinary.com/ddte4t4qb/image/upload/v1703802186/pokemon_1169710_xseagc.png"
            alt="go to page pokemon"
          />
          <h2>Pokemon</h2>
        </figure>
      </li>
      <li>
        <figure id="navigateTresEnRaya">
          <img
            src="https://res.cloudinary.com/ddte4t4qb/image/upload/v1704404213/tic-tac-toe_12469781_gn2bpt.png"
            alt="go to tres en raya"
          />
          <h2>Tres en raya</h2>
        </figure>
      </li>
      <li>
        <figure id="navigateHangman">
          <img
            src="https://res.cloudinary.com/ddte4t4qb/image/upload/v1704404302/hangman_514163_s5ztsi.png"
            alt="go to hangman"
          />
          <h2>Hangman</h2>
        </figure>
      </li>
    </ul>
  </div>
`;


    const listeners = () => {
        const navigatePokemon = document.getElementById("navigatePokemon");
              navigatePokemon.addEventListener("click", ()=> {
              initControler("Pokemon");
    });

    const navigateTresEnRaya = document.getElementById("navigateTresEnRaya");
          navigateTresEnRaya.addEventListener("click", () => {
          initControler("TresEnRaya");
          });

    const navigateHangman = document.getElementById("navigateHangman");
          navigateHangman.addEventListener("click", () => {
          initControler("Hangman");
    });    

  };


export const PrintDashboard =() => {
  document.querySelector("nav").style.display = "flex";
    document.querySelector("main").innerHTML = template();
    listeners();

};