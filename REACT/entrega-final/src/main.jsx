import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import { ProjectsProvider } from './context/projectsContext.jsx'
import { DivisionsProvider } from './context/divisionsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <DivisionsProvider>
        <App />
          </DivisionsProvider>
      </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
