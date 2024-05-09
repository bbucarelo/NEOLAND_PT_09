import './SongsHeard.css';

export const SongsHeard = ({ songs }) => {
    return (
      <div className="songs-container">
        <h2>SongsHeard</h2>
        {songs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
    </div>
    );
  };

  //Es un array de String