import './Sports.css';

export const Sports = ({ sports }) => {
    return (
      <div className="sports-container">
        <h2>Sports:</h2>
        {sports.map((sport, index) => (
          <li key={index}>
            <p>Name: {sport.name}</p>
            <p>Indoor: {sport.indoor ? "Yes" : "No"}</p>
            <p>Favorite Team: {sport.favoriteTeam}</p>
          </li>
        ))}
    </div>
    );
  };