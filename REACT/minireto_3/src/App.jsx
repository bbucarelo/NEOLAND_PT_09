

//! Minireto 3: 
const App = () => {
  const elements = [
    { nombre: 'Juan', apellido: 'Pérez' },
    { nombre: 'María', apellido: 'Gómez' },
    { nombre: 'Carlos', apellido: 'López' },
    { nombre: 'Ana', apellido: 'Martínez' }
  ];

  return (
    <>
          {elements.map((element) => {
        return `${element.nombre} ${element.apellido} - `;
      })}
  </>
  );
};

export default App
