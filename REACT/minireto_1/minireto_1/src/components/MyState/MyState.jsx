import { useState } from "react";
import React from "react";


export const MyState = () => {
    const [myName, setMyName] = useState("Ziggy Stardust");
    return (
        <>
        <h4>{myName}</h4>
        <input
          type="text"
          value={myName}
          onChange={(e) => setMyName(e.target.value)}
        />
      </>

    );

};

//Vemos que como particularidad en el onChange invocamos al ‘setter’ con el valor actual del input, 
// gracias al onChange cambiará a tiempo real y nuestro estado será totalmente dinámico. 