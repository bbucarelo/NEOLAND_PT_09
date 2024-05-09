import './App.css'
import React from "react";
import { Header, Main, Footer} from "./components"
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <Outlet />
    </>
  );
};

export default App;