import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import "./pages/index"; 
import './index.css'
import { About, Home, Listado } from './pages/index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element={<App />}>  
         <Route index element={<Home />} /> 
          <Route path="Listado" element={<Listado />} />
          <Route path="About" element={<About />} />
          <Route
            path="*"
            element={
              <main>
                <p>404 - No existe la ruta!</p>
              </main>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
