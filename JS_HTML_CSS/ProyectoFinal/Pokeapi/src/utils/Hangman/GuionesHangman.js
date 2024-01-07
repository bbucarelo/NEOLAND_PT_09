export const guionesHangman = (array) => {
  // Recorremos la palabra random y creamos tantos p como letras tenga
  array.forEach((element) => {
    let p = document.createElement("p");
    // Le vamos a añadir una clase y un id
    p.setAttribute("class", "hangmanP");
    p.setAttribute("id", `${element}`);

    // Seleccionamos el div de los guiones y le inyectamos los p
    const guionesDiv = document.querySelector(".guiones");
    guionesDiv.appendChild(p);
  });
};
