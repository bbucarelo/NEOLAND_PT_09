const template = ()=> `<div id="containerHomePage">
<h2>Soy el home</h2>
</div>`;

export const PrintHomePage = () => (document.querySelector("main").innerHTML = template());