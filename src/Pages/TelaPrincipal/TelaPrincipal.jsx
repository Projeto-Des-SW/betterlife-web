import React, { useContext } from 'react';
import Styles from './TelaPrincipal.module.css';
import { UserContext } from '../../Contexts/UserContext';
import AdminComponent from '../../Components/AdminComponent';
import UserComponent from '../../Components/UserComponent';
import VeterinariaComponent from '../../Components/VeterinariaComponent';
import DepartmentoComponent from '../../Components/DepartamentoComponent';
import Header from '../Header/Header';

function TelaPrincipal() {
  const { user } = useContext(UserContext);

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
      <Header />
      <div className={Styles.mainContent}>
        <h1>Bem Vindo</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default TelaPrincipal;
