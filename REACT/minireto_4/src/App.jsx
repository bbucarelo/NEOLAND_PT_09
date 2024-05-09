import { useState } from "react";


//! Minireto 3: 
const App = () => {
  
  const [estado, setEstado] = useState(true);
    
  return (
    
      <>
        <button onClick={() => setEstado((estados) => estados + 1)}>

       
          
          </button>
      </>
  )       
}


export default App
