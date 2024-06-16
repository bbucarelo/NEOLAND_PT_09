import './App.css' 
import { Route, Routes } from "react-router-dom"; 
import { HomeLayout} from './components';
import { ProtectedLayaout } from './components';
import { ProfilePage } from './pages/ProfilePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SettingsPage } from './pages/SettingsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


function App() { 
  return ( 
    <Routes>
      {/* Aquí van las rutas de la aplicación públicas */}
      <Route element ={<HomeLayout/> }>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
      </Route>
      {/* Aquí van las rutas de la aplicación privadas */}
      <Route element={<ProtectedLayaout /> }>
      <Route path='/dashboard/*' element={<HomeLayout/>} />
        <Route path='profile' element={<ProfilePage/>} />
        <Route path='projects' element={<ProjectsPage/>} />
        <Route path='settings' element={<SettingsPage/>} />
      </Route>
    </Routes>  
  
  );
}
     
export default App; 
