import './Languages.css';

export const Languages = ({ languages }) => {
  return (
    <div className="languages-container">
      <h2>Languages:</h2>
      <p>Language: {languages[0].language}</p>
      <p>Writing Level: {languages[0].wrlevel}</p>
      <p>Speaking Level: {languages[0].splevel}</p>
    </div>
  );
};
 
//Es un array de un solo objeto dentro por eso debo acceder a la posición [0]
// La clase para poder estilar con CSS
