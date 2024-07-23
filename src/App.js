import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
//Pages
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import RecuperarSenha from './Pages/RecuperarSenha/RecuperarSenha';
import TelaPrincipal from './Pages/TelaPrincipal/TelaPrincipal';
import RedefinirSenha from './Pages/RedefinirSenha/RedefinirSenha';
//Context
import { UserProvider } from './Contexts/UserContext';
function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/telaPrincipal' element={<TelaPrincipal/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/recuperarSenha' element={<RecuperarSenha />} />
        <Route path='/redefinirSenha' element={<RedefinirSenha/>} />
      </Routes>
    </div>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
