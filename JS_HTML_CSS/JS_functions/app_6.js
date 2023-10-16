//? Crea una función que reciba por parámetro un array y compruebe si existen elementos duplicados, 
//? En caso que existan los elimina para retornar un array sin los elementos duplicados. 

const duplicates = [
    'sushi',
    'pizza',
    'burger',
    'potatoe',
    'pasta',
    'ice-cream',
    'pizza',
    'chicken',
    'onion rings',
    'pasta',
    'soda'
  ];

  function removeDuplicates(param) {
    const final = []

        duplicates.forEach((element,index) => {
        if(!final.includes(element)) {
            final.push(element);
        }
        });
    console.log(final);
  }
  removeDuplicates(duplicates);