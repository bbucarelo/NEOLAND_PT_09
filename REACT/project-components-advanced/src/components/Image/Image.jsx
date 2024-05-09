import "./image.css"

export const Image = (src, alt) => {
  const {source}= src;
  const {textoalt} = alt;
      return (
       <img src={source} alt={textoalt}/>
      );
    };
    