import React, { useContext } from 'react';
import Styles from './TelaPrincipal.module.css'
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import AdminComponent from '../../Components/AdminComponent';
import UserComponent from '../../Components/UserComponent';
import VeterinariaComponent from '../../Components/VeterinariaComponent';
import DepartmentoComponent from '../../Components/DepartamentoComponent';

function TelaPrincipal() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const realizarLogout = () => {
    setUser(null); // Limpa os dados do usuário no contexto
    navigate('/login'); // Redireciona para a tela de login
  };
  
  const renderContent = () => {
    switch (user.tipousuario) {
      case 'ADM':
        return <AdminComponent />;
      case 'Usuário':
        return <UserComponent />;
      case 'Veterinário':
        return <VeterinariaComponent />;
      case 'Departamento':
        return <DepartmentoComponent />;
      default:
        return <div>Tipo de usuário desconhecido</div>;
    }
  };

  return (
    <div className={Styles.TelaPrincipalContainer}>
      <h1>Bem Vindo</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>Nome: {user.nome}</p>
        <p>Documento: {user.documento}</p>
        <p>Telefone: {user.telefone}</p>
        <p>Tipo de Usuário: {user.tipousuario}</p>
      </div>
      {renderContent()}
      <button onClick={realizarLogout} className={Styles.logoutButton}>Logout</button>
    </div>
  )
}

export default TelaPrincipal