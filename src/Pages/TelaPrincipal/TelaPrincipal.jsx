import React from 'react';
import Styles from './TelaPrincipal.module.css';
import UserComponent from '../../Components/UserComponent';
import VeterinariaComponent from '../../Components/VeterinariaComponent';
import DepartmentoComponent from '../../Components/DepartamentoComponent';
import Header from '../Header/Header';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';

function TelaPrincipal() {

  const renderContent = () => {
    switch (dadosUserLogadoService.getUserInfo().tipousuario) {
      case 'Usuário Comum':
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
