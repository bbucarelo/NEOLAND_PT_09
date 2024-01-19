// funcion que clasifica los pokemon y que se debe exportar para poder usarlo en los botones

export const typePokemon = (totalPokemon) => {
  const nameTypeNoRepeat = [];

    totalPokemon.forEach((element, index) => {
        element.type.forEach((FirstType)=> {
            !nameTypeNoRepeat.includes(FirstType.type.name) && 
                nameTypeNoRepeat.push(FirstType.type.name);
        });
    });

    return nameTypeNoRepeat;
};


