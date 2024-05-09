
import { Outlet } from 'react-router-dom';
import './App.css'
import { HOBBIES } from "./HOBBIES/HOBBIES";
import { Languages, Movies, Read, SongsHeard, Sports } from './components';



const App = () => {
  const { movies, languages, read, songsHeard, sports } = HOBBIES;
  console.log(HOBBIES);
  return (
<>
      <div>
      <h1> My Hobbies </h1>
      <Movies movies={movies} />
      <Languages languages={languages} />
      <Read read={read} />
      <Sports sports={sports} /> 
      <SongsHeard songs={songsHeard} /> 
      <Outlet />
      </div>
    </>
  );
};

export default App
