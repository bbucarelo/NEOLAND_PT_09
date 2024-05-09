import './App.css'
import React from "react";
import {Image, Paragraph, Title, Subtitle, Header, Main, Footer} from "./components"

function App() {
 
//    <img src="https://reactjs.org/logo-og.png" alt="React Image" /> 
  return (
    <>
     <Image source="https://reactjs.org/logo-og.png" FreeTextalt="React Image"/>
     <Paragraph FreeText="Free Text"/>


     <Header> 
        <Title FreeText={"Titulo"} />
      </Header>
<Main>
<Subtitle FreeText={"Subtitulo"}/>
</Main>
     <Subtitle FreeText="Subtitulo"/>
     <Subtitle FreeText="Subtitulo"/>
     <Subtitle FreeText="Subtitulo"/>
     <Paragraph FreeText="Free Text"/>
<Footer>
<Paragraph FreeText={"Final Text"}/>   
</Footer>
    

    </>
  )
}

export default App
