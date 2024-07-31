import React, { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import Styles from '../PerfilUsuario/PerfilUsuario.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); 

  const handleBack = () => {
    navigate('/telaPrincipal');
  };

  return (
    <div className={Styles.UserProfileContainer}>
      <Header />
      <h2>Perfil do Usuário</h2>
      <div>
        <p>Email: {user.email}</p>
        <p>Nome: {user.nome}</p>
        <p>Documento: {user.documento}</p>
        <p>Telefone: {user.telefone}</p>
        <p>Tipo de Usuário: {user.tipousuario}</p>
      </div>
      <button className={Styles.BackButton} onClick={handleBack}>Voltar</button>
    </div>
  );
}

export default UserProfile;
