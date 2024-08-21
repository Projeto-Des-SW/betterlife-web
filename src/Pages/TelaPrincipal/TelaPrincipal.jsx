import React from 'react';
import Styles from './TelaPrincipal.module.css';
import UserComponent from './Components/Usuario/UserComponent';
import VeterinariaComponent from './Components/Veterinario/VeterinariaComponent';
import DepartmentoComponent from './Components/Departamento/DepartamentoComponent';
import Header from '../Header/Header';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';

function TelaPrincipal() {
  const renderContent = () => {
    const userType = dadosUserLogadoService.getUserInfo().tipousuario;
    switch (userType) {
      case 'Usuário Comum':
        return <UserComponent />;
      case 'Veterinário':
        return <VeterinariaComponent />;
      case 'Departamento':
        return <DepartmentoComponent />;
      default:
        return <div>Bem-vindo ao sistema, estamos processando seu acesso...</div>;
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
