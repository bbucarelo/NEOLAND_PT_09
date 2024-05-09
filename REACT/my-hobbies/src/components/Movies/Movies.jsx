import './Movies.css';


export const Movies = ({ movies }) => {
    return (
      <div className="movies-container">
        <h2>Movies</h2>     
        {movies.map((movie, index) => (
          <li key={index}>
          <p>Movie: {movie.name}</p>
          <p>Type: {movie.type}</p>
          <p>Genre: {movie.genre}</p>
          <p>Vote: {movie.vote}</p>
          </li>
        ))}
      </div>
    );
  };