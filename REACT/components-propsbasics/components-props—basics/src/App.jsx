import './App.css'
import {Image, Paragraph, Title, Subtitle} from "./components"

function App() {
 
//    <img src="https://reactjs.org/logo-og.png" alt="React Image" /> 
  return (
    <>
     <Image source="https://reactjs.org/logo-og.png" textoalt="React Image"/>
     <Paragraph FreeText="Free Text"/>
     <Title FreeText="Título"/>
     <Subtitle FreeText="Subtitulo"/>
     <Subtitle FreeText="Subtitulo"/>
     <Subtitle FreeText="Subtitulo"/>
     <Paragraph FreeText="Free Text"/>
     <Paragraph FreeText="Free Text"/>
    </>
  )
}

export default App
