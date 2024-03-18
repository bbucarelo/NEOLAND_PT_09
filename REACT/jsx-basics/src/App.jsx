import './App.css';


//! Minireto 1: 
const App = () => {
  const x = new Date().getHours();
  const saludo =
    x >= 6 && x < 12
      ? 'Buenos días'
      : x >= 12 && x < 20
      ? 'Buenas tardes'
      : 'Buenas noches';
      console.log(saludo);
  return <p>{saludo}</p>;

};

export default App


