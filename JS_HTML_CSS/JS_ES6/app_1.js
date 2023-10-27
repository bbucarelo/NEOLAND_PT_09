// Hacer todos los ejercicios de ES6 menos el 5.6;
//? Crea una arrow function que tenga dos parametros a y b 
//? y que por defecto el valor de a = 10 y de b = 5. Haz que la función muestre 
//? por consola la suma de los dos parametros.

    const sumaParametros = (a =10, b=5) => {
        
        console.log(a+b);
    }
    sumaParametros(7,2);
//? 1.1 Ejecuta esta función sin pasar ningún parametro
    sumaParametros();


//? 1.2 Ejecuta esta función pasando un solo parametro
    sumaParametros(7);

//? 1.3 Ejecuta esta función pasando dos parametros
    sumaParametros(15,12);
