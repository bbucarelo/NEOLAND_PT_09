

//! Minireto 2: 
const App = () => {
  const elements = [1, 2, 3, 4];

  return (
    <>
          {elements.map((element) => {
        return `${element}`
      })}
  </>
  );
};

export default App
