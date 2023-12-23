const template = `

    <label>Introduzca un personaje a buscar: </label>
    <input type="text" id="inputBusqueda">

`;

const listeners =()=>{
    const input = document.querySelector("inputBusqueda")
    input.addEventListener("input", (e)=> {
        console.log(e.target.value);
    });

};

export const PrintInput =()=> {
    document.querySelector("#BusquedaPages").innerHTML += template;
    listeners();
}