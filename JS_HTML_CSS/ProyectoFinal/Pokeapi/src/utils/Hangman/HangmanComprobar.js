import { initControler } from "..";
import { Foto } from "../../data/hangmanData";

// Contador de fallos
let contador = 0;

export const hangmanComprobar = (inputValue, palabra) => {
  // Convertimos el valor del input en mayusculas y minusculas
  const minus = inputValue.toLowerCase();
  const mayus = inputValue.toUpperCase();

  // Comprobamos si se incluye la letra del input en la palabra random ("en forma de string")
  if (palabra[1].includes(minus)) {
    // Si se incluye, hemos acertado

    // Recorremos palabra random (en formato array)
    palabra[0].forEach((element) => {
      // si la letra introducida coincide con alguna letra de la palabra
      if (minus === element) {
        // Pintamos la letra que coincida en el id con el valor
        const p = document.getElementById(`${minus}`);
        // Pintamos la letra acertada
        p.innerHTML = mayus;
        // Le añadimos un id para contar los aciertos
        p.setAttribute("id", "acierto");
        p.setAttribute("class", "hangmanPacertado");

        // vaciamos el input
        const input = document.querySelector("#hangmanInput");
        input.value = "";
      }
    });

    // Una vez pintados los aciertos, comprobamos que la cantidad de aciertos no sea superior a la longitud de la palabra random
    const pElementAcertados = document.querySelectorAll(".hangmanPacertado");

    // Si tiene la misma longitud que la palabra es que ha ganado la partida
    if (pElementAcertados.length === palabra[0].length) {
      setTimeout(() => {
        // SetTimeOut para que espere un poquito y vaciar el div
        const div = document.querySelector("#hangmanDiv2");
        div.innerHTML = "";
        const h1 = document.createElement("h1");
        h1.innerHTML = "Has ganado";
        const button = document.createElement("button");
        button.innerHTML = "Play again";
        button.setAttribute("id", "hangmanReset");
        div.append(h1, button);
        addListenner();
      }, 500);
    }

    // Si no se incluye es que hemos fallado
  } else {
    // Aumentamos el contador de fallos
    contador++;

    // Cambiar la imagen
    const img = document.querySelector("#hangmanImg");
    img.setAttribute("src", `${Foto[contador]}`);

    // Borramos input
    const input = document.querySelector("#hangmanInput");
    input.value = "";

    // Comprobar si los fallos son 6 porque hay 7 imagenes

    if (contador === 6) {
      // Hemos perdido

      setTimeout(() => {
        // SetTimeOut para que espere un poquito y vaciar el div
        const div = document.querySelector("#hangmanDiv2");
        div.innerHTML = "";
        const h1 = document.createElement("h1");
        h1.innerHTML = "Hemos perdido";
        const button = document.createElement("button");
        button.innerHTML = "Play again";
        button.setAttribute("id", "hangmanReset");
        div.append(h1, button);
        addListenner();
      }, 500);
    }
  }
};

const addListenner = () => {
  const reset = document.querySelector("#hangmanReset");
  reset.addEventListener("click", () => {
    // Reseteamos contador
    contador = 0;

    const letras = document.querySelectorAll(".hangmanP");

    // Borramos los guiones de la palabra random
    letras.forEach((element) => {
      element.remove();
    });

    initControler("Hangman");
  });
};
