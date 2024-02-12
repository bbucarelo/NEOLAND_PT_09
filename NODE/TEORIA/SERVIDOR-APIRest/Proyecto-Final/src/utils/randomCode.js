//Función que crea un código random que se enviará por correo como confirmationCode y se guardará en el user

const randomCode = () => {
    let code = Math.floor(Math.random() * (999999 - 100000) + 1000000);
    return code;
};

module.exports = randomCode;

