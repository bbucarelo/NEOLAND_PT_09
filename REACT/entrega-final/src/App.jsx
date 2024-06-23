import './App.css' 
import { Route, Routes } from "react-router-dom"; 
import { HomeLayout} from './components';
import { ProtectedLayaout } from './components';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectsPage from './pages/ProjectsPage';
import ConfirmationCodePage from './pages/ConfirmationCodePage';
import DivisionsPage from './pages/DivisionsPage';



function App() { 
  return ( 
    <Routes>
      {/* Aquí van las rutas de la aplicación públicas */}
      <Route element ={<HomeLayout/> }>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/confirmationCode' element={<ConfirmationCodePage/>} />
      </Route>
      {/* Aquí van las rutas de la aplicación privadas */}
      <Route path='/dashboard' element={<ProtectedLayaout />}>
        <Route path='profile' element={<ProfilePage />} />
        <Route path='projects' element={<ProjectsPage />} />
        <Route path='settings' element={<SettingsPage />} />
        <Route path='divisions' element={<DivisionsPage />} />
      </Route>
    </Routes>  
  
  );
}
     
export default App; 
