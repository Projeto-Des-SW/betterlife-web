import React from 'react';
import { BrowserRouter, Route, Routes as RouterRoutes, Navigate  } from 'react-router-dom';
import dadosUserLogadoService from './Services/DadosUserLogado/DadosUserLogado-service';

//Pages
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import RecuperarSenha from './Pages/RecuperarSenha/RecuperarSenha';
import TelaPrincipal from './Pages/TelaPrincipal/TelaPrincipal';
import RedefinirSenha from './Pages/RedefinirSenha/RedefinirSenha';
import UserProfile from './Pages/PerfilUsuario/PerfilUsuario';
import Taxonomia from './Pages/Taxonomia/Taxonomia';
import RegisterAnimal from './Pages/RegisterAnimal/RegisterAnimal';
import Animais from './Pages/Animais/Animais';
import CategoriaForum from './Pages/CategoriaForum/CategoriaForum';
import RegisterPostForum from './Pages/RegisterPostForum/RegisterPostForum';
import MeusPostsForum from './Pages/MeusPostsForum/MeusPostsForum';
import Forum from './Pages/Forum/Forum';
import Post from './Pages/Forum/Post';
import MinhasComunidades from './Pages/MinhasComunidades/MinhasComunidades';
import Comunidades from './Pages/Comunidades/Comunidades';

const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = dadosUserLogadoService.getUserInfo() !== null;
    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element, ...rest }) => {
    const isAuthenticated = dadosUserLogadoService.getUserInfo() !== null;
    return !isAuthenticated ? element : <Navigate to="/telaPrincipal" replace />;
};

const Routes = () => (
    <BrowserRouter>
      <RouterRoutes>
        
        {/* Rotas públicas */}
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<PublicRoute element={<Login />} />} />
        <Route path='/register' element={<PublicRoute element={<Register />} />} />
        <Route path='/recuperarSenha' element={<PublicRoute element={<RecuperarSenha />} />} />
        <Route path='/redefinirSenha' element={<PublicRoute element={<RedefinirSenha />} />} />        

        {/* Rotas Privadas */}
        <Route path='/telaPrincipal' element={<PrivateRoute element={<TelaPrincipal />} />} />
        <Route path='/perfil' element={<PrivateRoute element={<UserProfile />} />} />
        <Route path='/taxonomia' element={<PrivateRoute element={<Taxonomia />} />} />
        <Route path='/registerAnimal' element={<PrivateRoute element={<RegisterAnimal/>} />} />
        <Route path='/animais' element={<PrivateRoute element={<Animais />}/>}/>
        <Route path='/categoriaForum' element={<PrivateRoute element={<CategoriaForum />}/>}/>        
        <Route path='/RegisterPostForum' element={<PrivateRoute element={<RegisterPostForum />} />}/>
        <Route path='/meusPosts' element={<PrivateRoute element={<MeusPostsForum />} />}/>
        <Route path='/forum' element={<PrivateRoute element={<Forum/>} />}/>
        <Route path="/post/:id" element={<PrivateRoute element={<Post/>} />}/>
        <Route path='/minhasComunidades' element={<PrivateRoute element={<MinhasComunidades />} />} />
        <Route path='/comunidades' element={<PrivateRoute element={<Comunidades />} />} />
      </RouterRoutes>
    </BrowserRouter>
);

export default Routes;