
import { generalGame } from "../../utils/TresEnRaya/TresEnRayaLogic";
import "./TresEnRaya.css";


const template = () => `

<body id="CuerpoJuego">
    <div class="container" id="General">
        <h1 id="playerText">Tres en Raya</h1>
        <button id="restartBtn">Restart</button>

        <div id="gameboard">
            <div class="box" id="0"></div>
            <div class="box" id="1"></div>
            <div class="box" id="2"></div>
            <div class="box" id="3"></div>
            <div class="box" id="4"></div>
            <div class="box" id="5"></div>
            <div class="box" id="6"></div>
            <div class="box" id="7"></div>
            <div class="box" id="8"></div>
        </div>
    </div>
    
</body>
`

export const printTemplateTresEnRaya = () => {
    document.querySelector("main").innerHTML = template();
    generalGame();
   
    
};


