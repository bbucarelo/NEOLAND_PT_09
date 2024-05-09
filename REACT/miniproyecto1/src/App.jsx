import React from 'react';
import './App.css'

const App = () => {

  const [characterList, setCharacterList] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      let data = await fetch(`https://rickandmortyapi.com/api/character/`).then(
        (res) => res.json()
      );

      setCharacterList(data.results);
    })();
  }, []);

  return (
    <>
     
      {characterList.map((character) => (
        <div className="character" key={character.id}>
          {character.status === "Alive" && 
<p>
          <h2>Name: {character.name}</h2>
          <h2>Id: {character.id}</h2>
          <img src= {character.image} />
          <h3> Status: {character.status}</h3>
          <h4>Origin: {character.origin.name}</h4>
</p>
          }
        </div>
      ))}
    </>
  );
};

export default App;
