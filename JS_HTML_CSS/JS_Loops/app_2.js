//? Comprueba en cada uno de los usuarios que tenga al menos dos trimestres aprobados 
//? Y añade la propiedad isApproved a true o false en consecuencia.
//? Una vez lo tengas compruébalo con un console.log. 

const alumns = [
    {name: 'Pepe Viruela', T1: false, T2: false, T3: true}, 
	{name: 'Lucia Aranda', T1: true, T2: false, T3: true},
	{name: 'Juan Miranda', T1: false, T2: true, T3: true},
	{name: 'Alfredo Blanco', T1: false, T2: false, T3: false},
	{name: 'Raquel Benito', T1: true, T2: true, T3: true}
]

    for (let i = 0; i < alumns.length; i++) {
        
		const trimestresAprobados = [alumns[i].T1, alumns[i].T2, alumns[i].T3];
		let aprobadosAcc = 0;
		
			for (let j = 0; j < trimestresAprobados.length; j++) {
				if (trimestresAprobados[j]) {
					aprobadosAcc++;
				}
			}
		alumns[i].isApproved = aprobadosAcc >= 2 ? true : false;

    }
		console.log(alumns)

//! ¿Cómo añadir un array de solamente los aprobados?