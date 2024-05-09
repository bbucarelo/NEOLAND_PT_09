import "./image.css"

export const Image = (src, alt) => {
  const {source}= src;
  const {textoalt} = alt;
      return (
       <img src={source} alt={textoalt}/>
      );
    };
    

//    <img src="https://reactjs.org/logo-og.png" alt="React Image" /> 