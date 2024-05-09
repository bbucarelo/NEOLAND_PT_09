import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {  Home, Gallery, About} from './pages/index';
import App from './App.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<App />}>  
         <Route index element={<Home />} /> 
         <Route path="Home" element={<Home />} />
          <Route path="Gallery" element={<Gallery />} />
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
