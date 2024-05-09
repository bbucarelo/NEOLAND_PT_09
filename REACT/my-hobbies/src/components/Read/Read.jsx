
import './Read.css';

export const Read = ({ read }) => {
  return (
    <div>
      <h2>Read:</h2>
      <p>Title: {read.title}</p>
      <p>Author Name: {read.authorName}</p>
      <p>Author Surname: {read.authorSurname}</p>
      <p>Genre: {read.genre}</p>
      
    </div>
  );
};

//Pendiente ver como añadir la imagen que está en HOBBIES.js
