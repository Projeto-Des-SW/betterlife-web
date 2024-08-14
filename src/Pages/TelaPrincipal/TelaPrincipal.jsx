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
    <>
      <Header />
      <div className={Styles.ConteudoContainer}>
        <h1>Bem Vindo</h1>
        {renderContent()}
      </div>
    </>
  );
}

export default TelaPrincipal;
