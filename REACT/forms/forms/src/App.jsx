import { useState } from 'react'
import Login from './components/loginForm';
import SingUp from './components/singupForm';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <button onClick={() => setIsLogin(true)}>Login</button>
      <button onClick={() => setIsLogin(false)}>Sign Up</button>
      
      {isLogin ? <Login /> : <SingUp />}
    </div>
  );
};

export default App;