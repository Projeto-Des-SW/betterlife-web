import React, { useContext } from 'react';
import Styles from './TelaPrincipal.module.css'
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function TelaPrincipal() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const realizarLogout = () => {
    setUser(null); // Limpa os dados do usuário no contexto
    navigate('/login'); // Redireciona para a tela de login
  };
  
  return (
    <div className={Styles.TelaPrincipalContainer}>
      <h1>Bem Vindo</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>Nome: {user.nome}</p>
        <p>Documento: {user.documento}</p>
        <p>Telefone: {user.telefone}</p>
        <p>Tipo de Usuário: {user.tipousuarioid}</p>
      </div>
      <button onClick={realizarLogout} className={Styles.logoutButton}>Logout</button>
    </div>
  )
}

export default TelaPrincipal