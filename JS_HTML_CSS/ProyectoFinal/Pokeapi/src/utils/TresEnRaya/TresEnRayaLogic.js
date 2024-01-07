export const generalGame = () => {
    console.log("entro");

let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue("--winning-blocks")
let drawIndicator = getComputedStyle(document.body).getPropertyValue("--empate")

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let count_plays = 0 // Funcion que no permite que se siga rellenando

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

        if(!spaces[id] && count_plays < 9) {
            spaces[id] = currentPlayer
            e.target.innerText = currentPlayer

            if(playerHasWon() !==false){
                playerText.innerHTML = `¡${currentPlayer} ha ganado!`
                let winning_blocks = playerHasWon()
                count_plays = 10 // Que pare tanto si ha ganado como si se han completado las 9 casillas 
                winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
                return
            }
            count_plays++
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
        }

        if(count_plays === 9) {
            playerText.innerHTML = "¡Es un empate!"
            boxes.forEach(box => box.style.color = drawIndicator)
        }
}


const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() { // Destructuring para evaluar la condicion
    for (const condition of winningCombos) {
        let [a, b, c] = condition
            //condicion debajo para evaluar que todos sean iguales en X or O (transitividad)
            if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
                return [a,b,c]
            }
    }
    return false;
}


restartBtn.addEventListener("click", restart)

function restart() {
    spaces.fill(null)
    count_plays = 0
    boxes.forEach( box => { // Aqui se reinician todos los valores para que no queden valores del juego pasado 
        box.innerText = ""
        box.style.backgroundColor= ""
        box.style.color = "#C3ACD0"
    })

    playerText.innerHTML = "Tres en Raya"

    currentPlayer = X_TEXT
}

startGame();

}
