import "./Footer.css";

const template = `
<footer>Soy el footer 😒</footer>
`

export const PrintFooter = () => (document.querySelector("#app").innerHTML += template);